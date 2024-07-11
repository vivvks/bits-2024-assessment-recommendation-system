// server.js

const express = require("express");
const { Pool } = require('pg');
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3001"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Assessment Recommender application." });
});

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'asmt',
  password: 'test',
  port: 5432,
});

// handling CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Route to fetch data from the questionnaire table
app.get("/questionnaire", (req, res) => {
  const searchQuery = req.query.search || ""; // Get the search query from the request

  const sqlQuery = `
    SELECT DISTINCT question,id,category
    FROM asmt.ques_dtl
    WHERE category ILIKE $1
    LIMIT 10;
  `;

  // const sqlQuery = `
  //   SELECT *
  //   FROM asmt.ques_dtl
  //   WHERE category ILIKE $1
  //   LIMIT 10
  // `; // Adjust the WHERE clause based on the column you want to search

  pool.query(sqlQuery, [`%${searchQuery}%`], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result.rows);
    }
  });
});

// Route to fetch data from the questionnaire table
app.get("/question", (req, res) => {
  pool.query("SELECT * FROM asmt.ques_dtl", (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result.rows);
    }
  });
});


app.get("/recommendedQuestions", (req, res) => {
  let searchQuery = req.query.ids || ""; // Get the search query from the request

  // Split the comma-separated IDs into an array
  const idsArray = searchQuery.split(',').map(id => id.trim());

  // Construct the SQL query with dynamic IDs
  const sqlQuery = `
    SELECT id, question, category
    FROM asmt.ques_dtl
    WHERE id IN (${idsArray.map((_, index) => `$${index + 1}`).join(', ')})
  `;

  // Example SQL query when using PostgreSQL and node-postgres (pg) library
  // Adjust based on your database driver and setup

  pool.query(sqlQuery, idsArray, (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(result.rows);
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
