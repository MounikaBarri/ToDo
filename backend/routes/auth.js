const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../config/db');

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) return res.status(500).json({ error: 'Database error (check email)' });

      if (results.length > 0) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Insert user
      db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, hashedPassword],
        (err, result) => {
          if (err) {
            return res.status(500).json({ error: 'Error inserting user' });
          }

          return res.status(201).json({ message: 'User registered successfully' });
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error (hashing)' });
  }
});

module.exports = router;
