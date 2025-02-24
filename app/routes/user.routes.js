const {
    check,
    validationResult
} = require("express-validator");
const { verifyToken } = require("../middleware/authJwt.js");

module.exports = function (app) {
    const users = require("../controllers/user.controller.js");

    // Frontend Latest Updates Data Route
    app.get("/get-frontend-latest-updates-data", users.getFrontendLatestUpdatesData);
    app.get("/get-frontend-latest-draw-data", users.getFrontendLatestDrawData);
};