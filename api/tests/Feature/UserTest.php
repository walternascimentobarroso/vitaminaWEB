<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class UserTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    protected $route;

    public function setUp(): void
    {
        parent::setUp();
        $this->route = '/api/users';
    }

    protected function getAuthToken()
    {
        // Create a user for authentication
        $user = User::factory()->create();

        // Generate the JWT token for the user
        $token = JWTAuth::fromUser($user);

        return $token;
    }

    public function testGetUsersSuccess()
    {
        // Get the authentication token
        $token = $this->getAuthToken();

        // Create some fake doctors using the Medico model factory
        User::factory()->count(5)->create();

        // Send a GET request to the /users route
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->getJson($this->route);

        // Assert that the response status code is 200 (success)
        $response->assertStatus(200);

        // Assert that the response JSON contains an array of doctors
        $response->assertJsonStructure([
            '*' => [[
                'name',
                'email',
            ]],
        ]);
    }

    public function testCreateUserSuccess()
    {
        // Get the authentication token
        $token = $this->getAuthToken();

        // Create a fake data array for the user
        $data = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'password' =>  $this->faker->password,
        ];

        // Send a POST request to the /api/users route with valid data and authentication token
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->postJson($this->route, $data);

        // Assert that the response status code is 201 (created)
        $response->assertStatus(201);

        // Assert that the response JSON contains the doctor data
        $response->assertJson([
            'data' => [
                'name' => $data['name'],
                'email' => $data['email'],
            ]
        ]);

        // Assert that the doctor is saved in the database
        $this->assertDatabaseHas((new User)->getTable(), [
            'name' => $data['name'],
            'email' => $data['email'],
        ]);
    }

    public function testCreateUserMissingData()
    {
        // Get the authentication token
        $token = $this->getAuthToken();

        // Create a fake data array for the user
        $data = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
        ];

        // Send a POST request to the /api/users route with missing data and authentication token
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->postJson($this->route, $data);

        // Assert that the response status code is 422 (unprocessable entity)
        $response->assertStatus(422);

        // Assert that the response JSON contains an error message about the missing data
        $response->assertJsonValidationErrors('password');
    }

    public function testCreateUserWithDuplicateEmail()
    {
        $token = $this->getAuthToken();

        User::factory()->create(['email' => 'existing@example.com']);

        $data = [
            'name' => $this->faker->name,
            'email' => 'existing@example.com',
            'password' => $this->faker->password,
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->postJson($this->route, $data);

        $response->assertStatus(422);

        $response->assertJson([
            'message' => 'The email has already been taken.',
            'errors' => [
                'email' => ['The email has already been taken.'],
            ],
        ]);

        // Make sure the user with the duplicate email has not been created
        $this->assertDatabaseMissing('users', ['name' => $data['name']]);
    }

    public function testCreateUserUnauthenticated()
    {
        // Create a fake data array for the user
        $data = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'password' => $this->faker->password,
        ];

        // Send a POST request to the /api/users route without authentication
        $response = $this->postJson($this->route, $data);

        // Assert that the response status code is 401 (unauthorized)
        $response->assertStatus(401);

        // Assert that the response JSON contains an error message indicating unauthorized access
        $response->assertJson([
            'message' => 'Unauthenticated.',
        ]);
    }

    public function testShowUserSuccess()
    {
        $token = $this->getAuthToken();
        $user = User::factory()->create();

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->getJson("$this->route/$user->id");

        $response->assertStatus(200);

        $response->assertJson([
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]
        ]);
    }

    public function testShowUserNotFound()
    {
        $token = $this->getAuthToken();
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->getJson("$this->route/123");

        $response->assertStatus(404);

        $response->assertJson([
            'message' => 'User not found',
        ]);
    }

    public function testUpdateUserSuccess()
    {
        $token = $this->getAuthToken();

        $user = User::factory()->create();

        $updatedData = [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'password' => $this->faker->password,
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->putJson("$this->route/$user->id", $updatedData);

        $response->assertStatus(200);

        $response->assertJson([
            'data' => [
                'id' => $user->id,
                'name' => $updatedData['name'],
                'email' => $updatedData['email'],
            ]
        ]);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'name' => $updatedData['name'],
            'email' => $updatedData['email'],
        ]);
    }

    public function testUpdateUserNotFound()
    {
        $token = $this->getAuthToken();

        $updatedData = [
            'name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'password' => $this->faker->password,
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->putJson("$this->route/123", $updatedData);

        $response->assertStatus(404);

        $response->assertJson([
            'message' => 'User not found',
        ]);
    }

    public function testDestroyUserSuccess()
    {
        $token = $this->getAuthToken();

        $userToDelete = User::factory()->create();

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->deleteJson($this->route . '/' . $userToDelete->id);

        $response->assertStatus(200);

        $response->assertJson([
            'message' => 'User deleted',
        ]);

        $this->assertDatabaseMissing('users', [
            'id' => $userToDelete->id,
        ]);
    }

    public function testDestroyUserNotFound()
    {
        $token = $this->getAuthToken();

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->deleteJson($this->route . '/123');

        $response->assertStatus(404);

        $response->assertJson([
            'message' => 'User not found',
        ]);
    }
}
