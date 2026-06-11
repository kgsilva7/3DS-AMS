@extends('layouts.app')

@section('content')

<h1>Cadastrar Semente</h1>

<form action="/store" method="POST">

    {{-- CSRF PROTECTION --}}
    @csrf

    <label>Nome:</label>
    <br>

    <input type="text" name="name">

    <br><br>

    <label>Espécie:</label>
    <br>

    <input type="text" name="species">

    <br><br>

    <label>Quantidade:</label>
    <br>

    <input type="number" name="quantity">

    <br><br>

    <label>Região:</label>
    <br>

    <input type="text" name="region">

    <br><br>

    <button type="submit">
        Salvar
    </button>

</form>

@endsection