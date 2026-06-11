@extends('layouts.app')

@section('content')

<h1>Sementes Cadastradas</h1>

<table>

    <tr>
        <th>Nome</th>
        <th>Espécie</th>
        <th>Quantidade</th>
        <th>Região</th>
    </tr>

    @foreach($seeds as $seed)

    <tr>
        <td>{{ $seed->name }}</td>
        <td>{{ $seed->species }}</td>
        <td>{{ $seed->quantity }}</td>
        <td>{{ $seed->region }}</td>
    </tr>

    @endforeach

</table>

@endsection