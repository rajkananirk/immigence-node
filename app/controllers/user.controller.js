const {
       check,
       validationResult
} = require("express-validator");
const sql = require("../config/db.js");
const { User } = require("../models/user.model.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//COMMON_API

// Get Frontend Latest Updates Data
exports.getFrontendLatestUpdatesData = (req, res) => {
    User.MdlGetFrontendLatestUpdatesData((err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving data."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Data retrieved successfully",
            info: data
        });
    });
};

// Get Frontend Latest Draw Data
exports.getFrontendLatestDrawData = (req, res) => {
    User.MdlGetFrontendLatestDrawData((err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving data."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Data retrieved successfully",
            info: data
        });
    });
};

