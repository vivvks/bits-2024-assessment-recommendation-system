// server.js

const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({
  user: 'your_pg_username',
  host: 'your_pg_host',
  database: 'your_pg_database',
  password: 'your_pg_password',
  port: 5432,
});

// Route to fetch data from the questionnaire table
app.get('/questionnaire', (req, res) => {
  pool.query('SELECT * FROM questionnaire', (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result.rows);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
