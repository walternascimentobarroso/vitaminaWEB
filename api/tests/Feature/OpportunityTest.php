<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Seller;
use App\Models\Product;
use App\Models\Customer;
use App\Models\Opportunity;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class OpportunityTest extends TestCase
{
    use RefreshDatabase;
    use WithFaker;

    protected $route;

    public function setUp(): void
    {
        parent::setUp();
        $this->route = '/api/opportunities';

        Customer::factory()->count(5)->create();
        Seller::factory()->count(5)->create();
        Product::factory()->count(5)->create();
    }

    protected function getAuthToken()
    {
        $user = User::factory()->create();
        return JWTAuth::fromUser($user);
    }

    public function testGetOpportunitiesSuccess()
    {
        $token = $this->getAuthToken();

        Opportunity::factory()->count(2)->create();

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->getJson($this->route);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            '*' => [[
                'status'
            ]],
        ]);
    }

    public function testCreateOpportunitySuccess()
    {
        $token = $this->getAuthToken();

        $data = [
            'status' => $this->faker->randomElement(['Open', 'Lost', 'Defeated']),
            'due_date' => $this->faker->date,
            'customer_id' => 1,
            'seller_id' => 1,
            'product_id' => 1,
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->postJson($this->route, $data);

        $response->assertStatus(201);

        $response->assertJson([
            'data' => [
                'status' => $data['status']
            ]
        ]);

        $this->assertDatabaseHas((new Opportunity)->getTable(), [
            'status' => $data['status']
        ]);
    }

    public function testCreateOpportunityMissingData()
    {
        $token = $this->getAuthToken();

        $data = [
            'due_date' => $this->faker->date,
            'customer_id' => 1,
            'seller_id' => 1,
            'product_id' => 1,
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->postJson($this->route, $data);

        $response->assertStatus(422);

        $response->assertJsonValidationErrors('status');
    }

    public function testCreateOpportunityUnauthenticated()
    {
        $data = [
            'status' => $this->faker->randomElement(['Open', 'Lost', 'Defeated']),
            'due_date' => $this->faker->date,
            'customer_id' => 1,
            'seller_id' => 1,
            'product_id' => 1,
        ];

        $response = $this->postJson($this->route, $data);

        $response->assertStatus(401);

        $response->assertJson([
            'message' => 'Unauthenticated.',
        ]);
    }

    public function testShowOpportunitySuccess()
    {
        $token = $this->getAuthToken();

        $data = Opportunity::factory()->create();

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->getJson("$this->route/$data->id");

        $response->assertStatus(200);

        $response->assertJson([
            'data' => [
                'id' => $data->id,
                'status' => $data->status,
            ]
        ]);
    }

    public function testShowOpportunityNotFound()
    {
        $token = $this->getAuthToken();
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->getJson("$this->route/123");

        $response->assertStatus(404);

        $response->assertJson([
            'message' => 'Opportunity not found',
        ]);
    }

    public function testUpdateOpportunitySuccess()
    {
        $token = $this->getAuthToken();

        $data = Opportunity::factory()->create();

        $updatedData = [
            'status' => $this->faker->randomElement(['Open', 'Lost', 'Defeated']),
            'due_date' => $this->faker->date,
            'customer_id' => 1,
            'seller_id' => 1,
            'product_id' => 1,
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->putJson("$this->route/$data->id", $updatedData);

        $response->assertStatus(200);

        $response->assertJson([
            'data' => [
                'id' => $data->id,
            ]
        ]);

        $this->assertDatabaseHas((new Opportunity)->getTable(), [
            'id' => $data->id,
            'status' => $updatedData['status'],
        ]);
    }

    public function testUpdateOpportunityNotFound()
    {
        $token = $this->getAuthToken();

        $updatedData = [
            'status' => $this->faker->randomElement(['Open', 'Lost', 'Defeated']),
            'due_date' => $this->faker->date,
            'customer_id' => 1,
            'seller_id' => 1,
            'product_id' => 1,
        ];

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->putJson("$this->route/123", $updatedData);

        $response->assertStatus(404);

        $response->assertJson([
            'message' => 'Opportunity not found',
        ]);
    }

    public function testDestroyOpportunitySuccess()
    {
        $token = $this->getAuthToken();

        $OpportunityToDelete = Opportunity::factory()->create();

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->deleteJson($this->route . '/' . $OpportunityToDelete->id);

        $response->assertStatus(200);

        $response->assertJson([
            'message' => 'Opportunity deleted',
        ]);

        $this->assertDatabaseMissing((new Opportunity)->getTable(), [
            'id' => $OpportunityToDelete->id,
        ]);
    }

    public function testDestroyOpportunityNotFound()
    {
        $token = $this->getAuthToken();

        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])->deleteJson($this->route . '/123');

        $response->assertStatus(404);

        $response->assertJson([
            'message' => 'Opportunity not found',
        ]);
    }
}
