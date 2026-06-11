<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Banco de Sementes Nativas</title>

    <style>

        body{
            font-family: Arial;
            margin:0;
            background:#f4f4f4;
        }

        nav{
            background:#2e7d32;
            padding:15px;
        }

        nav a{
            color:white;
            margin-right:20px;
            text-decoration:none;
        }

        .container{
            padding:30px;
        }

        table{
            width:100%;
            border-collapse:collapse;
        }

        th,td{
            border:1px solid #ccc;
            padding:10px;
        }

    </style>

</head>
<body>

<nav>

    <a href="/">Home</a>

    <a href="/seeds">Sementes</a>

    <a href="/create">Cadastrar</a>

    <a href="/about">Sobre</a>

</nav>

<div class="container">

    @yield('content')

</div>

</body>
</html>