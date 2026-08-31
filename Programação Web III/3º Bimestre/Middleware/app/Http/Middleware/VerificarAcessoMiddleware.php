<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class VerificarAcessoMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Verifica se o usuário está autenticado
        if (!Auth::check()) {
            return redirect()->route('acesso.negado');
        }

        // Verifica se o usuário tem permissão (is_admin = true)
        if (!Auth::user()->hasAccess()) {
            // Redireciona para a página de acesso negado com a mensagem
            return redirect()->route('acesso.negado')
                ->with('mensagem', 'Você não tem permissão para acessar este site.');
        }

        // Permite o acesso se o usuário for administrador
        return $next($request);
    }
}