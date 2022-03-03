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
    const firstName = req.body.fName;
    const secondName = req.body.lName;
    const email = req.body.email;

    const apiData = {
        members: [
            {
                email_address: email,
                staturs: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: secondName,
                },
            },
        ],
    };

    const jsonData = JSON.stringify(apiData);
    console.log(jsonData);
    const url = "https://us14.api.mailchimp.com/3.0/lists/857bdac0fc";
});
app.listen(port, function () {
    console.log("Server is started at http://localhost:" + port);
});
