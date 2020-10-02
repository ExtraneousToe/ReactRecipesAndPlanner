const mysql2 = require("mysql2");

const con = mysql2.createConnection({
    host: "localhost",
    user: "binaricpox",
    password: "d3v_SQL_pwd",
    database: "testdb",
});

con.connect((err) => {
    if (err) throw err;

    console.log("Connected to DB.");

    let sqlQuery =
        "CREATE TABLE users (username VARCHAR(255), email VARCHAR(255))";
    con.query(sqlQuery, (e, r) => {
        if (e) throw e;
        console.log(`Table created from the query:\n\t${sqlQuery}`);
    });
});
