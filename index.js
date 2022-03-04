const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const config = require("./api_keys");
require("dotenv").config();

const port = 3000;

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/signup.html");
});
app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const secondName = req.body.lName;
    const email = req.body.email;

    const apiData = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: secondName,
                },
            },
        ],
    };

    const jsonData = JSON.stringify(apiData);
    const secretData = config;
    const url = "https://us14.api.mailchimp.com/3.0/lists/" + config.mailchimp_audience;

    const options = {
        method: "POST",
        auth: "abubakaryasir:" + config.mailchimp_key,
    };
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/public/success.html");
        } else {
            res.sendFile(__dirname + "/public/failure.html");
        }
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || port, function () {
    console.log("Server is started at http://localhost:" + port);
});
