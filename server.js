/*const express = import('express');
const cors = import('cors');
const path = import('path'); 
import open from 'open';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'frontend')));

const clienteRoutes = require('./routes/cliente');
const produtoRoutes = require('./routes/produto');
const condpagtoRoutes = require('./routes/condpagto');
const precoClienteRoutes = require('./routes/preco_cliente');

app.use('/clientes', clienteRoutes);
app.use('/produtos', produtoRoutes);
app.use('/condpagto', condpagtoRoutes);
app.use('/precos', precoClienteRoutes);


app.listen(port, () => {
    console.log(`✅ Servidor rodando em http://localhost:${port}`);
    open(`http://localhost:${port}`); 
});
*/
import express from 'express';
import cors from 'cors';
import path from 'path';
import open from 'open';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Resolver __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Inicialização do app
const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Servir arquivos da pasta frontend
app.use(express.static(path.join(__dirname, 'public')));

// Rotas da API
import clienteRoutes from './routes/cliente.js';
import produtoRoutes from './routes/produto.js';
import condpagtoRoutes from './routes/condpagto.js';
import precoClienteRoutes from './routes/preco_cliente.js';

app.use('/clientes', clienteRoutes);
app.use('/produtos', produtoRoutes);
app.use('/condpagto', condpagtoRoutes);
app.use('/precos', precoClienteRoutes);

// Inicializa o servidor e abre o navegador
app.listen(port, () => {
  console.log(`✅ Servidor rodando em http://localhost:${port}`);
  open(`http://localhost:${port}`);
});
