<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Product;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class ProductTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    protected $route;

    public function setUp(): void
    {
        parent::setUp();
        $this->route = '/api/products';
    }

    protected function getAuthToken()
    {
        $user = User::factory()->create();
        return JWTAuth::fromUser($user);
    }

    public function testGetProductsSuccess()
    {
        $token = $this->getAuthToken();

        Product::factory()->count(5)->create();

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->getJson($this->route);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            '*' => [[
                'description'
            ]],
        ]);
    }

    public function testCreateProductSuccess()
    {
        $token = $this->getAuthToken();

        $data = [
            'description' => $this->faker->text(100)
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->postJson($this->route, $data);

        $response->assertStatus(201);

        $response->assertJson([
            'data' => [
                'description' => $data['description']
            ]
        ]);

        $this->assertDatabaseHas((new Product)->getTable(), [
            'description' => $data['description']
        ]);
    }

    public function testCreateProductMissingData()
    {
        $token = $this->getAuthToken();

        $data = [];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->postJson($this->route, $data);

        $response->assertStatus(422);

        $response->assertJsonValidationErrors('description');
    }

    public function testCreateProductUnauthenticated()
    {
        $data = [
            'description' => $this->faker->text(100)
        ];

        $response = $this->postJson($this->route, $data);

        $response->assertStatus(401);

        // Assert that the response JSON contains an error message indicating unauthorized access
        $response->assertJson([
            'message' => 'Unauthenticated.',
        ]);
    }

    public function testShowProductSuccess()
    {
        $token = $this->getAuthToken();
        $data = Product::factory()->create();

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->getJson("$this->route/$data->id");

        $response->assertStatus(200);

        $response->assertJson([
            'data' => [
                'id' => $data->id,
                'description' => $data->description,
            ]
        ]);
    }

    public function testShowProductNotFound()
    {
        $token = $this->getAuthToken();
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->getJson("$this->route/123");

        $response->assertStatus(404);

        $response->assertJson([
            'message' => 'Product not found',
        ]);
    }

    public function testUpdateProductSuccess()
    {
        $token = $this->getAuthToken();

        $data = Product::factory()->create();

        $updatedData = [
            'description' => $this->faker->text(100)
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->putJson("$this->route/$data->id", $updatedData);

        $response->assertStatus(200);

        $response->assertJson([
            'data' => [
                'id' => $data->id,
            ]
        ]);

        $this->assertDatabaseHas('Products', [
            'id' => $data->id,
            'description' => $updatedData['description'],
        ]);
    }

    public function testUpdateProductNotFound()
    {
        $token = $this->getAuthToken();

        $updatedData = [
            'description' => $this->faker->text(100),
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->putJson("$this->route/123", $updatedData);

        $response->assertStatus(404);

        $response->assertJson([
            'message' => 'Product not found',
        ]);
    }

    public function testDestroyProductSuccess()
    {
        $token = $this->getAuthToken();

        $dataToDelete = Product::factory()->create();

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->deleteJson("$this->route/$dataToDelete->id");

        $response->assertStatus(200);

        $response->assertJson([
            'message' => 'Product deleted',
        ]);

        $this->assertDatabaseMissing('Products', [
            'id' => $dataToDelete->id,
        ]);
    }

    public function testDestroyProductNotFound()
    {
        $token = $this->getAuthToken();

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->deleteJson("$this->route/123");

        $response->assertStatus(404);

        $response->assertJson([
            'message' => 'Product not found',
        ]);
    }
}
