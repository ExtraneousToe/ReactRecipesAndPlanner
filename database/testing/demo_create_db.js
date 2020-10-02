const mysql2 = require("mysql2");

const connection = mysql2.createConnection({
    host: "localhost",
    user: "binaricpox",
    password: "d3v_SQL_pwd",
});

connection.connect((err) => {
    if (err) throw err;

    console.log("Connected to DB.");
    connection.query("CREATE DATABASE testdb", (err, result) => {
        console.log("database created");
    });
});
