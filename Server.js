require('dotenv').config();
const express = require('express');
const app = express();
const mysql2 = require("mysql2");
const bcrypt = require('bcrypt');
const port = process.env.PORT || 3000;
const BCRYPT_ROUNDS = Number(process.env.BCRYPT_ROUNDS) || 12;

const con = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT) || 3306
});

con.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL");
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public')); // serves HTML, CSS, etc.


// Sign Up Route - SECURE VERSION
app.post('/SignUp', async (req, res) => {
  let { username, password } = req.body;

  // Basic input validation
  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  if (password.length < 6) {
    return res.status(400).send("Password must be at least 6 characters");
  }

  try {
    // Check if username already exists
    const checkSql = "SELECT * FROM info WHERE Username = ?";
    con.query(checkSql, [username], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Server error");
      }

      if (results.length > 0) {
        return res.status(409).send("Username already taken");
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insert user
      const insertSql = "INSERT INTO info (Username, Password) VALUES (?, ?)";
      con.query(insertSql, [username, hashedPassword], (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Failed to create account");
        }

        console.log("User registered:", username, "ID:", result.insertId);
        res.send(`
          <h2>Account created successfully!</h2>
          <p>Welcome, ${username}!</p>
          <a href="index.html">Go to Dashboard</a>
        `);
      });
    });

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});