@extends('layouts.app')

@section('content')
<div class="flex flex-col items-center justify-center min-h-[70vh]">
    <h1 class="text-6xl font-bold text-[#800000] mb-4">404</h1>
    <h2 class="text-2xl text-gray-700 mb-6">Página não encontrada</h2>
    <p class="text-gray-500 mb-8">A página que você está procurando não existe ou foi movida.</p>
    <a href="{{ route('home') }}" class="bg-[#800000] text-white px-6 py-3 rounded-lg hover:bg-[#600000] transition">
        Voltar para Home
    </a>
</div>
@endsection