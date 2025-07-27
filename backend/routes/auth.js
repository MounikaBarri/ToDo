const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, hashed], (err) => {
    if (err) return res.status(400).send('User already exists');
    res.send('Signup successful');
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) return res.status(400).send('Invalid email');
    const valid = await bcrypt.compare(password, results[0].password);
    if (!valid) return res.status(400).send('Wrong password');
    const token = jwt.sign({ id: results[0].id }, 'secretKey');
    res.json({ token, name: results[0].name });
  });
});

module.exports = router;
