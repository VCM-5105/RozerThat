// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./db');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // for JSON body
app.use(express.urlencoded({ extended: true })); // for HTML form submit

// Simple health check
app.get('/', (req, res) => {
  res.send('Rozer That backend is running');
});

/**
 * REGISTER USER
 * POST /api/register
 * Body: { username, email, password }
 */
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Hash password
    const hash = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (username, email, password_hash)
      VALUES (?, ?, ?)
    `;

    db.query(query, [username, email, hash], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        // Duplicate email / username handling
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Username or email already exists' });
        }
        return res.status(500).json({ error: 'Database error' });
      }

      return res.status(201).json({
        message: 'User registered successfully',
        userId: result.insertId,
      });
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal error' });
  }
});

/**
 * LOGIN USER
 * POST /api/login
 * Body: { email, password }
 */
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = `SELECT * FROM users WHERE email = ? LIMIT 1`;

  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // For now we will just send success; later you can add JWT / sessions
    return res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Rozer That backend listening on port ${PORT}`);
});
