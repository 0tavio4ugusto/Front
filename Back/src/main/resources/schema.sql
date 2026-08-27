CREATE TABLE IF NOT EXISTS tarefa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao VARCHAR(255),
    prioridade VARCHAR(10),
    categoria VARCHAR(20),
    data VARCHAR(10)
    );