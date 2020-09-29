const express = require("express");
const path = require("path");

const app = express();
app.set("port", process.env.PORT || 3001);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

// allows handling of browser-side routing
// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client/build", "index.html"));
// });

const server = app.listen(app.get("port"), () => {
    console.log(`Find the server at: http://localhost:${app.get("port")}/`);
});
