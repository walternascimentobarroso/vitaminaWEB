<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\CustomerResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Customer::all();

        return CustomerResource::collection($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $data = Customer::create($data);

        return new CustomerResource($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $Customer = Customer::findOrFail($id);

            return new CustomerResource($Customer);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Customer not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $Customer = Customer::findOrFail($id);

            $data = $request->validate([
                'name' => 'required|string|max:100',
            ]);

            $Customer->update($data);

            return new CustomerResource($Customer);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Customer not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $Customer = Customer::findOrFail($id);

            $Customer->delete();

            return response()->json(['message' => 'Customer deleted'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Customer not found'], 404);
        }
    }
}
