<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SeedController;

Route::get('/', [SeedController::class, 'home']);

Route::get('/seeds', [SeedController::class, 'index']);

Route::get('/create', [SeedController::class, 'create']);

Route::post('/store', [SeedController::class, 'store']);

Route::get('/about', [SeedController::class, 'about']);


// ROTA FALLBACK
Route::fallback(function () {
    return response()->view('404', [], 404);
});