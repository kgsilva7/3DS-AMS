@extends('layouts.app')

@section('content')
<div class="max-w-7xl mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold text-[#800000] mb-8 text-center">Eventos Acadêmicos</h1>
    
    <div class="space-y-6">
        @forelse($eventos as $evento)
            <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
                <div class="border-l-4 border-[#800000] p-6">
                    <h3 class="text-xl font-bold text-[#800000]">{{ $evento->titulo }}</h3>
                    <p class="text-gray-600 my-2">{{ $evento->descricao }}</p>
                    <div class="flex flex-wrap gap-4 text-sm">
                        <span class="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                            📅 {{ $evento->data_evento->format('d/m/Y H:i') }}
                        </span>
                        <span class="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                            📍 {{ $evento->local }}
                        </span>
                    </div>
                </div>
            </div>
        @empty
            <div class="text-center text-gray-500">
                <p>Nenhum evento programado no momento.</p>
            </div>
        @endforelse
    </div>
</div>
@endsection