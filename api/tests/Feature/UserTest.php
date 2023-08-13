<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function testGetUserSuccess()
    {
        // Create a user and get the JWT token for authentication
        $user = User::factory()->create();
        $token = JWTAuth::fromUser($user);

        // Send a GET request to the /user route with the JWT token in the Authorization header
        $response = $this->withHeaders(['Authorization' => 'Bearer ' . $token])
            ->get('/api/user');

        // Assert that the response status code is 200 (success)
        $response->assertStatus(200);

        // Assert that the response JSON contains the expected user data
        $response->assertJson([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
        ]);
    }

    public function testGetUserUnauthenticated()
    {
        // Send a GET request to the /api/user route without authentication
        $response = $this->getJson('/api/user');

        // Assert that the response status code is 401 (unauthorized)
        $response->assertStatus(401);

        // Assert that the response JSON contains an error message indicating unauthorized access
        $response->assertJson([
            'message' => 'Unauthenticated.',
        ]);
    }
}
