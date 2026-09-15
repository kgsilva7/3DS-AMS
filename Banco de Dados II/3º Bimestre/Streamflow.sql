-- PROJETO: StreamFlow
-- DATA: 15/09/2026
-- ESCOLA: ETEC DA ZONA LESTE, A.E CARVALHO (211)
-- DISCIPLINA: Banco de Dados II
-- AUTOR: GUSTAVO ALEXANDRE DA SILVA
-- CURSO: DESENVOLVIMENTO DE SISTEMAS (DS)
-- TURMA: 3º AMS NOVOTEC-FATEC
-- PROFESSOR: Salomão Nascimento
-- SGBD: MySQL 8.0+
DROP DATABASE IF EXISTS streamflow_producao;
CREATE DATABASE streamflow_producao
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;
USE streamflow_producao;
DELIMITER $$
SET FOREIGN_KEY_CHECKS = 0;
SET SQL_SAFE_UPDATES = 0;
SET @data_atual = CURDATE();
CREATE TABLE assinantes (
    id                      INT AUTO_INCREMENT PRIMARY KEY,
    nome                    VARCHAR(120)   NOT NULL,
    cpf                     CHAR(11)       NOT NULL UNIQUE,
    email                   VARCHAR(150)   NOT NULL UNIQUE,
    data_nascimento         DATE           NOT NULL,
    uf                      CHAR(2)        NOT NULL,
    saldo_creditos          DECIMAL(10,2)  NOT NULL DEFAULT 0.00,
    data_ultima_alteracao   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP
                                    ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_saldo_nao_negativo CHECK (saldo_creditos >= 0),
    CONSTRAINT chk_uf_valida CHECK (uf IN (
        'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS',
        'MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC',
        'SP','SE','TO'
    ))
) ENGINE=InnoDB;
CREATE TABLE perfis (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    assinante_id    INT            NOT NULL,
    nome            VARCHAR(80)    NOT NULL,
    avatar          VARCHAR(255)   NULL,
    criado_em       DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_perfis_assinante
        FOREIGN KEY (assinante_id) REFERENCES assinantes(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_perfil_por_assinante UNIQUE (assinante_id, nome)
) ENGINE=InnoDB;
CREATE TABLE produtoras (
    id      INT AUTO_INCREMENT PRIMARY KEY,
    nome    VARCHAR(120) NOT NULL UNIQUE
) ENGINE=InnoDB;
CREATE TABLE videos (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    produtora_id        INT            NOT NULL,
    titulo              VARCHAR(180)   NOT NULL,
    duracao_segundos    INT            NOT NULL,
    tipo                ENUM('FILME','EPISODIO') NOT NULL DEFAULT 'FILME',
    temporada           INT            NULL,   -- só para EPISODIO
    episodio            INT            NULL,   -- só para EPISODIO
    CONSTRAINT fk_videos_produtora
        FOREIGN KEY (produtora_id) REFERENCES produtoras(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT chk_duracao_positiva CHECK (duracao_segundos > 0)
) ENGINE=InnoDB;
CREATE TABLE reproducoes (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    perfil_id       INT            NOT NULL,
    video_id        INT            NOT NULL,
    ip_conexao      VARCHAR(45)    NOT NULL,
    dispositivo     VARCHAR(60)    NOT NULL,
    iniciado_em     DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    concluido       BOOLEAN        NOT NULL DEFAULT FALSE,
    CONSTRAINT fk_repro_perfil
        FOREIGN KEY (perfil_id) REFERENCES perfis(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT fk_repro_video
        FOREIGN KEY (video_id) REFERENCES videos(id)
        ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_repro_data (iniciado_em),
    INDEX idx_repro_video (video_id)
) ENGINE=InnoDB;
CREATE TABLE faturamento_produtoras (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    produtora_id        INT            NOT NULL,
    competencia         DATE           NOT NULL,
    minutos_consumidos  INT            NOT NULL DEFAULT 0,
    CONSTRAINT fk_fat_produtora
        FOREIGN KEY (produtora_id) REFERENCES produtoras(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT uq_fat_comp UNIQUE (produtora_id, competencia)
) ENGINE=InnoDB;
CREATE TABLE auditoria_log (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    tabela      VARCHAR(60)  NOT NULL,
    operacao    VARCHAR(20)  NOT NULL,
    usuario     VARCHAR(80)  NOT NULL,
    valor_antigo TEXT        NULL,
    valor_novo   TEXT        NULL,
    data_hora   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE TABLE resumo_reproducao (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    total_acessos   BIGINT NOT NULL DEFAULT 0,
    atualizado_em   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
                                ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;
INSERT INTO resumo_reproducao (id, total_acessos) VALUES (1, 0);
SET FOREIGN_KEY_CHECKS = 1;
CREATE OR REPLACE VIEW vw_assinantes_lgpd AS
SELECT
    a.id,
    CONCAT(SUBSTRING(a.nome, 1, 3), '***')      AS nome_mascarado,
    CONCAT('***', SUBSTRING(a.cpf, 4, 3), '***') AS cpf_mascarado,
    CONCAT(SUBSTRING(a.email, 1, 2), '***@***')  AS email_mascarado,
    a.uf,
    a.saldo_creditos
FROM assinantes a;
INSERT INTO assinantes (nome, cpf, email, data_nascimento, uf, saldo_creditos) VALUES
('joão silva',        '11111111111', 'joao@email.com',    '1990-05-10', 'SP', 100.00),
('maria santos',      '22222222222', 'maria@email.com',   '1985-08-22', 'RJ',  50.00),
('pedro oliveira',    '33333333333', 'pedro@email.com',   '2000-01-15', 'MG',   0.00),
('ana costa',         '44444444444', 'ana@email.com',     '1978-11-30', 'RS', 200.00),
('carlos pereira',    '55555555555', 'carlos@email.com',  '1995-03-07', 'BA',  30.00),
('fernanda lima',     '66666666666', 'fernanda@email.com','2002-07-19', 'PR',  75.00),
('rafael souza',      '77777777777', 'rafael@email.com',  '1988-12-01', 'PE',  10.00);
INSERT INTO perfis (assinante_id, nome, avatar) VALUES
(1, 'João',        'avatar_joao.png'),
(1, 'Kids',        'avatar_kids.png'),
(2, 'Maria',       'avatar_maria.png'),
(3, 'Pedro',       'avatar_pedro.png'),
(4, 'Ana',         'avatar_ana.png'),
(4, 'Trabalho',    'avatar_work.png'),
(5, 'Carlos',      'avatar_carlos.png'),
(6, 'Fernanda',    'avatar_fe.png'),
(7, 'Rafael',      'avatar_rafa.png');
INSERT INTO produtoras (nome) VALUES
('Warner Bros'),
('Netflix Originals'),
('Disney Studios'),
('A24 Films'),
('Globo Filmes');
INSERT INTO videos (produtora_id, titulo, duracao_segundos, tipo, temporada, episodio) VALUES
(1, 'Matrix',                     8160,  'FILME',    NULL, NULL),
(1, 'Interestelar',               10140, 'FILME',    NULL, NULL),
(2, 'Stranger Things T1E1',       2880,  'EPISODIO', 1,    1),
(2, 'Stranger Things T1E2',       2940,  'EPISODIO', 1,    2),
(2, 'Stranger Things T2E1',       3120,  'EPISODIO', 2,    1),
(3, 'O Rei Leão',                 5340,  'FILME',    NULL, NULL),
(3, 'Frozen',                     6060,  'FILME',    NULL, NULL),
(4, 'Moonlight',                  6660,  'FILME',    NULL, NULL),
(5, 'Cidade de Deus',             7800,  'FILME',    NULL, NULL),
(5, 'Tropa de Elite',             7080,  'FILME',    NULL, NULL);
INSERT INTO reproducoes (perfil_id, video_id, ip_conexao, dispositivo, iniciado_em, concluido) VALUES
(1, 1, '192.168.0.10', 'Smart TV',    '2025-03-05 20:00:00', TRUE),
(1, 2, '192.168.0.10', 'Smart TV',    '2025-03-06 21:00:00', TRUE),
(2, 3, '192.168.0.11', 'Celular',     '2025-03-07 19:30:00', TRUE),
(3, 4, '192.168.0.12', 'Notebook',    '2025-03-08 22:15:00', FALSE),
(4, 5, '192.168.0.13', 'Tablet',      '2025-03-09 18:00:00', TRUE),
(5, 6, '192.168.0.14', 'Smart TV',    '2025-03-10 20:45:00', TRUE),
(6, 7, '192.168.0.15', 'Celular',     '2025-03-11 21:30:00', TRUE),
(7, 8, '192.168.0.16', 'Notebook',    '2025-03-12 22:00:00', FALSE),
(8, 9, '192.168.0.17', 'Smart TV',    '2025-03-13 20:00:00', TRUE),
(9, 10,'192.168.0.18', 'Tablet',      '2025-03-14 19:00:00', TRUE);
UPDATE resumo_reproducao SET total_acessos = (SELECT COUNT(*) FROM reproducoes) WHERE id = 1;
DROP PROCEDURE IF EXISTS realizar_cobranca_mensal;
DELIMITER $$
CREATE PROCEDURE realizar_cobranca_mensal(
    IN  p_assinante_id  INT,
    IN  p_valor         DECIMAL(10,2),
    OUT p_novo_saldo    DECIMAL(10,2),
    OUT p_mensagem      VARCHAR(255)
)
BEGIN
    DECLARE v_saldo_atual   DECIMAL(10,2);
    DECLARE v_nome          VARCHAR(120);
    DECLARE v_existe        INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_novo_saldo = NULL;
        SET p_mensagem   = CONCAT('ERRO: cobrança cancelada para o assinante id=',
                                  p_assinante_id, '. Operação revertida.');
    END;
    START TRANSACTION;
    SELECT COUNT(*) INTO v_existe
    FROM assinantes
    WHERE id = p_assinante_id;
    IF v_existe = 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Assinante não encontrado.';
    END IF;
    SELECT saldo_creditos, nome
      INTO v_saldo_atual, v_nome
    FROM assinantes
    WHERE id = p_assinante_id
    FOR UPDATE; 
    IF v_saldo_atual < p_valor THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Saldo insuficiente para cobrança da mensalidade.';
    END IF;
    UPDATE assinantes
       SET saldo_creditos = saldo_creditos - p_valor
     WHERE id = p_assinante_id;
    SELECT saldo_creditos INTO p_novo_saldo
    FROM assinantes
    WHERE id = p_assinante_id;
    SET p_mensagem = CONCAT('Cobrança realizada com sucesso para ',
                            v_nome, '. Novo saldo: R$ ',
                            FORMAT(p_novo_saldo, 2));
    COMMIT;
END$$
DELIMITER ;
CALL realizar_cobranca_mensal(1, 30.00, @saldo, @msg);
SELECT @saldo AS novo_saldo, @msg AS mensagem;
SELECT id, nome, saldo_creditos FROM assinantes WHERE id = 1;
CALL realizar_cobranca_mensal(3, 30.00, @saldo, @msg);
SELECT @saldo AS novo_saldo, @msg AS mensagem;
SELECT id, nome, saldo_creditos FROM assinantes WHERE id = 3;
DROP PROCEDURE IF EXISTS registrar_reproducao;
DELIMITER $$
CREATE PROCEDURE registrar_reproducao(
    IN  p_perfil_id   INT,
    IN  p_video_id    INT,
    IN  p_ip          VARCHAR(45),
    IN  p_dispositivo VARCHAR(60),
    OUT p_repro_id    INT,
    OUT p_mensagem    VARCHAR(255)
)
BEGIN
    DECLARE v_perfil_existe INT DEFAULT 0;
    DECLARE v_video_existe  INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_repro_id = NULL;
        SET p_mensagem = 'ERRO: não foi possível registrar a reprodução. Operação revertida.';
    END;
    START TRANSACTION;
    SELECT COUNT(*) INTO v_perfil_existe FROM perfis WHERE id = p_perfil_id;
    IF v_perfil_existe = 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Perfil inexistente.';
    END IF;
    SELECT COUNT(*) INTO v_video_existe FROM videos WHERE id = p_video_id;
    IF v_video_existe = 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Vídeo inexistente.';
    END IF;
    INSERT INTO reproducoes (perfil_id, video_id, ip_conexao, dispositivo, iniciado_em, concluido)
    VALUES (p_perfil_id, p_video_id, p_ip, p_dispositivo, NOW(), FALSE);
    SET p_repro_id = LAST_INSERT_ID();
    SET p_mensagem = CONCAT('Reprodução registrada com sucesso. id=', p_repro_id);
    COMMIT;
END$$
DELIMITER ;
CALL registrar_reproducao(1, 3, '10.0.0.1', 'Smart TV', @rid, @msg);
SELECT @rid AS repro_id, @msg AS mensagem;
CALL registrar_reproducao(999, 3, '10.0.0.1', 'Smart TV', @rid, @msg);
SELECT @rid AS repro_id, @msg AS mensagem;
DROP PROCEDURE IF EXISTS gerar_faturamento_mensal;
DELIMITER $$
CREATE PROCEDURE gerar_faturamento_mensal(
    IN  p_competencia DATE,
    OUT p_msg         VARCHAR(255)
)
BEGIN
    DECLARE v_prod_id     INT;
    DECLARE v_prod_nome   VARCHAR(120);
    DECLARE v_minutos     INT;
    DECLARE v_fim         BOOLEAN DEFAULT FALSE;
    DECLARE v_total       INT DEFAULT 0;
    DECLARE cur_produtoras CURSOR FOR
        SELECT id, nome FROM produtoras ORDER BY id;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_fim = TRUE;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_msg = 'ERRO: falha ao gerar faturamento. Operação revertida.';
    END;
    START TRANSACTION;
    OPEN cur_produtoras;
    loop_produtoras: LOOP
        FETCH cur_produtoras INTO v_prod_id, v_prod_nome;
        IF v_fim THEN
            LEAVE loop_produtoras;
        END IF;
        SET v_minutos = minutos_assistidos_por_produtora(v_prod_id, p_competencia);
        INSERT INTO faturamento_produtoras (produtora_id, competencia, minutos_consumidos)
        VALUES (v_prod_id, p_competencia, v_minutos)
        ON DUPLICATE KEY UPDATE minutos_consumidos = VALUES(minutos_consumidos);
        SET v_total = v_total + 1;
    END LOOP;
    CLOSE cur_produtoras;
    COMMIT;
    SET p_msg = CONCAT('Faturamento gerado para ', v_total,
                       ' produtoras na competência ', DATE_FORMAT(p_competencia, '%Y-%m'), '.');
END$$
DELIMITER ;
CALL gerar_faturamento_mensal('2025-03-01', @msg);
SELECT @msg AS mensagem;
SELECT p.nome, f.competencia, f.minutos_consumidos
FROM faturamento_produtoras f
JOIN produtoras p ON p.id = f.produtora_id
ORDER BY p.nome;
DROP FUNCTION IF EXISTS minutos_assistidos_por_produtora;
DELIMITER $$
CREATE FUNCTION minutos_assistidos_por_produtora(
    p_id_produtora INT,
    p_competencia  DATE
)
RETURNS INT
DETERMINISTIC
READS SQL DATA
BEGIN
    DECLARE v_total INT DEFAULT 0;
    SELECT COALESCE(SUM(FLOOR(v.duracao_segundos / 60)), 0)
      INTO v_total
    FROM reproducoes r
    JOIN videos v ON v.id = r.video_id
    WHERE v.produtora_id = p_id_produtora
      AND r.concluido = TRUE
      AND r.iniciado_em >= p_competencia
      AND r.iniciado_em <  DATE_ADD(p_competencia, INTERVAL 1 MONTH);
    RETURN v_total;
END$$
DELIMITER ;
SELECT minutos_assistidos_por_produtora(1, '2025-03-01') AS minutos_p1;
SELECT minutos_assistidos_por_produtora(2, '2025-03-01') AS minutos_p2;
SELECT minutos_assistidos_por_produtora(5, '2025-03-01') AS minutos_p5;
DROP FUNCTION IF EXISTS calcular_idade;
DELIMITER $$
CREATE FUNCTION calcular_idade(p_data_nascimento DATE)
RETURNS INT
DETERMINISTIC
NO SQL
BEGIN
    DECLARE v_idade INT;
    SET v_idade = TIMESTAMPDIFF(YEAR, p_data_nascimento, CURDATE());
    RETURN v_idade;
END$$
DELIMITER ;
CREATE OR REPLACE VIEW vw_assinantes_lgpd AS
SELECT
    a.id,
    CONCAT(SUBSTRING(a.nome, 1, 3), '***')       AS nome_mascarado,
    CONCAT('***', SUBSTRING(a.cpf, 4, 3), '***') AS cpf_mascarado,
    CONCAT(SUBSTRING(a.email, 1, 2), '***@***')  AS email_mascarado,
    a.uf,
    a.saldo_creditos,
    calcular_idade(a.data_nascimento)            AS idade
FROM assinantes a;
SELECT calcular_idade('1990-05-10') AS idade_joao;
SELECT * FROM vw_assinantes_lgpd;
DROP TRIGGER IF EXISTS trg_assinantes_saldo_bi;
DELIMITER $$
CREATE TRIGGER trg_assinantes_saldo_bi
BEFORE INSERT ON assinantes
FOR EACH ROW
BEGIN
    IF NEW.saldo_creditos < 0 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'RN01 violada: saldo de créditos não pode ser negativo (INSERT).';
    END IF;
END$$
DELIMITER ;
INSERT INTO assinantes (nome, cpf, email, data_nascimento, uf, saldo_creditos)
VALUES ('teste negativo', '99999999999', 'teste@email.com', '1990-01-01', 'SP', -10.00);
UPDATE assinantes SET saldo_creditos = -5.00 WHERE id = 1;
UPDATE assinantes SET saldo_creditos = 50.00 WHERE id = 1;
SELECT id, nome, saldo_creditos FROM assinantes WHERE id = 1;
DROP TRIGGER IF EXISTS trg_repro_imutavel_bu;
DELIMITER $$
CREATE TRIGGER trg_repro_imutavel_bu
BEFORE UPDATE ON reproducoes
FOR EACH ROW
BEGIN
    SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'RN03 violada: histórico de reproduções é IMUTÁVEL (UPDATE bloqueado).';
END$$
DELIMITER ;
DROP TRIGGER IF EXISTS trg_perfis_auditoria_au;
DELIMITER $$
CREATE TRIGGER trg_perfis_auditoria_au
AFTER UPDATE ON perfis
FOR EACH ROW
BEGIN
    INSERT INTO auditoria_log (tabela, operacao, usuario, valor_antigo, valor_novo)
    VALUES (
        'perfis',
        'UPDATE',
        CURRENT_USER(),
        CONCAT('id=', OLD.id, '; nome=', OLD.nome, '; avatar=', IFNULL(OLD.avatar,'NULL')),
        CONCAT('id=', NEW.id, '; nome=', NEW.nome, '; avatar=', IFNULL(NEW.avatar,'NULL'))
    );
END$$
DELIMITER ;
UPDATE perfis SET avatar = 'novo_avatar.png' WHERE id = 1;
SELECT * FROM auditoria_log ORDER BY id DESC LIMIT 1;
DROP TRIGGER IF EXISTS trg_assinantes_timestamp_bu;
DELIMITER $$
CREATE TRIGGER trg_assinantes_timestamp_bu
BEFORE UPDATE ON assinantes
FOR EACH ROW
BEGIN
    SET NEW.data_ultima_alteracao = NOW();
END$$
DELIMITER ;
DROP TRIGGER IF EXISTS trg_assinantes_saneamento_bi;
DELIMITER $$
CREATE TRIGGER trg_assinantes_saneamento_bi
BEFORE INSERT ON assinantes
FOR EACH ROW
BEGIN
    SET NEW.nome = UPPER(TRIM(NEW.nome));
    SET NEW.email = LOWER(TRIM(NEW.email));
END$$
DELIMITER ;
INSERT INTO assinantes (nome, cpf, email, data_nascimento, uf, saldo_creditos)
VALUES ('   josé da silva   ', '88888888888', '  JOSE@EMAIL.COM  ', '1992-04-04', 'SP', 20.00);
SELECT id, nome, email FROM assinantes WHERE cpf = '88888888888';
DROP TRIGGER IF EXISTS trg_resumo_reproducao_ai;
DELIMITER $$
CREATE TRIGGER trg_resumo_reproducao_ai
AFTER INSERT ON reproducoes
FOR EACH ROW
BEGIN
    UPDATE resumo_reproducao
       SET total_acessos = total_acessos + 1,
           atualizado_em = NOW()
     WHERE id = 1;
END$$
DELIMITER ;
SELECT total_acessos FROM resumo_reproducao WHERE id = 1;
CALL registrar_reproducao(1, 5, '10.0.0.99', 'Smart TV', @rid, @msg);
SELECT total_acessos FROM resumo_reproducao WHERE id = 1;
DROP PROCEDURE IF EXISTS realizar_cobranca_mensal_v2;
DELIMITER $$
CREATE PROCEDURE realizar_cobranca_mensal_v2(
    IN  p_assinante_id  INT,
    IN  p_valor         DECIMAL(10,2),
    OUT p_novo_saldo    DECIMAL(10,2),
    OUT p_mensagem      VARCHAR(255)
)
BEGIN
    DECLARE v_saldo_atual DECIMAL(10,2);
    DECLARE v_nome        VARCHAR(120);
    DECLARE CONTINUE HANDLER FOR NOT FOUND
    BEGIN
        SET p_novo_saldo = NULL;
        SET p_mensagem   = 'Assinante não encontrado (NOT FOUND).';
    END;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SET p_novo_saldo = NULL;
        SET p_mensagem   = 'Erro inesperado. Operação revertida.';
    END;
    START TRANSACTION;
    SELECT saldo_creditos, nome
      INTO v_saldo_atual, v_nome
    FROM assinantes
    WHERE id = p_assinante_id;
    IF v_saldo_atual < p_valor THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Saldo insuficiente.';
    END IF;
    UPDATE assinantes
       SET saldo_creditos = saldo_creditos - p_valor
     WHERE id = p_assinante_id;
    SELECT saldo_creditos INTO p_novo_saldo
    FROM assinantes WHERE id = p_assinante_id;
    SET p_mensagem = CONCAT('Cobrança OK. Novo saldo: ', p_novo_saldo);
    COMMIT;
END$$
DELIMITER ;
SELECT '--- TESTE 1.1: COBRANÇA MENSAL ---' AS titulo;
CALL realizar_cobranca_mensal(1, 30.00, @saldo, @msg);
SELECT @saldo AS novo_saldo, @msg AS mensagem;
CALL realizar_cobranca_mensal(3, 30.00, @saldo, @msg);
SELECT @saldo AS novo_saldo, @msg AS mensagem;
SELECT saldo_creditos FROM assinantes WHERE id = 3;
SELECT '--- TESTE 1.2: REGISTRO DE REPRODUÇÃO ---' AS titulo;
CALL registrar_reproducao(1, 3, '10.0.0.1', 'Smart TV', @rid, @msg);
SELECT @rid AS repro_id, @msg AS mensagem;
CALL registrar_reproducao(999, 3, '10.0.0.1', 'Smart TV', @rid, @msg);
SELECT @rid AS repro_id, @msg AS mensagem;
SELECT '--- TESTE 1.3: FATURAMENTO MENSAL ---' AS titulo;
CALL gerar_faturamento_mensal('2025-03-01', @msg);
SELECT @msg AS mensagem;
SELECT p.nome, f.competencia, f.minutos_consumidos
FROM faturamento_produtoras f
JOIN produtoras p ON p.id = f.produtora_id
ORDER BY p.nome;
SELECT '--- TESTE 1.4: MINUTOS POR PRODUTORA ---' AS titulo;
SELECT
    p.id,
    p.nome,
    minutos_assistidos_por_produtora(p.id, '2025-03-01') AS minutos
FROM produtoras p
ORDER BY p.id;
SELECT '--- TESTE 1.5: IDADE E VIEW LGPD ---' AS titulo;
SELECT calcular_idade('1990-05-10') AS idade_joao;
SELECT * FROM vw_assinantes_lgpd;
SELECT '--- TESTE 2.1: RN01 SALDO NÃO NEGATIVO ---' AS titulo;
INSERT INTO assinantes (nome, cpf, email, data_nascimento, uf, saldo_creditos)
VALUES ('teste neg', '99999999999', 'neg@email.com', '1990-01-01', 'SP', -1.00);
UPDATE assinantes SET saldo_creditos = -5 WHERE id = 1;
UPDATE assinantes SET saldo_creditos = 50 WHERE id = 1;
SELECT saldo_creditos FROM assinantes WHERE id = 1;
SELECT '--- TESTE 2.2: RN03 HISTÓRICO IMUTÁVEL ---' AS titulo;
UPDATE reproducoes SET concluido = TRUE WHERE id = 1;
DELETE FROM reproducoes WHERE id = 1;
SELECT '--- TESTE 2.3: AUDITORIA ---' AS titulo;
UPDATE perfis SET avatar = 'avatar_atualizado.png' WHERE id = 2;
SELECT * FROM auditoria_log ORDER BY id DESC LIMIT 3;
SELECT '--- TESTE 2.4: TIMESTAMP E SANEAMENTO ---' AS titulo;
INSERT INTO assinantes (nome, cpf, email, data_nascimento, uf, saldo_creditos)
VALUES ('   ana clara   ', '77777777788', '  ANA.CLARA@EMAIL.COM  ', '1993-06-06', 'RJ', 15.00);
SELECT id, nome, email, data_ultima_alteracao
FROM assinantes WHERE cpf = '77777777788';
SELECT '--- TESTE 2.5: RESUMO DE REPRODUÇÃO ---' AS titulo;
SELECT total_acessos FROM resumo_reproducao WHERE id = 1;
INSERT INTO reproducoes (perfil_id, video_id, ip_conexao, dispositivo, concluido)
VALUES (1, 6, '10.0.0.50', 'Smart TV', TRUE);
SELECT total_acessos FROM resumo_reproducao WHERE id = 1;
SELECT '--- TESTE 3.1: EXCEÇÃO EM COBRANÇA ---' AS titulo;
CALL realizar_cobranca_mensal_v2(9999, 10.00, @s, @m);
SELECT @s AS saldo, @m AS mensagem;
CALL realizar_cobranca_mensal_v2(3, 10.00, @s, @m);
SELECT @s AS saldo, @m AS mensagem;
SELECT '--- TESTE DE CARGA: 1000 INSERTS ---' AS titulo;
DELIMITER $$
CREATE PROCEDURE teste_carga_1000()
BEGIN
    DECLARE i INT DEFAULT 1;
    DECLARE v_rid INT;
    DECLARE v_msg VARCHAR(255);
    WHILE i <= 1000 DO
        CALL registrar_reproducao(
            (i % 9) + 1,        -- perfil 1..9
            (i % 10) + 1,       -- vídeo 1..10
            '10.0.0.1',
            'LoadTest',
            v_rid, v_msg
        );
        SET i = i + 1;
    END WHILE;
    SELECT 'Carga de 1000 reproduções concluída.' AS resultado;
    SELECT COUNT(*) AS total_reproducoes FROM reproducoes;
    SELECT total_acessos FROM resumo_reproducao WHERE id = 1;
END$$
DELIMITER ;
SELECT '=== PROCEDURES ===' AS categoria;
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_schema = 'streamflow_producao'
  AND routine_type = 'PROCEDURE';
SELECT '=== FUNCTIONS ===' AS categoria;
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_schema = 'streamflow_producao'
  AND routine_type = 'FUNCTION';
SELECT '=== TRIGGERS ===' AS categoria;
SELECT trigger_name, event_manipulation, event_object_table, action_timing
FROM information_schema.triggers
WHERE trigger_schema = 'streamflow_producao'
ORDER BY event_object_table, action_timing;
SELECT '=== VIEWS ===' AS categoria;
SELECT table_name
FROM information_schema.views
WHERE table_schema = 'streamflow_producao';
SELECT '=== TABELAS ===' AS categoria;
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'streamflow_producao'
  AND table_type = 'BASE TABLE';
  // Exemplo JPA/Hibernate — chamada de procedure
@Procedure(procedureName = "realizar_cobranca_mensal")
void realizarCobrancaMensal(
    @Param("p_assinante_id") Integer assinanteId,
    @Param("p_valor") BigDecimal valor,
    @Param("p_novo_saldo") BigDecimal novoSaldo,
    @Param("p_mensagem") String mensagem
);
// Exemplo de chamada via EntityManager
StoredProcedureQuery query = em
    .createStoredProcedureQuery("registrar_reproducao")
    .registerStoredProcedureParameter("p_perfil_id", Integer.class, ParameterMode.IN)
    .registerStoredProcedureParameter("p_video_id", Integer.class, ParameterMode.IN)
    .registerStoredProcedureParameter("p_ip", String.class, ParameterMode.IN)
    .registerStoredProcedureParameter("p_dispositivo", String.class, ParameterMode.IN)
    .registerStoredProcedureParameter("p_repro_id", Integer.class, ParameterMode.OUT)
    .registerStoredProcedureParameter("p_mensagem", String.class, ParameterMode.OUT);
query.setParameter("p_perfil_id", 1);
query.setParameter("p_video_id", 3);
query.setParameter("p_ip", "10.0.0.1");
query.setParameter("p_dispositivo", "Smart TV");
query.execute();
Integer reproId = (Integer) query.getOutputParameterValue("p_repro_id");
String mensagem = (String) query.getOutputParameterValue("p_mensagem");
@Entity
@Table(name = "assinantes")
public class Assinante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false, length = 120)
    private String nome;
    @Column(nullable = false, unique = true, length = 11)
    private String cpf;
    @Column(nullable = false, unique = true, length = 150)
    private String email;
    @Column(name = "data_nascimento", nullable = false)
    private LocalDate dataNascimento;
    @Column(nullable = false, length = 2)
    private String uf;
    @Column(name = "saldo_creditos", nullable = false, precision = 10, scale = 2)
    private BigDecimal saldoCreditos;
    @Column(name = "data_ultima_alteracao", nullable = false)
    private LocalDateTime dataUltimaAlteracao;
    @OneToMany(mappedBy = "assinante", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Perfil> perfis = new ArrayList<>();
}