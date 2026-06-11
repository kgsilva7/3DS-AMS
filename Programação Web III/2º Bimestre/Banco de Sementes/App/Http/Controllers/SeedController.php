<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Seed;

class SeedController extends Controller
{
    // Página inicial
    public function home()
    {
        return view('home');
    }

    // Lista todas as sementes
    public function index()
    {
        $seeds = Seed::all();

        return view('seeds', compact('seeds'));
    }

    // Formulário
    public function create()
    {
        return view('create');
    }

    // Salvar dados
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'species' => 'required',
            'quantity' => 'required|integer',
            'region' => 'required'
        ]);

        Seed::create($request->all());

        return redirect('/seeds');
    }

    // Sobre
    public function about()
    {
        return view('about');
    }
}