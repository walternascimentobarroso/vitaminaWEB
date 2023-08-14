<?php

namespace App\Http\Controllers;

use App\Models\Opportunity;
use Illuminate\Http\Request;
use App\Http\Resources\OpportunityResource;

class OpportunityController extends Controller
{
    public function index()
    {
        $opportunities = Opportunity::with('customer', 'seller', 'product')->get();

        return OpportunityResource::collection($opportunities);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'status' => 'required|string',
            'due_date' => 'required|date',
            'customer_id' => 'required|exists:customers,id',
            'seller_id' => 'required|exists:sellers,id',
            'product_id' => 'required|exists:products,id',
        ]);

        $opportunity = Opportunity::create($data);
        $opportunity->load('customer', 'seller', 'product');
        return new OpportunityResource($opportunity);
    }

    public function show(string $id)
    {
        try {
            $opportunity = Opportunity::with('customer', 'seller', 'product')->findOrFail($id);

            return new OpportunityResource($opportunity);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Opportunity not found'], 404);
        }
    }

    public function update(Request $request, string $id)
    {
        try {
            $opportunity = Opportunity::findOrFail($id);

            $data = $request->validate([
                'status' => 'required|string',
                'due_date' => 'required|date',
                'customer_id' => 'required|exists:customers,id',
                'seller_id' => 'required|exists:sellers,id',
                'product_id' => 'required|exists:products,id',
            ]);

            $opportunity->update($data);
            $opportunity->load('customer', 'seller', 'product');

            return new OpportunityResource($opportunity);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Opportunity not found'], 404);
        }
    }

    public function destroy(string $id)
    {
        try {
            $opportunity = Opportunity::findOrFail($id);
            $opportunity->delete();

            return response()->json(['message' => 'Opportunity deleted'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Opportunity not found'], 404);
        }
    }

}
