var express = require("express");
var path = require("path");
var bodyparser = require("body-parser");
var https = require('https');
var cors = require('cors');
var facebookAuth = require("./AuthFunctions/facebookAuth");

var app = express();
app.use(cors());
app.use(bodyparser.json({}));
app.set('port', (process.env.PORT || 3000));
app.set('APP_ID', "1235396263159488");
app.set('APP_SECRET', "1d3c5cf264c611d8fdbb4a1053881e14");

app.post("/verifyUserAccessToken", (req, res) => {

    var authObject = req.body.facebookAuthObject;
    var userToken = authObject.authResponse.accessToken;
    var userID = authObject.authResponse.userID;

    facebookAuth.getAccessToken(app.get("APP_ID"), app.get("APP_SECRET")).then(function (ACCESS_TOKEN) {
        facebookAuth.getUserObject(userID, userToken, ACCESS_TOKEN).then(function (userObject) {
            res.send(userObject);
        }, function (err) {
            res.send(err);
        });
    }, function (err) {
        res.send(err);
    });
});

var indexPath = path.resolve(__dirname, "public");
app.use(express.static(indexPath));

app.listen(3000, function () {
    console.log("Port Listen 3000");
});