import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM produto', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { pro_SKU, pro_descricao } = req.body;
  db.query(
    'INSERT INTO produto (pro_SKU, pro_descricao) VALUES (?, ?)',
    [pro_SKU, pro_descricao],
    (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json({ id: result.insertId, pro_SKU, pro_descricao });
    }
  );
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { pro_SKU, pro_descricao } = req.body;
  db.query(
    'UPDATE produto SET pro_SKU = ?, pro_descricao = ? WHERE pro_id = ?',
    [pro_SKU, pro_descricao, id],
    err => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: 'Produto atualizado com sucesso' });
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM produto WHERE pro_id = ?', [id], err => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Produto removido com sucesso' });
  });
});

export default router;
