<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    protected $fillable = [
        'titulo',
        'descricao',
        'data_evento',
        'local',
    ];

    protected $casts = [
        'data_evento' => 'datetime',
    ];
}