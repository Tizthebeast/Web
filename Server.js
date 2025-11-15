const express = require('express');
const mysql = require('mysql2');
const app = express();

app.use(express.static('public'));        // your HTML/CSS/JS folder
app.use(express.urlencoded({extended:true}));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'your_database_name'
});

app.post('/save', (req, res) => {
  const { username, password, email } = req.body;

  // ← put your validation here (same as Python version)

  const sql = "INSERT INTO users (username,password,email) VALUES (?, ?, ?)";
  db.execute(sql, [username, password, email], (err) => {
    if (err) return res.send("Error: duplicate or bad data");
    res.send("<h3 style='color:green'>Saved to MySQL!</h3><br><a href='/'>Back</a>");
  });
});

app.listen(3000, () => console.log("Open http://localhost:3000"));