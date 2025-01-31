const {
    check,
    validationResult
} = require("express-validator");
// var authenticate = require("../Middleware/authenticate");

module.exports = function (app) {
    const users = require("../controllers/user.controller.js");

    app.get("/", (req, res) => {
           res.json({
                  message: "Welcome to Inmigence application."
           });
    });
    //COMMON_API
    app.get("/get_latest_crs_data", users.get_latest_crs_data);


    app.get("/search_immigration_programm",users.search_immigration_programm);
};