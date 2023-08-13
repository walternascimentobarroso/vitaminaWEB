<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::controller(AuthController::class)->group(function () {
    Route::get('/user', 'me')->middleware('auth');
    Route::post('/login', 'login');
});
