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

// Get Frontend Noc Codes
exports.getFrontendNocCodes = (req, res) => {
    User.MdlGetFrontendNocCodes((err, data) => {
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

// Get Frontend Noc Codes By Id
exports.getFrontendNocCodesById = (req, res) => {
    User.MdlGetFrontendNocCodesById(req.params.noc_code, (err, data) => {
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


// Get Frontend Pnp Draw By Province
exports.getFrontendPnpDrawByProvince = (req, res) => {
    User.MdlGetFrontendPnpDrawByProvince(req.params.province, (err, data) => {
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

// Get Frontend Program Levels
exports.getFrontendProgramLevels = (req, res) => {
    User.MdlGetFrontendProgramLevels((err, data) => {
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

// Get Frontend Institution Types
exports.getFrontendInstitutionTypes = (req, res) => {
    User.MdlGetFrontendInstitutionTypes((err, data) => {
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

// Get Frontend Program Tags
exports.getFrontendProgramTags = (req, res) => {
    User.MdlGetFrontendProgramTags((err, data) => {
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

// Get Frontend Program Search
exports.getFrontendProgramSearch = async (req, res) => {
    try {
        const filters = req.query; // Get filters from query parameters
        
        console.log(filters);
        User.MdlGetFrontendProgramSearch(filters, (err, data) => {
            if (err) {
                res.status(500).json({
                    status: false,
                    message: "Error retrieving programs",
                    error: err
                });
                return;
            }
            res.json({
                status: true,
                data: data
            });
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Error retrieving programs",
            error: error.message
        });
    }
};  

// Get Frontend Program Search By Program Name
exports.getFrontendProgramSearchByProgramName = (req, res) => {
    User.MdlGetFrontendProgramSearchByProgramName(req.body, (err, data) => {
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





