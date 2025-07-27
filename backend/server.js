// server.js
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'todo_app',
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// User signup
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(sql, [name, email, hash], (err, result) => {
    if (err) return res.status(400).send('Signup failed');
    res.send('User registered');
  });
});

// User login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).send('User not found');
    const match = await bcrypt.compare(password, results[0].password);
    if (!match) return res.status(401).send('Invalid credentials');

    const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET || 'secretKey');
    res.json({ token });
  });
});

// Auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).send('No token');

  jwt.verify(token, process.env.JWT_SECRET || 'secretKey', (err, decoded) => {
    if (err) return res.status(403).send('Invalid token');
    req.userId = decoded.id;
    next();
  });
};

// Get all todos for user
app.get('/api/todo', auth, (req, res) => {
  db.query('SELECT * FROM todos WHERE user_id = ?', [req.userId], (err, results) => {
    if (err) return res.status(500).send('Failed to fetch todos');
    res.json(results);
  });
});

// Add new todo
app.post('/api/todo', auth, (req, res) => {
  const { task } = req.body;
  db.query('INSERT INTO todos (user_id, task, completed) VALUES (?, ?, ?)', [req.userId, task, false], err => {
    if (err) return res.status(500).send('Failed to add task');
    res.send('Task added');
  });
});

// Update todo
app.put('/api/todo/:id', auth, (req, res) => {
  const { task, completed } = req.body;
  db.query('UPDATE todos SET task = ?, completed = ? WHERE id = ? AND user_id = ?', [task, completed, req.params.id, req.userId], err => {
    if (err) return res.status(500).send('Failed to update task');
    res.send('Task updated');
  });
});

// Delete todo
app.delete('/api/todo/:id', auth, (req, res) => {
  db.query('DELETE FROM todos WHERE id = ? AND user_id = ?', [req.params.id, req.userId], err => {
    if (err) return res.status(500).send('Failed to delete task');
    res.send('Task deleted');
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
