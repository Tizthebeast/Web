require('dotenv').config()
const express = require('express');
const app = express();
const mysql2 = require("mysql2");
const port = 3000;

const con = mysql2.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: 3306 
});


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('.')); // serves your HTML

app.post('/SignUp', (req, res) => {
  const { username, password } = req.body;

  const sql = "INSERT INTO info (Username, Password) VALUES (?, ?)";
  con.query(sql, [username, password], (err, result) => {
    if (err) throw err;
    console.log("Inserted ID:", result.insertId);
  });

  res.send("Received");
});


app.listen(port, () => console.log("Server running"));
