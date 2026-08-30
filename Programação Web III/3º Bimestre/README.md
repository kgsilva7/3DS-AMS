# Laravel - Mapeamento Objeto-Relacional (ORM) em Tempo Real

Projeto desenvolvido como atividade prática de Mapeamento Objeto-Relacional (ORM) utilizando **Laravel** e **MySQL**, aplicando os três principais tipos de relacionamentos de banco de dados relacional.

---

## Tecnologias Utilizadas

* **Framework:** Laravel 11.x
* **Linguagem:** PHP 8.x
* **ORM:** Eloquent ORM
* **Banco de Dados:** MySQL 8.0
* **Ferramenta de Migrações:** Laravel Migrations (DDL)

---

## Modelagem do Banco de Dados e Relacionamentos

A arquitetura foi projetada para demonstrar na prática os relacionamentos **1:1**, **1:N** e **N:M** mantendo a integridade referencial via Chaves Estrangeiras (*Foreign Keys*).

| Tabela | Tipo de Relacionamento | Tabela Relacionada | Mapeamento no Eloquent (Model) | Descrição do Relacionamento |
| :--- | :---: | :--- | :--- | :--- |
| `profiles` | **1:1** | `users` | `$this->belongsTo(User::class)` | Cada perfil pertence a um único usuário. A coluna `user_id` possui restrição `UNIQUE`. |
| `users` | **1:1** | `profiles` | `$this->hasOne(Profile::class)` | Um usuário possui exatamente um perfil configurado. |
| `products` | **1:N** | `categories` | `$this->belongsTo(Category::class)` | Todo produto pertence obrigatoriamente a uma categoria. |
| `categories` | **1:N** | `products` | `$this->hasMany(Product::class)` | Uma categoria pode conter múltiplos produtos cadastrados. |
| `products` | **N:M** | `tags` | `$this->belongsToMany(Tag::class)` | Um produto pode possuir várias tags de identificação. |
| `tags` | **N:M** | `products` | `$this->belongsToMany(Product::class)` | Uma tag pode estar associada a múltiplos produtos via tabela pivô `product_tag`. |

---

## Estrutura Técnica das Tabelas (DDL)

### 1. Relacionamento 1:1 (`users` <-> `profiles`)
* **`profiles`**: Possui a coluna `user_id` configurada como `foreignId('user_id')->unique()->constrained()->onDelete('cascade')`. A cláusula `unique()` assegura a cardinalidade de 1 para 1.

### 2. Relacionamento 1:N (`categories` <-> `products`)
* **`products`**: Possui a coluna `category_id` com `foreignId('category_id')->constrained()->onDelete('cascade')`, estabelecendo a integridade referencial com a tabela `categories`.

### 3. Relacionamento N:M (`products` <-> `tags`)
* **`product_tag`**: Tabela pivô contendo `product_id` e `tag_id`, ambas vinculadas por `foreignId()->constrained()->onDelete('cascade')`.

---

## Observação Técnica sobre o DDL Exportado (`mapeamento_orm.sql`)

No arquivo **`mapeamento_orm.sql`** (localizado na raiz do repositório), as declarações DDL de `CREATE TABLE` definem as colunas e tipos de dados. As restrições de Chaves Estrangeiras (`FOREIGN KEY`) são aplicadas no final do script através de comandos `ALTER TABLE ... ADD CONSTRAINT`. 

Essa é uma prática padrão de exportação do MySQL para garantir a criação limpa das tabelas antes de aplicar as dependências relacionais, prevenindo erros de ordem de execução DDL.

---

## Como Executar o Projeto Localmente

1. **Clonar o repositório:**
```bash
   git clone [https://github.com/joaoxaviersilva/mapeamento-orm.git](https://github.com/joaoxaviersilva/mapeamento-orm.git)
   cd mapeamento-orm
```

2. **Instalar as dependências do Composer:**
```bash
composer install
```

3. **Configurar o ambiente (`.env`):**
```bash
cp .env.example .env
```

Ajuste as credenciais do banco de dados MySQL no arquivo `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=mapeamento_orm
DB_USERNAME=root
DB_PASSWORD=

```

4. **Gerar a chave da aplicação:**
```bash
php artisan key:generate
```

5. **Executar as Migrations:**
```bash
php artisan migrate
```
