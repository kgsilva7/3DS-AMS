<img width="560" height="729" alt="Captura de tela 2026-06-10 170441" src="https://github.com/user-attachments/assets/4bf11b1a-2a5f-46c0-8971-c2c3c2b2f917" />


Hardware Central

Sistema mobile para gerenciamento de chamados de manutenção de equipamentos de hardware. O aplicativo permite registrar ocorrências, acompanhar o status dos chamados e gerenciar equipamentos que necessitam de suporte técnico de forma simples e organizada.

Sobre o Projeto

O Hardware Central foi desenvolvido para auxiliar equipes de suporte técnico, laboratórios de informática, empresas e instituições de ensino no controle de manutenção de equipamentos.

Através do aplicativo é possível cadastrar novos chamados informando o equipamento e o problema encontrado, visualizar os chamados ativos, acompanhar seu status e remover registros quando necessário.

O sistema possui uma interface moderna baseada no Material Design, oferecendo uma experiência intuitiva para usuários e técnicos.

Funcionalidades
Cadastro de Chamados
Registro de novos equipamentos com problemas.
Campo para nome do equipamento.
Campo para descrição do problema identificado.
Validação de dados obrigatórios.
Gerenciamento de Chamados
Listagem automática dos chamados cadastrados.
Exibição organizada em cartões (Cards).
Visualização rápida do equipamento e da descrição do defeito.
Controle de Status

Cada chamado pode possuir um status:

Status	Descrição
Em análise	Equipamento aguardando diagnóstico ou manutenção
Concluído	Problema resolvido e equipamento liberado
Exclusão de Chamados
Remoção de registros através do ícone de lixeira.
Atualização automática da lista após exclusão.
Interface Responsiva
Layout adaptado para dispositivos móveis.
Navegação simples e intuitiva.
Utilização de componentes visuais modernos.
Tela Principal

A tela principal do aplicativo contém:

Novo Registro

Área destinada ao cadastro de novos chamados.

Campos:

Nome do Equipamento
Descrição do Problema
Chamados Ativos

Lista contendo todos os chamados registrados.

Cada chamado exibe:

Ícone representando manutenção.
Nome do equipamento.
Problema informado.
Status atual.
Botão de exclusão.
Menu Lateral

Acesso às funcionalidades adicionais do sistema.

Botão Flutuante (FAB)

Permite acesso rápido ao cadastro de novos chamados.

Tecnologias Utilizadas
Android Studio
Kotlin
Jetpack Compose
Material Design 3
State Management
Navigation Compose
Estrutura do Projeto
app/
├── ui/
│   ├── screens/
│   │   └── HomeScreen.kt
│   ├── components/
│   │   ├── ChamadoCard.kt
│   │   ├── FormRegistro.kt
│   │   └── StatusBadge.kt
│   └── theme/
│       ├── Color.kt
│       ├── Theme.kt
│       └── Type.kt
│
├── model/
│   └── Chamado.kt
│
├── viewmodel/
│   └── ChamadoViewModel.kt
│
└── MainActivity.kt
