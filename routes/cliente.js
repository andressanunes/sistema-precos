import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  db.query('SELECT * FROM cliente', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { cli_cnpj, cli_razaosocial } = req.body;
  db.query(
    'INSERT INTO cliente (cli_cnpj, cli_razaosocial) VALUES (?, ?)',
    [cli_cnpj, cli_razaosocial],
    (err, result) => {
      if (err) return res.status(400).json({ error: err.message });
      res.status(201).json({ id: result.insertId, cli_cnpj, cli_razaosocial });
    }
  );
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { cli_cnpj, cli_razaosocial } = req.body;
  db.query(
    'UPDATE cliente SET cli_cnpj = ?, cli_razaosocial = ? WHERE cli_id = ?',
    [cli_cnpj, cli_razaosocial, id],
    err => {
      if (err) return res.status(400).json({ error: err.message });
      res.json({ message: 'Cliente atualizado com sucesso' });
    }
  );
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM cliente WHERE cli_id = ?', [id], err => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ message: 'Cliente removido com sucesso' });
  });
});

export default router;
