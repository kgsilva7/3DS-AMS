<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Evento;
use Illuminate\Http\Request;

class EtecController extends Controller
{
    public function home()
    {
        return view('home');
    }

    public function cursos()
    {
        $cursos = Curso::all();
        return view('cursos', compact('cursos'));
    }

    public function eventos()
    {
        $eventos = Evento::all();
        return view('eventos', compact('eventos'));
    }
}