const db = require('../config/db');

// GET - listar todos os produtos
exports.getAllProdutos = (req, res) => {
    db.query('SELECT * FROM produto', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// GET - buscar um produto por ID
exports.getProdutoById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM produto WHERE pro_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Produto não encontrado' });
        res.json(results[0]);
    });
};

// POST - criar novo produto
exports.createProduto = (req, res) => {
    const { pro_SKU, pro_descricao } = req.body;
    db.query('INSERT INTO produto (pro_SKU, pro_descricao) VALUES (?, ?)',
        [pro_SKU, pro_descricao],
        (err, result) => {
            if (err) return res.status(400).json({ error: err.message });
            res.status(201).json({ id: result.insertId, pro_SKU, pro_descricao });
        });
};

// PUT - atualizar produto
exports.updateProduto = (req, res) => {
    const { id } = req.params;
    const { pro_SKU, pro_descricao } = req.body;
    db.query('UPDATE produto SET pro_SKU = ?, pro_descricao = ? WHERE pro_id = ?',
        [pro_SKU, pro_descricao, id],
        (err) => {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ message: 'Produto atualizado com sucesso' });
        });
};

// DELETE - deletar produto
exports.deleteProduto = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM produto WHERE pro_id = ?', [id], (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Produto removido com sucesso' });
    });
};
