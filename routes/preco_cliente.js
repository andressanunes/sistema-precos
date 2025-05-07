import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  const sql = `
    SELECT pc.*, c.cli_razaosocial, p.pro_descricao, cp.cpg_descricao
    FROM preco_cliente pc
    JOIN cliente c ON pc.cli_id = c.cli_id
    JOIN produto p ON pc.pro_id = p.pro_id
    JOIN condpagto cp ON pc.cpg_id = cp.cpg_id
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { cli_id, pro_id, cpg_id, preco, data_inicio } = req.body;
  const sql = `
    INSERT INTO preco_cliente (cli_id, pro_id, cpg_id, preco, data_inicio)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [cli_id, pro_id, cpg_id, preco, data_inicio], (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ message: 'Preço cadastrado com sucesso' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { preco, data_inicio } = req.body;

  db.query(
    'UPDATE preco_cliente SET preco = ?, data_inicio = ? WHERE id = ?',
    [preco, data_inicio, id],
    err => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: 'Preço atualizado com sucesso' });
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM preco_cliente WHERE id = ?', [id], err => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Preço removido com sucesso' });
  });
});

export default router;
