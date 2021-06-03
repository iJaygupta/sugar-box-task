var express = require("express");
const app = express();
require("dotenv").config();
var apiRouter = require("./routes/api");
var cors = require("cors");
const { connectWithRetry } = require("./lib/dbConfig");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//To allow cross-origin requests
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send({
        "error": false,
        "code": 200,
        "msg": "Welcome to User Service !!",
    });
});

//Route Prefixes
app.use("/api/v1/", apiRouter);

// throw 404 if URL not found
app.all("*", function (req, res) {
    res.status(404).send({
        "error": false,
        "code": 404,
        "msg": "API Not Found !!",
    })
});

connectWithRetry()

module.exports = app;
