<?php

use App\Http\Controllers\EtecController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', [EtecController::class, 'home'])->name('home');
Route::get('/cursos', [EtecController::class, 'cursos'])->name('cursos');
Route::get('/eventos', [EtecController::class, 'eventos'])->name('eventos');

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Fallback para páginas não encontradas
Route::fallback(function () {
    return view('errors.404');
});

require __DIR__.'/auth.php';