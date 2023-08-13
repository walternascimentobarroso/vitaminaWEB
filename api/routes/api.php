<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CustomerController;

Route::controller(AuthController::class)->group(function () {
    Route::get('/me', 'me')->middleware('auth');
    Route::post('/login', 'login');
});


Route::middleware(['auth'])->group(function () {
    Route::apiResource('users', UserController::class);
    Route::apiResource('customers', CustomerController::class);
});
