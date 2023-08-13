<?php

namespace App\Http\Controllers;

use App\Models\Seller;
use Illuminate\Http\Request;
use App\Http\Resources\SellerResource;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class SellerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Seller::all();

        return SellerResource::collection($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:100',
        ]);

        $data = Seller::create($data);

        return new SellerResource($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $data = Seller::findOrFail($id);

            return new SellerResource($data);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Seller not found'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $seller = Seller::findOrFail($id);

            $data = $request->validate([
                'name' => 'required|string|max:100',
            ]);

            $seller->update($data);

            return new SellerResource($seller);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Seller not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $data = Seller::findOrFail($id);

            $data->delete();

            return response()->json(['message' => 'Seller deleted'], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Seller not found'], 404);
        }
    }
}
