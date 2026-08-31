<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AcessoController extends Controller
{
    /**
     * Página principal com acesso permitido
     */
    public function index()
    {
        $user = Auth::user();
        return view('acesso', compact('user'));
    }

    /**
     * Página de acesso negado
     */
    public function negado()
    {
        // Recupera a mensagem da sessão
        $mensagem = session('mensagem', 'Você não tem permissão para acessar este site.');
        
        return view('negado', compact('mensagem'));
    }

    /**
     * Página de login (opcional para teste)
     */
    public function login()
    {
        return view('login');
    }

    /**
     * Processa o login
     */
    public function doLogin(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            return redirect()->intended('/');
        }

        return back()->withErrors([
            'email' => 'As credenciais não correspondem aos nossos registros.',
        ]);
    }

    /**
     * Processa o logout
     */
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}