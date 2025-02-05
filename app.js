const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
var cors = require('cors');

const app = express();
const g_variable = require("./app/config/global.config.js");
// const sendPush = require("./app/models/push.model.js");
const he = require("he");
const fs = require("fs");
var http = require("http");
const server = http.createServer(app);

//socket.io
var sio = require("socket.io");
const path = require("path");
io = sio(server);
app.set("socketio", io);

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use("/uploads", express.static("uploads"));

app.use(express.static(path.join(__dirname, "app/Files")));
// simple route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Inmigence application."
    });
});

require("./app/routes/user.routes.js")(app);

// set port, listen for requests
server.listen(g_variable.PORT, () => {
    console.log("Server is running on port " + g_variable.PORT);
});