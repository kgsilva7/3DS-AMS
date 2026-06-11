🌱 Banco de Sementes Nativas e Reflorestamento

O Banco de Sementes Nativas e Reflorestamento é um sistema web desenvolvido em Laravel para auxiliar no cadastro e gerenciamento de sementes utilizadas em projetos ambientais.

O objetivo é facilitar o armazenamento de informações sobre espécies nativas destinadas ao reflorestamento e recuperação de áreas degradadas.

Tecnologias Utilizadas
Laravel
PHP
SQLite
Blade
HTML
CSS
Funcionalidades
Página Inicial

Apresenta informações gerais sobre o sistema e seu objetivo.

Cadastro de Sementes

Permite cadastrar:

Nome da semente
Espécie
Quantidade disponível
Região recomendada
Listagem de Sementes

Exibe todas as sementes cadastradas no banco de dados.

Página Sobre

Apresenta a finalidade do projeto.

Página 404

Implementada utilizando Rota Fallback do Laravel.

Segurança

O formulário utiliza proteção CSRF através da diretiva:

@csrf

garantindo proteção contra ataques Cross Site Request Forgery.

Banco de Dados

Tabela: seeds

Campos:

id
name
species
quantity
region
created_at
updated_at
Rotas Implementadas
Método	URL	Função
GET	/	Home
GET	/seeds	Listagem
GET	/create	Formulário
POST	/store	Salvar
GET	/about	Sobre
FALLBACK	*	Erro 404
Views Publicadas
home.blade.php

Página principal.

seeds.blade.php

Lista todas as sementes cadastradas.

create.blade.php

Formulário de cadastro com CSRF Protection.

about.blade.php

Informações sobre o projeto.

404.blade.php

Página exibida quando a rota não existe.

layouts/app.blade.php

Layout principal compartilhado.

Execução
Clonar o projeto

git clone repositorio

Instalar dependências

composer install

Criar banco SQLite

database/database.sqlite

Configurar .env

DB_CONNECTION=sqlite

Executar migration

php artisan migrate

Iniciar servidor

php artisan serve
