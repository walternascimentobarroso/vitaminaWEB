<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Customer;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class CustomerTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    protected $route;

    public function setUp(): void
    {
        parent::setUp();
        $this->route = '/api/customers';
    }

    protected function getAuthToken()
    {
        // Create a user for authentication
        $user = User::factory()->create();

        // Generate the JWT token for the user
        $token = JWTAuth::fromUser($user);

        return $token;
    }

    public function testGetCustomersSuccess()
    {
        // Get the authentication token
        $token = $this->getAuthToken();

        // Create some fake doctors using the Medico model factory
        Customer::factory()->count(5)->create();

        // Send a GET request to the /customer route
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->getJson($this->route);

        // Assert that the response status code is 200 (success)
        $response->assertStatus(200);

        // Assert that the response JSON contains an array of doctors
        $response->assertJsonStructure([
            '*' => [[
                'name'
            ]],
        ]);
    }

    public function testCreateCustomerSuccess()
    {
        // Get the authentication token
        $token = $this->getAuthToken();

        // Create a fake data array for the customer
        $data = [
            'name' => $this->faker->name
        ];

        // Send a POST request to the /api/customers route with valid data and authentication token
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->postJson($this->route, $data);

        // Assert that the response status code is 201 (created)
        $response->assertStatus(201);

        // Assert that the response JSON contains the doctor data
        $response->assertJson([
            'data' => [
                'name' => $data['name']
            ]
        ]);

        // Assert that the doctor is saved in the database
        $this->assertDatabaseHas((new Customer)->getTable(), [
            'name' => $data['name']
        ]);
    }

    public function testCreateCustomerMissingData()
    {
        // Get the authentication token
        $token = $this->getAuthToken();

        // Create a fake data array for the customer
        $data = [];

        // Send a POST request to the /api/customers route with missing data and authentication token
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->postJson($this->route, $data);

        // Assert that the response status code is 422 (unprocessable entity)
        $response->assertStatus(422);

        // Assert that the response JSON contains an error message about the missing data
        $response->assertJsonValidationErrors('name');
    }

    public function testCreateCustomerUnauthenticated()
    {
        // Create a fake data array for the customer
        $data = [
            'name' => $this->faker->name
        ];

        // Send a POST request to the /api/customers route without authentication
        $response = $this->postJson($this->route, $data);

        // Assert that the response status code is 401 (unauthorized)
        $response->assertStatus(401);

        // Assert that the response JSON contains an error message indicating unauthorized access
        $response->assertJson([
            'message' => 'Unauthenticated.',
        ]);
    }

    public function testShowCustomerSuccess()
    {
        $token = $this->getAuthToken();
        $customer = Customer::factory()->create();

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->getJson("$this->route/$customer->id");

        $response->assertStatus(200);

        $response->assertJson([
            'data' => [
                'id' => $customer->id,
                'name' => $customer->name,
            ]
        ]);
    }

    public function testShowCustomerNotFound()
    {
        $token = $this->getAuthToken();
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->getJson("$this->route/123");

        $response->assertStatus(404);

        $response->assertJson([
            'message' => 'Customer not found',
        ]);
    }

    public function testUpdateCustomerSuccess()
    {
        $token = $this->getAuthToken();

        $customer = Customer::factory()->create();

        $updatedData = [
            'name' => $this->faker->name
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->putJson("$this->route/$customer->id", $updatedData);

        $response->assertStatus(200);

        $response->assertJson([
            'data' => [
                'id' => $customer->id,
            ]
        ]);

        $this->assertDatabaseHas('customers', [
            'id' => $customer->id,
            'name' => $updatedData['name'],
        ]);
    }

    public function testUpdateCustomerNotFound()
    {
        $token = $this->getAuthToken();

        $updatedData = [
            'name' => $this->faker->name,
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->putJson("$this->route/123", $updatedData);

        $response->assertStatus(404);

        $response->assertJson([
            'message' => 'Customer not found',
        ]);
    }

    public function testDestroyCustomerSuccess()
    {
        $token = $this->getAuthToken();

        $customerToDelete = Customer::factory()->create();

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->deleteJson($this->route . '/' . $customerToDelete->id);

        $response->assertStatus(200);

        $response->assertJson([
            'message' => 'Customer deleted',
        ]);

        $this->assertDatabaseMissing('customers', [
            'id' => $customerToDelete->id,
        ]);
    }

    public function testDestroyCustomerNotFound()
    {
        $token = $this->getAuthToken();

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->deleteJson($this->route . '/123');

        $response->assertStatus(404);

        $response->assertJson([
            'message' => 'Customer not found',
        ]);
    }
}
