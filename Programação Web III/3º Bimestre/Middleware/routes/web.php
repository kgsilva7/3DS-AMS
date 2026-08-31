<?php

use App\Http\Controllers\AcessoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Rota principal - protegida pelo middleware
Route::get('/', [AcessoController::class, 'index'])
    ->middleware('verificar.acesso')
    ->name('home');

// Rota de acesso negado - pública
Route::get('/acesso-negado', [AcessoController::class, 'negado'])
    ->name('acesso.negado');

// Rotas de autenticação (para teste)
Route::get('/login', [AcessoController::class, 'login'])->name('login');
Route::post('/login', [AcessoController::class, 'doLogin']);
Route::post('/logout', [AcessoController::class, 'logout'])->name('logout');