# 🧾 Sistema de Preços com Node.js, MySQL e Front-end Integrado

Este é um sistema completo de cadastro e gerenciamento de preços por cliente, com estrutura em Node.js, banco de dados MySQL e interface web responsiva e funcional.

## 🚀 Funcionalidades

- Cadastro de **clientes**, **produtos** e **condições de pagamento**
- Associação de **preço personalizado** por cliente + produto + condição
- Edição e exclusão de registros
- Notificação (futura) sobre alteração de preço com possível uso de mensageria
- Interface amigável em HTML/CSS com interação via `fetch()`
- Servido automaticamente pela API (`localhost:3000`)

---

## 🛠️ Tecnologias Utilizadas

- **Back-end:** Node.js + Express
- **Banco de dados:** MySQL
- **Front-end:** HTML, CSS, JavaScript puro
- **Outros:** dotenv, open, CORS
- **Padrão:** ES Modules (`"type": "module"`)

---

## 📁 Estrutura do Projeto
sistema-precos/
├── config/
│ └── db.js # Conexão com MySQL
├── frontend/
│ ├── index.html # Interface principal
│ ├── style.css # Estilo da interface
│ └── script.js # Lógica de interação
├── routes/
│ ├── cliente.js
│ ├── produto.js
│ ├── condpagto.js
│ └── preco_cliente.js
├── server.js # Inicialização da API + front
├── .env # Variáveis de ambiente
├── package.json
└── README.md
 ## ⚙️ Configuração

### 1. Clone o projeto

---

## ⚙️ Configuração

### 1. Clone o projeto
### 2. Instale as dependencias
npm install
### 3. Crie o arquivo env.
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=pagamentos

### 4. Configure o banco de dados MySQL
Use este script para criar as tabelas (adapte se necessário):
CREATE DATABASE IF NOT EXISTS pagamentos;
USE pagamentos;

CREATE TABLE cliente (
  cli_id INT AUTO_INCREMENT PRIMARY KEY,
  cli_cnpj VARCHAR(45),
  cli_razaosocial VARCHAR(45)
);

CREATE TABLE produto (
  pro_id INT AUTO_INCREMENT PRIMARY KEY,
  pro_SKU VARCHAR(45),
  pro_descricao VARCHAR(45)
);

CREATE TABLE condpagto (
  cpg_id INT AUTO_INCREMENT PRIMARY KEY,
  cpg_descricao VARCHAR(45),
  cpg_dias VARCHAR(45)
);

CREATE TABLE preco_cliente (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cli_id INT,
  pro_id INT,
  cpg_id INT,
  preco DECIMAL(10,2),
  data_inicio DATE,
  FOREIGN KEY (cli_id) REFERENCES cliente(cli_id) ON DELETE CASCADE,
  FOREIGN KEY (pro_id) REFERENCES produto(pro_id) ON DELETE CASCADE,
  FOREIGN KEY (cpg_id) REFERENCES condpagto(cpg_id) ON DELETE CASCADE
);

### Como rodar
node server.js
A aplicação será aberta automaticamente no navegador em: http://localhost:3000


