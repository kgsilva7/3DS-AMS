<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-[#800000] leading-tight">
            Meu Boletim - {{ Auth::user()->name }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    <h3 class="text-2xl font-bold text-[#800000] mb-6">Minhas Notas</h3>
                    @php
                        $notas = Auth::user()->notas;
                    @endphp
                    
                    @if($notas->count() > 0)
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Matéria</th>
                                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Menção</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    @foreach($notas as $nota)
                                        <tr>
                                            <td class="px-6 py-4 whitespace-nowrap">{{ $nota->materia }}</td>
                                            <td class="px-6 py-4 whitespace-nowrap">
                                                <span class="px-3 py-1 rounded-full text-white font-bold
                                                    @if($nota->mencao == 'MB') bg-green-600
                                                    @elseif($nota->mencao == 'B') bg-blue-600
                                                    @elseif($nota->mencao == 'R') bg-yellow-600
                                                    @else bg-red-600
                                                    @endif">
                                                    {{ $nota->mencao }}
                                                </span>
                                            </td>
                                        </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    @else
                        <p class="text-gray-500">Nenhuma nota cadastrada para você ainda.</p>
                    @endif
                </div>
            </div>
        </div>
    </div>
</x-app-layout>