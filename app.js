const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
var cors = require('cors');

const app = express();
const g_variable = require("./app/config/global.config.js");
// const sendPush = require("./app/models/push.model.js");
const he = require("he");
const fs = require("fs");
// it's need for socket.ios
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

global.users = {};
//app.set('users', users);

const format = 'hh:mm:ss';

// var time = moment() gives you current time. no format required.
const time = moment('02:00:00', format);
const beforeTime = moment('01:00:00', format);
const afterTime = moment('03:00:00', format);
const sql = require("./app/config/db.js");

if (time.isBetween(beforeTime, afterTime)) {
    console.log('is between');
} else {
    console.log('is not between');
}

let bool1 = moment('2010-10-19 02:00:00').isBetween('2010-10-19 01:00:00', '2010-10-19 04:00:00'); // true

console.log(bool1);

let bool2 = moment('2010-10-20').isBetween
    ('2010-10-25', '2010-10-19'); // false

console.log(bool2);


io.on("connection", (socket) => {
    console.log("this is my socket id: " + socket.id);

});

require("./app/routes/user.routes.js")(app);

// set port, listen for requests
server.listen(g_variable.PORT, () => {
    console.log("Server is running on port " + g_variable.PORT);
});