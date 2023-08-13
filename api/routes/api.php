<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::controller(AuthController::class)->group(function () {
    Route::get('/me', 'me')->middleware('auth');
    Route::post('/login', 'login');
});


Route::middleware(['auth'])->group(function () {
    Route::apiResource('users', UserController::class);
});
