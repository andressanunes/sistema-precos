const db = require('../config/db');

// GET - listar todas as condições de pagamento
exports.getAllCondPagto = (req, res) => {
    db.query('SELECT * FROM condpagto', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// GET - buscar condição de pagamento por ID
exports.getCondPagtoById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM condpagto WHERE cpg_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Condição não encontrada' });
        res.json(results[0]);
    });
};

// POST - criar nova condição de pagamento
exports.createCondPagto = (req, res) => {
    const { cpg_descricao, cpg_dias } = req.body;
    db.query('INSERT INTO condpagto (cpg_descricao, cpg_dias) VALUES (?, ?)', 
    [cpg_descricao, cpg_dias], 
    (err, result) => {
        if (err) return res.status(400).json({ error: err.message });
        res.status(201).json({ id: result.insertId, cpg_descricao, cpg_dias });
    });
};

// PUT - atualizar condição de pagamento
exports.updateCondPagto = (req, res) => {
    const { id } = req.params;
    const { cpg_descricao, cpg_dias } = req.body;
    db.query('UPDATE condpagto SET cpg_descricao = ?, cpg_dias = ? WHERE cpg_id = ?', 
    [cpg_descricao, cpg_dias, id], 
    (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Condição de pagamento atualizada com sucesso' });
    });
};

// DELETE - deletar condição de pagamento
exports.deleteCondPagto = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM condpagto WHERE cpg_id = ?', [id], (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Condição de pagamento removida com sucesso' });
    });
};
