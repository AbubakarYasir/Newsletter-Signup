const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const port = 3000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {});

app.listen(port, function () {
    console.log("Server is started and Running at http://localhost:" + port);
});
