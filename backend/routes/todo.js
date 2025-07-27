const express = require('express');
const db = require('../db');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', auth, (req, res) => {
  const sql = 'SELECT * FROM todos WHERE user_id = ?';
  db.query(sql, [req.user.id], (err, results) => {
    res.json(results);
  });
});

router.post('/', auth, (req, res) => {
  const { task } = req.body;
  const sql = 'INSERT INTO todos (user_id, task) VALUES (?, ?)';
  db.query(sql, [req.user.id, task], (err) => {
    if (err) return res.status(500).send('Error');
    res.send('Task added');
  });
});

router.put('/:id', auth, (req, res) => {
  const { task, completed } = req.body;
  const sql = 'UPDATE todos SET task = ?, completed = ? WHERE id = ? AND user_id = ?';
  db.query(sql, [task, completed, req.params.id, req.user.id], (err) => {
    res.send('Task updated');
  });
});

router.delete('/:id', auth, (req, res) => {
  const sql = 'DELETE FROM todos WHERE id = ? AND user_id = ?';
  db.query(sql, [req.params.id, req.user.id], (err) => {
    res.send('Task deleted');
  });
});

module.exports = router;
