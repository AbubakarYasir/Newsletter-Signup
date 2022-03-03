const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { options } = require("request");
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
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: secondName,
                },
            },
        ],
    };

    const jsonData = JSON.stringify(apiData);
    console.log(jsonData);

    const url = "https://us14.api.mailchimp.com/3.0/lists/857bdac0f";
    const options = {
        method: "POST",
        auth: "abubakar_yasir:8ee906b8be4893a00fbe9ffbd6b670f3-us14",
    };
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });
    request.write(jsonData);
    request.end();
});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(port, function () {
    console.log("Server is started at http://localhost:" + port);
});
