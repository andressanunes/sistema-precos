const db = require('../config/db');

// GET - listar todos os preços cadastrados
exports.getAllPrecos = (req, res) => {
    const query = `
        SELECT pc.pc_id, c.cli_razaosocial, p.pro_descricao, cp.cpg_descricao, 
               pc.preco, pc.data_inicio, pc.data_fim
        FROM preco_cliente pc
        JOIN cliente c ON pc.cli_id = c.cli_id
        JOIN produto p ON pc.pro_id = p.pro_id
        JOIN condpagto cp ON pc.cpg_id = cp.cpg_id
    `;

    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// GET - buscar um preço específico por ID
exports.getPrecoById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM preco_cliente WHERE pc_id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Preço não encontrado' });
        res.json(results[0]);
    });
};

// POST - cadastrar novo preço
exports.createPreco = (req, res) => {
    const { cli_id, pro_id, cpg_id, preco, data_inicio, data_fim } = req.body;
    db.query(
        `INSERT INTO preco_cliente (cli_id, pro_id, cpg_id, preco, data_inicio, data_fim)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [cli_id, pro_id, cpg_id, preco, data_inicio, data_fim || null],
        (err, result) => {
            if (err) return res.status(400).json({ error: err.message });
            res.status(201).json({ id: result.insertId, cli_id, pro_id, cpg_id, preco, data_inicio, data_fim });
        }
    );
};

// PUT - atualizar preço existente
exports.updatePreco = (req, res) => {
    const { id } = req.params;
    const { cli_id, pro_id, cpg_id, preco, data_inicio, data_fim } = req.body;

    db.query(
        `UPDATE preco_cliente SET cli_id = ?, pro_id = ?, cpg_id = ?, preco = ?, 
         data_inicio = ?, data_fim = ? WHERE pc_id = ?`,
        [cli_id, pro_id, cpg_id, preco, data_inicio, data_fim || null, id],
        (err) => {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ message: 'Preço atualizado com sucesso' });
        }
    );
};

// DELETE - deletar preço
exports.deletePreco = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM preco_cliente WHERE pc_id = ?', [id], (err) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ message: 'Preço removido com sucesso' });
    });
};
