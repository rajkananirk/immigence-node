require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
var cors = require('cors');
const { testConnection } = require('./app/config/db.js');
const connectDB = require('./app/config/db.js');
const app = express();
const g_variable = require("./app/config/global.config.js");
const multer = require('multer');
// const sendPush = require("./app/models/push.model.js");
const he = require("he");
const fs = require("fs");
var http = require("http");
const server = http.createServer(app);
const upload = multer({
    dest: "public/"
  });
  const news_image = multer({
    dest: "public/images/news"
  });    
//socket.io
var sio = require("socket.io");
const path = require("path");
io = sio(server);
app.set("socketio", io);

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/public', (req, res, next) => {
    console.log('Requesting file:', req.path);
    console.log('Full path:', path.join(__dirname, 'public', req.path));
    next();
});

app.use('/public', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET');
    next();
});

app.use(express.static(path.join(__dirname, "app/Files")));

// CORS configuration
const corsOptions = {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-access-token'],
    credentials: true,
    maxAge: 86400 // 24 hours
};

// Enable CORS for all routes
app.use(cors(corsOptions));

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
        message: "Welcome to Immigence Node Application."
    });
});

require("./app/routes/admin.routes.js")(app, upload, news_image);
require("./app/routes/user.routes.js")(app);

server.listen(process.env.PORT, () => {
    
    console.log(`Server is running on port ${process.env.PORT}`);
});
