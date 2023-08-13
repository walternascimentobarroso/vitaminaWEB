<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test successful login and verify the response token.
     *
     * @return void
     */
    public function testLoginWithCorrectCredentials()
    {
        // Create a fake user for the test
        \App\Models\User::factory()->create([
            'email' => 'user@example.com',
            'password' => bcrypt('password'),
        ]);

        // Send a login request with correct credentials
        $response = $this->postJson('/api/login', [
            'email' => 'user@example.com',
            'password' => 'password',
        ]);

        // Check if the response status is 200 (OK)
        $response->assertStatus(200);

        // Check if the response contains the access token
        $response->assertJsonStructure([
            'token',
        ]);
    }

    /**
     * Test login with incorrect credentials and verify "Unauthorized" response.
     *
     * @return void
     */
    public function testLoginWithIncorrectCredentials()
    {
        // Send a login request with incorrect credentials
        $response = $this->postJson('/api/login', [
            'email' => 'user@example.com',
            'password' => 'incorrect_password',
        ]);

        // Check if the response status is 401 (Unauthorized)
        $response->assertStatus(401);

        // Check if the response contains the "Unauthorized" message
        $response->assertJson([
            'error' => 'Unauthorized',
        ]);
    }
}
