package com.example.artefatos.data

import com.example.artefatos.model.Artefato

object ArtefatoData {
    fun getArtefatos(): List<Artefato> = listOf(
        Artefato(
            id = 1,
            nome = "Machado de Pedra Polida",
            descricao = "Ferramenta de pedra polida utilizada para corte e escavação. Encontrada em sítios arqueológicos do período Neolítico.",
            imagemUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Stone_axe_%28FindID_530322%29.jpg/800px-Stone_axe_%28FindID_530322%29.jpg",
            categoria = "Ferramentas",
            periodo = "Neolítico (10.000-4.000 a.C.)",
            localizacao = "Europa Ocidental",
            material = "Pedra Polida"
        ),
        Artefato(
            id = 2,
            nome = "Ânfora Grega",
            descricao = "Vaso de cerâmica utilizado para armazenar vinho e azeite. Decorado com figuras negras típicas da cerâmica grega.",
            imagemUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Amphora_black_figure_illustration.jpg/800px-Amphora_black_figure_illustration.jpg",
            categoria = "Cerâmica",
            periodo = "Grécia Antiga (600-400 a.C.)",
            localizacao = "Grécia",
            material = "Cerâmica"
        ),
        Artefato(
            id = 3,
            nome = "Foice de Sílex",
            descricao = "Ferramenta agrícola feita de sílex lascado, utilizada para colheita de grãos no período Neolítico.",
            imagemUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Silex_1.jpg/800px-Silex_1.jpg",
            categoria = "Ferramentas",
            periodo = "Neolítico (10.000-4.000 a.C.)",
            localizacao = "Oriente Médio",
            material = "Sílex"
        ),
        Artefato(
            id = 4,
            nome = "Vaso Canopo Egípcio",
            descricao = "Vaso utilizado no Antigo Egito para armazenar os órgãos dos mortos durante o processo de mumificação.",
            imagemUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Canopic_jars_British_Museum.jpg/800px-Canopic_jars_British_Museum.jpg",
            categoria = "Cerâmica",
            periodo = "Antigo Egito (2.500-1.000 a.C.)",
            localizacao = "Egito",
            material = "Cerâmica"
        ),
        Artefato(
            id = 5,
            nome = "Ponta de Lança de Bronze",
            descricao = "Ponta de lança fundida em bronze, utilizada em combates no período da Idade do Bronze.",
            imagemUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Bronze_spear_head.jpg/800px-Bronze_spear_head.jpg",
            categoria = "Armas",
            periodo = "Idade do Bronze (3.300-1.200 a.C.)",
            localizacao = "Europa",
            material = "Bronze"
        ),
        Artefato(
            id = 6,
            nome = "Cerâmica Indígena",
            descricao = "Urna funerária indígena com pinturas geométricas, encontrada em sítios arqueológicos da Amazônia.",
            imagemUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Indigenous_ceramics.jpg/800px-Indigenous_ceramics.jpg",
            categoria = "Cerâmica",
            periodo = "Período Pré-Colombiano",
            localizacao = "Amazônia",
            material = "Cerâmica"
        ),
        Artefato(
            id = 7,
            nome = "Raspador de Pedra",
            descricao = "Ferramenta de pedra lascada utilizada para raspar couro e madeira no Paleolítico.",
            imagemUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Stone_tools.jpg/800px-Stone_tools.jpg",
            categoria = "Ferramentas",
            periodo = "Paleolítico (2.500.000-10.000 a.C.)",
            localizacao = "África",
            material = "Pedra Lascada"
        ),
        Artefato(
            id = 8,
            nome = "Moinho de Mão Romano",
            descricao = "Moinho de pedra utilizado para moer grãos no Império Romano. Composto por duas pedras circulares.",
            imagemUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Roman_quern_stone.jpg/800px-Roman_quern_stone.jpg",
            categoria = "Ferramentas",
            periodo = "Império Romano (27 a.C.-476 d.C.)",
            localizacao = "Itália",
            material = "Pedra"
        ),
        Artefato(
            id = 9,
            nome = "Colar de Conchas",
            descricao = "Colar feito de conchas marinhas perfuradas, utilizado como adorno pessoal no Paleolítico Superior.",
            imagemUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Shell_beads.jpg/800px-Shell_beads.jpg",
            categoria = "Adornos",
            periodo = "Paleolítico Superior (40.000-10.000 a.C.)",
            localizacao = "Europa",
            material = "Conchas"
        ),
        Artefato(
            id = 10,
            nome = "Espada de Ferro Celta",
            descricao = "Espada de ferro com cabo decorado, utilizada pelos guerreiros celtas durante a Idade do Ferro.",
            imagemUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Celtic_sword.jpg/800px-Celtic_sword.jpg",
            categoria = "Armas",
            periodo = "Idade do Ferro (1.200-500 a.C.)",
            localizacao = "Europa",
            material = "Ferro"
        )
    )
}