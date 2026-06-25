@extends('layouts.app')

@section('content')
<div class="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-[#800000] to-[#600000]">
    <div class="max-w-7xl mx-auto px-4 py-12 text-center text-white">
        <h1 class="text-5xl font-bold mb-6">Bem-vindo à ETEC Zona Leste</h1>
        <p class="text-xl mb-8">Educação de qualidade que transforma vidas e constrói o futuro</p>
        <div class="flex justify-center gap-4 flex-wrap">
            <a href="{{ route('cursos') }}" class="bg-white text-[#800000] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                Nossos Cursos
            </a>
            <a href="{{ route('eventos') }}" class="bg-[#cc0000] hover:bg-[#b30000] px-8 py-3 rounded-lg font-semibold transition">
                Eventos
            </a>
            @guest
                <a href="{{ route('register') }}" class="border-2 border-white hover:bg-white hover:text-[#800000] px-8 py-3 rounded-lg font-semibold transition">
                    Matricule-se
                </a>
            @endguest
        </div>
        <div class="mt-12 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div class="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 class="text-xl font-bold mb-2">Missão</h3>
                <p class="text-white/90">Formar profissionais competentes e cidadãos críticos para o mercado de trabalho.</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 class="text-xl font-bold mb-2">Visão</h3>
                <p class="text-white/90">Ser referência em educação profissional na Zona Leste de São Paulo.</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <h3 class="text-xl font-bold mb-2">Valores</h3>
                <p class="text-white/90">Ética, qualidade, inovação e compromisso com a comunidade.</p>
            </div>
        </div>
    </div>
</div>
@endsection