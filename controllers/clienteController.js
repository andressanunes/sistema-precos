const db = require('../config/db');

// GET - listar todos os clientes
exports.getAllClientes = (req, res) => {
    db.query('SELECT * FROM cliente', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// GET - buscar um cliente por ID
exports.getClienteById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM cliente WHERE cli_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Cliente não encontrado' });
        res.json(results[0]);
    });
};

// POST - criar novo cliente
exports.createCliente = (req, res) => {
    const { cli_cnpj, cli_razaosocial } = req.body;
    db.query('INSERT INTO cliente (cli_cnpj, cli_razaosocial) VALUES (?, ?)', 
    [cli_cnpj, cli_razaosocial], 
    (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({ id: result.insertId, cli_cnpj, cli_razaosocial });
    });
};

// PUT - atualizar cliente
exports.updateCliente = (req, res) => {
    const { id } = req.params;
    const { cli_cnpj, cli_razaosocial } = req.body;
    db.query('UPDATE cliente SET cli_cnpj = ?, cli_razaosocial = ? WHERE cli_id = ?', 
    [cli_cnpj, cli_razaosocial, id], 
    (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Cliente atualizado com sucesso' });
    });
};

// DELETE - deletar cliente
exports.deleteCliente = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM cliente WHERE cli_id = ?', [id], (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Cliente removido com sucesso' });
    });
};
