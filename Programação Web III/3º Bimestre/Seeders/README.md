# Seeders (Laravel)
Aqui está o seu README.md completo, reestilizado com ícones modernos, tópicos bem destacados em negrito e uma formatação visualmente limpa e profissional para você copiar, colar no VS Code e garantir a melhor apresentação no seu GitHub.

Markdown
# 🚀 Atividade: Povoamento de Banco de Dados com Seeders (Laravel)

> Este repositório documenta a implementação prática de **Seeders** em uma aplicação **Laravel**, cobrindo o povoamento automatizado de dados, a validação de regras relacionais e a exportação do script SQL final para versionamento.

---

## 📋 **Sumário**
- [**Pré-requisitos**](#-pré-requisitos)
- [**Etapa 1: Criação e Configuração dos Seeders**](#-etapa-1-criação-e-configuração-dos-seeders)
- [**Etapa 2: Execução do Povoamento (Seeding)**](#-etapa-2-execução-do-povoamento-seeding)
- [**Etapa 3: Exportação do Banco de Dados (Dump SQL)**](#-etapa-3-exportação-do-banco-dados-dump-sql)
- [**Como Executar o Projeto**](#-como-executar-o-projeto)

---

## ⚙️ **Pré-requisitos**

Antes de iniciar a execução do projeto em sua máquina, certifique-se de possuir as seguintes ferramentas instaladas:
* **PHP** (Versão compatível com o seu projeto Laravel)
* **Composer** (Gerenciador de dependências do PHP)
* **Node.js e NPM** (Opcional, caso utilize recursos de frontend)
* **SGBD** (MySQL / MariaDB configurado) e uma ferramenta de gerenciamento (como **phpMyAdmin** ou **DBeaver**).

---

## 🚀 **Etapa 1: Criação e Configuração dos Seeders**

As classes de *Seeder* são utilizadas para popular o banco de dados da aplicação com dados iniciais ou de testes de forma automatizada.

1. **Gerar as classes de Seeder via CLI (Artisan):**
   Abra o terminal na raiz do seu projeto Laravel e execute o comando abaixo (substitua `NomeDaTabela` pelo nome real da sua tabela, ex: `UserSeeder` ou `ProdutoSeeder`):
   ```bash
   php artisan make:seeder NomeDaTabelaSeeder
Implementar a lógica de inserção de dados:
Abra o arquivo gerado localizado em database/seeders/NomeDaTabelaSeeder.php e estruture a inserção em massa utilizando o Query Builder (DB::table) ou Eloquent dentro do método run():

PHP
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class NomeDaTabelaSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('nome_da_tabela')->insert([
            [
                'coluna1' => 'Valor Exemplo 1',
                'coluna2' => 'exemplo1@email.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'coluna1' => 'Valor Exemplo 2',
                'coluna2' => 'exemplo2@email.com',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
Registrar o Seeder no arquivo principal (DatabaseSeeder.php):
Abra o arquivo database/seeders/DatabaseSeeder.php e adicione a sua classe criada dentro do método call() para que o Laravel saiba que ela deve ser executada:

PHP
namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            NomeDaTabelaSeeder::class,
            // Insira outras classes de seeders aqui se necessário
        ]);
    }
}
🔄 Etapa 2: Execução do Povoamento (Seeding)
Com os seeders devidamente configurados e encadeados, é hora de persistir os dados no banco.

Executar as migrações e popular o banco do zero:
Para resetar completamente o banco de dados, recriar as tabelas estruturais através das migrations e aplicar os seeders, utilize o comando:

Bash
php artisan migrate:fresh --seed
💡 Nota: Se você deseja apenas rodar os seeders sem apagar ou recriar as tabelas existentes, utilize o comando: php artisan db:seed

Verificação da Integridade:
Acesse a sua ferramenta de gerenciamento de banco de dados (phpMyAdmin ou DBeaver) para conferir se:

Os dados inseridos via seeder constam corretamente nas respectivas tabelas.

As chaves estrangeiras (Foreign Keys) e restrições relacionais foram devidamente respeitadas.

💾 Etapa 3: Exportação do Banco de Dados (Dump SQL)
Após validar que a persistência e o relacionamento dos dados funcionaram perfeitamente:

Acesse o seu gerenciador de banco de dados (ex: phpMyAdmin).

Selecione o banco de dados correspondente à aplicação.

Clique na aba superior Exportar (Export).

Escolha o método de exportação (recomenda-se o modo Rápido ou Personalizado) mantendo o formato padrão SQL.

Clique em Executar / Continuar para baixar o arquivo .sql gerado.

Salve este arquivo .sql diretamente na raiz do seu repositório Git para cumprir com o requisito de entrega da atividade.

🛠️ Como Executar este Projeto do Zero
Caso você esteja clonando este repositório do GitHub em uma nova máquina, siga o passo a passo abaixo para rodar a aplicação:

Clone o repositório:

Bash
git clone <seu-link-do-github>
cd <nome-da-pasta-do-projeto>
Instale as dependências do projeto via Composer:

Bash
composer install
Configure o arquivo de ambiente (.env):

Bash
cp .env.example .env
🔧 Abra o arquivo .env recém-criado em seu editor e preencha as variáveis de conexão com o banco de dados (DB_DATABASE, DB_USERNAME, DB_PASSWORD, etc).

Gere a chave de criptografia da aplicação:

Bash
php artisan key:generate
Execute as migrações e o povoamento dos dados:

Bash
php artisan migrate:fresh --seed
Inicie o servidor de desenvolvimento local:

Bash
php artisan serve
Acesse a URL exibida no terminal (geralmente http://127.0.0.1:8000) através do seu navegador web.
