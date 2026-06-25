@extends('layouts.app')

@section('content')
<div class="max-w-7xl mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold text-[#800000] mb-8 text-center">Nossos Cursos Técnicos</h1>
    
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        @forelse($cursos as $curso)
            <div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div class="h-2 bg-[#800000]"></div>
                <div class="p-6">
                    <h3 class="text-xl font-bold text-[#800000] mb-2">{{ $curso->nome }}</h3>
                    <p class="text-gray-600 mb-4">{{ $curso->descricao }}</p>
                    <div class="flex justify-between text-sm">
                        <span class="bg-gray-100 px-3 py-1 rounded-full">{{ $curso->periodo }}</span>
                        <span class="bg-gray-100 px-3 py-1 rounded-full">{{ $curso->duracao }}</span>
                    </div>
                </div>
            </div>
        @empty
            <div class="col-span-full text-center text-gray-500">
                <p>Nenhum curso cadastrado no momento.</p>
            </div>
        @endforelse
    </div>
</div>
@endsection