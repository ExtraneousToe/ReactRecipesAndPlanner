const express = require("express");
const path = require("path");
const { initDB: Database, closeDB: close } = require("./database/database");
const connectApis = require("./apicontrollers/apiMaster");
const bodyParser = require("body-parser");

const app = express();
app.set("port", process.env.PORT || 3001);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(bodyParser.json());

// allows handling of browser-side routing
// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });

async function connectDatabase() {
    var dbConn = await Database();
    /*
    hookup routing for api and authentication controllers here
    */
    connectApis(app, dbConn);
}

connectDatabase().then(() => {
    const server = app.listen(app.get("port"), () => {
        console.log(`Find the server at: http://localhost:${app.get("port")}/`);
    });

    // hookup sockets here

    process.on("SIGINT", () => {
        close();
        process.exit();
    });
});
