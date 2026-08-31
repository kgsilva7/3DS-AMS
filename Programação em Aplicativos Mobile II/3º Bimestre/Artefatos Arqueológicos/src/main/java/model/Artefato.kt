package com.example.artefatos.model

data class Artefato(
    val id: Int,
    val nome: String,
    val descricao: String,
    val imagemUrl: String,
    val categoria: String,
    val periodo: String,
    val localizacao: String,
    val material: String
)