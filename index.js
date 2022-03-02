const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const http = require("http");
const port = 3000;

const app = express();

app.use(express.static("static"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/static/signup.html");
});

app.post("/", function (req, res) {
    let firstName = req.body.fName;
    let secondName = req.body.lName;
    let email = req.body.email;
    console.log(firstName, secondName, email);
    res.sendFile(__dirname + "/static/success.html");
});

app.listen(port, function () {
    console.log("Server is started at http://localhost:" + port);
});
