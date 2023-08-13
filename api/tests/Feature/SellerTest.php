<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Seller;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class SellerTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    protected $route;

    public function setUp(): void
    {
        parent::setUp();
        $this->route = '/api/sellers';
    }

    protected function getAuthToken()
    {
        // Create a user for authentication
        $user = User::factory()->create();

        // Generate the JWT token for the user
        $token = JWTAuth::fromUser($user);

        return $token;
    }

    public function testGetSellersSuccess()
    {
        $token = $this->getAuthToken();

        Seller::factory()->count(5)->create();

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->getJson($this->route);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            '*' => [[
                'name'
            ]],
        ]);
    }

    public function testCreateSellerSuccess()
    {
        $token = $this->getAuthToken();

        $data = [
            'name' => $this->faker->name
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->postJson($this->route, $data);

        $response->assertStatus(201);

        $response->assertJson([
            'data' => [
                'name' => $data['name']
            ]
        ]);

        $this->assertDatabaseHas((new Seller())->getTable(), [
            'name' => $data['name']
        ]);
    }

    public function testCreateSellerMissingData()
    {
        $token = $this->getAuthToken();

        $data = [];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->postJson($this->route, $data);

        $response->assertStatus(422);

        $response->assertJsonValidationErrors('name');
    }

    public function testCreateSellerUnauthenticated()
    {
        $data = [
            'name' => $this->faker->name
        ];

        $response = $this->postJson($this->route, $data);

        $response->assertStatus(401);

        $response->assertJson([
            'message' => 'Unauthenticated.',
        ]);
    }

    public function testShowSellerSuccess()
    {
        $token = $this->getAuthToken();

        $data = Seller::factory()->create();

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->getJson("$this->route/$data->id");

        $response->assertStatus(200);

        $response->assertJson([
            'data' => [
                'id' => $data->id,
                'name' => $data->name,
            ]
        ]);
    }

    public function testShowCustomerNotFound()
    {
        $token = $this->getAuthToken();

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->getJson("$this->route/123");

        $response->assertStatus(404);

        $response->assertJson([
            'message' => 'Seller not found',
        ]);
    }

    public function testUpdateSellerSuccess()
    {
        $token = $this->getAuthToken();

        $data = Seller::factory()->create();

        $updatedData = [
            'name' => $this->faker->name
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->putJson("$this->route/$data->id", $updatedData);

        $response->assertStatus(200);

        $response->assertJson([
            'data' => [
                'id' => $data->id,
            ]
        ]);

        $this->assertDatabaseHas('sellers', [
            'id' => $data->id,
            'name' => $updatedData['name'],
        ]);
    }

    public function testUpdateSellerNotFound()
    {
        $token = $this->getAuthToken();

        $updatedData = [
            'name' => $this->faker->name,
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->putJson("$this->route/123", $updatedData);

        $response->assertStatus(404);

        $response->assertJson([
            'message' => 'Seller not found',
        ]);
    }

    public function testDestroySellerSuccess()
    {
        $token = $this->getAuthToken();

        $dataToDelete = Seller::factory()->create();

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->deleteJson($this->route . '/' . $dataToDelete->id);

        $response->assertStatus(200);

        $response->assertJson([
            'message' => 'Seller deleted',
        ]);

        $this->assertDatabaseMissing('sellers', [
            'id' => $dataToDelete->id,
        ]);
    }

    public function testDestroySellerNotFound()
    {
        $token = $this->getAuthToken();

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->deleteJson($this->route . '/123');

        $response->assertStatus(404);

        $response->assertJson([
            'message' => 'Seller not found',
        ]);
    }
}
