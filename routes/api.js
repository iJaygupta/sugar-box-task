var express = require("express");
var userRouter = require("./user");

var app = express();

app.use("/user/", userRouter);

module.exports = app;