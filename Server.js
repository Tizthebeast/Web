require('dotenv').config()
let mysql = require('mysql2');

let connector = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

connector.connect(function(err){
    if(err) throw err;
    console.log("Connected!")
});

function SignUP(){
    let Username = document.getElementById("Username");
    let Password = document.getElementById("Password");
    connector.query(
        "SELECT * FROM authentication.info",(err,results) => {
            if(err) throw err;
            console.log(results);
        }); 
    connector.query(
        "INSERT INTO info (Username,Password) values(?,?)",[]
    )
    