<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'ETEC Zona Leste') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="font-sans antialiased">
    <div class="min-h-screen bg-gray-100">
        <nav class="bg-[#800000] border-b border-[#600000] shadow-lg">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <a href="{{ route('home') }}" class="text-white font-bold text-xl">
                            ETEC Zona Leste
                        </a>
                    </div>

                    <div class="hidden sm:flex sm:items-center sm:ml-6 space-x-4">
                        <a href="{{ route('home') }}" class="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                        <a href="{{ route('cursos') }}" class="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">Cursos</a>
                        <a href="{{ route('eventos') }}" class="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">Eventos</a>
                        
                        @auth
                            <a href="{{ route('dashboard') }}" class="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                            <form method="POST" action="{{ route('logout') }}" class="inline">
                                @csrf
                                <button type="submit" class="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">Sair</button>
                            </form>
                        @else
                            <a href="{{ route('login') }}" class="text-white hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">Entrar</a>
                            <a href="{{ route('register') }}" class="bg-white text-[#800000] hover:bg-gray-100 px-4 py-2 rounded-md text-sm font-medium">Cadastrar</a>
                        @endauth
                    </div>
                </div>
            </div>
        </nav>

        <!-- Page Content -->
        <main>
            {{ $slot }}
        </main>

        <footer class="bg-[#800000] text-white py-8 mt-auto">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p>&copy; 2026 ETEC Zona Leste - Todos os direitos reservados</p>
            </div>
        </footer>
    </div>
</body>
</html>