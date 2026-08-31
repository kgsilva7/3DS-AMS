# 🛡️ Laravel - Middlewares e Model

Projeto demonstrando a criação e uso de Middlewares personalizados no Laravel para controle de acesso.

## 📋 Descrição

Este projeto implementa um middleware que verifica se o usuário tem permissão para acessar determinada página. Se não tiver, exibe a mensagem:

> "Você não tem permissão para acessar este site. Favor entrar em contato com o administrador."

## 🔧 Tecnologias Utilizadas

- **Laravel 10/11**
- **PHP 8.1+**
- **MySQL**
- **Blade Templates**
- **Eloquent ORM**

## 📁 Estrutura do Projeto
app/
├── Http/
│ ├── Controllers/
│ │ └── AcessoController.php
│ ├── Middleware/
│ │ └── VerificarAcessoMiddleware.php
│ └── Kernel.php
└── Models/
└── User.php

database/
├── migrations/
│ └── 0001_01_01_000000_create_users_table.php
└── seeders/
└── UserSeeder.php

resources/views/
├── acesso.blade.php
├── negado.blade.php
└── login.blade.php

routes/web.php

text

## 🚀 Como Executar

### Pré-requisitos

- PHP >= 8.1
- Composer
- MySQL

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/laravel-middleware-app.git
cd laravel-middleware-app
Instale as dependências:

bash
composer install
Configure o .env:

bash
cp .env.example .env
Edite as credenciais do banco de dados.

Gere a chave da aplicação:

bash
php artisan key:generate
Execute as migrations e seeders:

bash
php artisan migrate
php artisan db:seed
Inicie o servidor:

bash
php artisan serve
Acesse: http://localhost:8000

🧪 Testando
Contas de Teste
Email	Senha	Permissão
admin@teste.com	12345678	✅ Admin
usuario@teste.com	12345678	❌ Usuário
Fluxo de Teste
Sem login: Acesse / → Redirecionado para /acesso-negado

Login como admin: Acessa / → Página permitida ✅

Login como usuário comum: Acessa / → Página negada com mensagem ❌

📸 Capturas de Tela
Página de Acesso Negado
https://screenshots/negado.png

Página de Acesso Permitido
https://screenshots/permitido.png

Página de Login
https://screenshots/login.png

🎥 Vídeo de Demonstração
[Link para o vídeo no YouTube/Drive]

📝 Código do Middleware
php
public function handle(Request $request, Closure $next): Response
{
    if (!Auth::check()) {
        return redirect()->route('acesso.negado');
    }

    if (!Auth::user()->hasAccess()) {
        return redirect()->route('acesso.negado')
            ->with('mensagem', 'Você não tem permissão para acessar este site.');
    }

    return $next($request);
}
👨‍💻 Autor
Gustavo Alexandre da Silva

GitHub: @kgsilva7

📄 Licença
Projeto desenvolvido para fins educacionais.

Tags: Laravel PHP Middleware Eloquent Blade Authentication Access Control

text

---

## 17. LISTA DE VERIFICAÇÃO PARA ENTREGA

- [ ] Projeto Laravel criado
- [ ] Middleware personalizado criado (`VerificarAcessoMiddleware`)
- [ ] Middleware registrado no `Kernel.php`
- [ ] Rota protegida com o middleware
- [ ] Controller criado
- [ ] Views criadas (acesso, negado, login)
- [ ] Model User com método `hasAccess()`
- [ ] Seeder com usuários de teste
- [ ] Banco de dados configurado
- [ ] Mensagem exibida corretamente
- [ ] Repositório no GitHub
- [ ] README atualizado
- [ ] Vídeo de demonstração

---

**O projeto está completo!** 🚀
