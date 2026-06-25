# 🏫 Portal Escolar - ETEC Zona Leste

![Laravel](https://img.shields.io/badge/Laravel-11-red?style=flat-square&logo=laravel)
![PHP](https://img.shields.io/badge/PHP-8.2-blue?style=flat-square&logo=php)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-blue?style=flat-square&logo=tailwindcss)

## 📋 Sobre o Projeto

Sistema de portal acadêmico desenvolvido como trabalho prático para a disciplina de **Programação Web**. O sistema oferece uma plataforma completa para gerenciamento de informações institucionais e acadêmicas da ETEC Zona Leste.

### ✨ Funcionalidades

- 🏠 **Página Inicial** com apresentação institucional
- 📚 **Catálogo de Cursos** com descrições detalhadas
- 📅 **Agenda de Eventos** acadêmicos
- 👤 **Sistema de Autenticação** completo (Login/Registro)
- 📊 **Painel do Aluno** com boletim personalizado
- 🎨 **Design Responsivo** com identidade visual burgundy

## 🛠️ Tecnologias Utilizadas

- **PHP 8.2+** - Linguagem de programação
- **Laravel 11** - Framework MVC
- **Laravel Breeze** - Autenticação e segurança
- **Tailwind CSS** - Estilização responsiva
- **MySQL** - Banco de dados relacional
- **Vite** - Build de assets front-end

## 📦 Estrutura do Banco de Dados

### Tabelas e Relacionamentos

```mermaid
erDiagram
    USERS ||--o{ NOTAS : possui
    USERS {
        bigint id PK
        string name
        string email
        string password
        timestamp created_at
    }
    CURSOS {
        bigint id PK
        string nome
        text descricao
        string periodo
        string duracao
    }
    EVENTOS {
        bigint id PK
        string titulo
        text descricao
        datetime data_evento
        string local
    }
    NOTAS {
        bigint id PK
        bigint user_id FK
        string materia
        string mencao
    }
