create database bd_biblioteca
use bd_biblioteca

CREATE TABLE usuarios (

cod_usuario int identity primary key,
nome varchar(50),
email varchar(150) unique,
senha varchar(100),
cpf varchar(14) unique,

)

CREATE TABLE autores (

cod_autor int identity primary key,
nome varchar(50),
email varchar(150) unique,
senha varchar(100),
cpf varchar(14) unique,

)

CREATE TABLE livros (

cod_livro int identity primary key,
titulo varchar(50),

)

CREATE TABLE categoria (

cod_categoria int primary key,
nome varchar(50),

)

CREATE TABLE emprestimo (

cod_emprestimo int identity primary key,
cod_usuario int,

FOREIGN KEY (cod_usuario) REFERENCES usuarios(cod_usuario)

)

CREATE TABLE livro_categoria(

cod_livro int,
cod_categoria int,

FOREIGN KEY (cod_livro) REFERENCES livros(cod_livro),
FOREIGN KEY (cod_categoria) REFERENCES categoria(cod_categoria)

)

CREATE TABLE livro_emprestimo (

cod_livro int,
cod_emprestimo int,

FOREIGN KEY (cod_livro) REFERENCES livros(cod_livro),
FOREIGN KEY (cod_emprestimo) REFERENCES emprestimo(cod_emprestimo),
	
)

CREATE TABLE autor_livro (

cod_autor int,
cod_livro int,

FOREIGN KEY (cod_autor) REFERENCES autores(cod_autor),
FOREIGN KEY (cod_livro) REFERENCES livros(cod_livro),

)