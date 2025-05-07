import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM condpagto', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { cpg_descricao, cpg_dias } = req.body;
  db.query(
    'INSERT INTO condpagto (cpg_descricao, cpg_dias) VALUES (?, ?)',
    [cpg_descricao, cpg_dias],
    (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json({ id: result.insertId, cpg_descricao, cpg_dias });
    }
  );
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { cpg_descricao, cpg_dias } = req.body;
  db.query(
    'UPDATE condpagto SET cpg_descricao = ?, cpg_dias = ? WHERE cpg_id = ?',
    [cpg_descricao, cpg_dias, id],
    err => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: 'Condição de pagamento atualizada com sucesso' });
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM condpagto WHERE cpg_id = ?', [id], err => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Condição de pagamento removida com sucesso' });
  });
});

export default router;
