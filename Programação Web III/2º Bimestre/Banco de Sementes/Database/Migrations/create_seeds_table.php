<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('seeds', function (Blueprint $table) {

            // Chave primária
            $table->id();

            // Nome da semente
            $table->string('name');

            // Espécie
            $table->string('species');

            // Quantidade disponível
            $table->integer('quantity');

            // Região indicada
            $table->string('region');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('seeds');
    }
};