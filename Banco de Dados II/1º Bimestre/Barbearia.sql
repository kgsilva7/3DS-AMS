CREATE DATABASE Barbearia;
USE Barbearia;
CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100) NOT NULL UNIQUE,
    data_cadastro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE barbeiro (
    id_barbeiro SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    CONSTRAINT cpf_valido CHECK (cpf ~ '^[0-9]{11}$')
);
CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE servico (
    id_servico SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco NUMERIC(10,2) NOT NULL,
    id_categoria INT NOT NULL,
    CONSTRAINT preco_valido CHECK (preco >= 0),
    CONSTRAINT fk_categoria
        FOREIGN KEY (id_categoria)
        REFERENCES categoria(id_categoria)
        ON DELETE RESTRICT
);
CREATE TABLE agendamento (
    id_agendamento SERIAL PRIMARY KEY,
    data_hora TIMESTAMP NOT NULL,
    id_cliente INT NOT NULL,
    id_barbeiro INT NOT NULL,
    id_servico INT NOT NULL,
    valor_pago NUMERIC(10,2) NOT NULL,
    CONSTRAINT valor_pago_valido CHECK (valor_pago >= 0),
    CONSTRAINT fk_cliente
        FOREIGN KEY (id_cliente)
        REFERENCES cliente(id_cliente)
        ON DELETE RESTRICT,
    CONSTRAINT fk_barbeiro
        FOREIGN KEY (id_barbeiro)
        REFERENCES barbeiro(id_barbeiro)
        ON DELETE RESTRICT,
    CONSTRAINT fk_servico
        FOREIGN KEY (id_servico)
        REFERENCES servico(id_servico)
        ON DELETE RESTRICT
INSERT INTO agendamento (data_hora, id_cliente, id_barbeiro, id_servico, valor_pago)
VALUES ('2026-04-10 14:00', 999, 1, 1, 30.00);
);