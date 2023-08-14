<?php

namespace Database\Factories;

use App\Models\Opportunity;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Opportunity>
 */
class OpportunityFactory extends Factory
{
    protected $model = Opportunity::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'status' => $this->faker->randomElement(['Open', 'Lost', 'Defeated']),
            'due_date' => $this->faker->date(),
            'customer_id' => rand(1, 5),
            'seller_id' => rand(1, 5),
            'product_id' => rand(1, 5),
        ];
    }
}
