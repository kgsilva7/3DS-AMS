<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Usuário Administrador (tem permissão)
        User::create([
            'name' => 'Administrador',
            'email' => 'admin@teste.com',
            'password' => Hash::make('12345678'),
            'is_admin' => true,
        ]);

        // Usuário Comum (NÃO tem permissão)
        User::create([
            'name' => 'Usuário Comum',
            'email' => 'usuario@teste.com',
            'password' => Hash::make('12345678'),
            'is_admin' => false,
        ]);

        // Usuário Admin 2
        User::create([
            'name' => 'João Silva',
            'email' => 'joao@admin.com',
            'password' => Hash::make('12345678'),
            'is_admin' => true,
        ]);
    }
}