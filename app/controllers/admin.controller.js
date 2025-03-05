const {
    check,
    validationResult
} = require("express-validator");
const sql = require("../config/db.js");
const { AdminModel } = require("../models/admin.model.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');


//COMMON_API

exports.search_immigration_programm = (req, res) => {
    AdminModel.MdlSearchImmigrationProgramm(req, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while searching programs."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Programs retrieved successfully",
            info: data
        });
    });
};

exports.get_noc_program = (req, res) => {
    AdminModel.MdlNocProgram(req, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving NOC programs."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "NOC programs retrieved successfully",
            info: data
        });
    });
};

exports.get_pnp_list = (req, res) => {
    AdminModel.MdlPnpList(req, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving PNP list."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "PNP list retrieved successfully",
            info: data
        });
    });
};

exports.get_latest_crs_data = (req, res) => {
    // Validate request
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //            return res.status(422).json({
    //                   errors: errors.array()
    //            });
    //     } 



    AdminModel.MdlGetLatestCrsData(req, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send({
                message: "Crs data listed successfully.",
                status: true,
                info: result
            });
        }
    });
};

function makeid(length) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function makeProfilePhotoString(length) {
    var result = "";
    var characters = "012345ASDFGHJKWERTYUIredrfghjkeryty6789";
    var charactersLength = length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

exports.adminLogin = (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password are required"
            });
        }

        AdminModel.MdlAdminLogin(email, password, (err, data) => {
            if (err) {
                return res.status(500).json({
                    status: false,
                    message: err.message || "Some error occurred during login."
                });
            }

            if (!data) {
                return res.status(401).json({
                    status: false,
                    message: "Invalid email or password"
                });
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: data._id },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            );

            res.status(200).json({
                status: true,
                message: "Login successful",
                info: { ...data, token }
            });
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            status: false,
            message: error.message || "An error occurred during login"
        });
    }
};

exports.adminRegister = (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            errors: errors.array()
        });
    }


    AdminModel.MdlCreateAdmin(req, (err, admin) => {
        if (err) {
            res.status(500).send({
                status: false,
                message: err.message || "Some error occurred during register."
            });
            return;
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email,
                role: 'admin'
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Remove password from admin object
        delete admin.password;

        res.send({
            message: "Registration successful",
            status: true,
            info: admin,
            token: token
        });
    });
};

exports.createAdmin = (req, res) => {
    AdminModel.MdlCreateAdmin(req.body, (err, data) => {
        if (err) {
            if (err.kind === "email_exists") {
                return res.status(400).json({
                    status: false,
                    message: err.message
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while creating admin."
            });
        }
        res.status(201).json({
            status: true,
            message: "Admin created successfully",
            info: data
        });
    });
};

exports.createExpressEntryDraw = (req, res) => {
    AdminModel.MdlCreateExpressEntryDraw(req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while creating express entry draw."
            });
            return;
        }
        res.status(201).json({
            status: true,
            message: "Express Entry draw created successfully",
            info: data
        });
    });
};

exports.getAllExpressEntryDraws = (req, res) => {
    AdminModel.MdlGetAllExpressEntryDraws((err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving express entry draws."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Express Entry draws retrieved successfully",
            info: data
        });
    });
};

exports.getExpressEntryDrawById = (req, res) => {
    AdminModel.MdlGetExpressEntryDrawById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: `Express Entry draw not found with id ${req.params.id}`
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error retrieving express entry draw"
            });
        }
        res.status(200).json({
            status: true,
            message: "Express Entry draw retrieved successfully",
            info: data
        });
    });
};

exports.editExpressEntryDraw = (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            status: false,
            message: "Express Entry draw ID is required"
        });
    }

    AdminModel.MdlEditExpressEntryDraw(req.params.id, req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: `Express Entry draw not found with id ${req.params.id}`
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error updating express entry draw"
            });
        }
        res.status(200).json({
            status: true,
            message: "Express Entry draw updated successfully",
            info: data
        });
    });
};

exports.deleteExpressEntryDraw = (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            status: false,
            message: "Express Entry draw ID is required"
        });
    }

    AdminModel.MdlDeleteExpressEntryDraw(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: `Express Entry draw not found with id ${req.params.id}`
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error deleting express entry draw"
            });
        }
        res.status(200).json({
            status: true,
            message: "Express Entry draw deleted successfully",
            info: data
        });
    });
};

// Update the setDefaultDraw controller
exports.setDefaultDraw = (req, res) => {
    // Validate request
    if (!req.params.id) {
        return res.status(400).json({
            status: false,
            message: "Express Entry draw ID is required"
        });
    }

    AdminModel.MdlSetDefaultDraw(req.params.id, (err, data) => {
        // Add a flag to prevent multiple responses
        let responseHasBeenSent = false;

        if (err) {
            if (responseHasBeenSent) return;
            responseHasBeenSent = true;

            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: err.message || `Express Entry draw not found with id ${req.params.id}`
                });
            }
            if (err.kind === "already_default") {
                return res.status(400).json({
                    status: false,
                    message: err.message
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error setting default draw"
            });
        }

        if (responseHasBeenSent) return;
        responseHasBeenSent = true;

        res.status(200).json({
            status: true,
            message: "Express Entry draw set as default successfully",
            info: data
        });
    });
};

// Get All PNP Draws
exports.getAllPNPDraws = (req, res) => {
    AdminModel.MdlGetAllPNPDraws((err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving PNP draws."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "PNP draws retrieved successfully",
            info: data
        });
    });
};

// Get PNP Draw by ID
exports.getPNPDrawById = (req, res) => {
    AdminModel.MdlGetPNPDrawById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: `PNP draw not found with id ${req.params.id}`
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error retrieving PNP draw"
            });
        }
        res.status(200).json({
            status: true,
            message: "PNP draw retrieved successfully",
            info: data
        });
    });
};

// Edit PNP Draw
exports.editPNPDraw = (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            status: false,
            message: "PNP draw ID is required"
        });
    }

    AdminModel.MdlEditPNPDraw(req.params.id, req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: `PNP draw not found with id ${req.params.id}`
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error updating PNP draw"
            });
        }
        res.status(200).json({
            status: true,
            message: "PNP draw updated successfully",
            info: data
        });
    });
};

// Delete PNP Draw
exports.deletePNPDraw = (req, res) => {
    AdminModel.MdlDeletePNPDraw(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: `PNP draw not found with id ${req.params.id}`
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error deleting PNP draw"
            });
        }
        res.status(200).json({
            status: true,
            message: "PNP draw deleted successfully",
            info: data
        });
    });
};

// Set Default PNP Draw
exports.setDefaultPNPDraw = (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            status: false,
            message: "PNP draw ID is required"
        });
    }

    AdminModel.MdlSetDefaultPNPDraw(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: err.message || `PNP draw not found with id ${req.params.id}`
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error setting default PNP draw"
            });
        }
        res.status(200).json({
            status: true,
            message: "PNP draw set as default successfully",
            info: data
        });
    });
};

// Add this new controller function
exports.createPNPDraw = (req, res) => {
    // Validate request
    if (!req.body.score || !req.body.title || !req.body.draw_date || !req.body.types ||
        !req.body.province || !req.body.streams || !req.body.nois_issued) {
        return res.status(400).json({
            status: false,
            message: "All fields are required (title, draw_date, types, province, streams, nois_issued)"
        });
    }

    // Create PNP Draw object
    const pnpDraw = {
        title: req.body.title,
        draw_date: new Date(req.body.draw_date),
        types: req.body.types,
        province: req.body.province,
        streams: req.body.streams,
        score: req.body.score,
        nois_issued: req.body.nois_issued,
        is_default: req.body.is_default || false
    };

    AdminModel.MdlCreatePNPDraw(pnpDraw, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while creating the PNP draw."
            });
            return;
        }
        res.status(201).json({
            status: true,
            message: "PNP draw created successfully",
            info: data
        });
    });
};

// Get All IRCC Updates
exports.getAllIrccUpdates = (req, res) => {
    AdminModel.MdlGetAllIrccUpdates((err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving IRCC updates."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "IRCC updates retrieved successfully",
            info: data
        });
    });
};

// Get IRCC Update by ID
exports.getIrccUpdateById = (req, res) => {
    AdminModel.MdlGetIrccUpdateById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: `IRCC update not found with id ${req.params.id}`
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error retrieving IRCC update"
            });
        }
        res.status(200).json({
            status: true,
            message: "IRCC update retrieved successfully",
            info: data
        });
    });
};

// Edit IRCC Update
exports.editIrccUpdate = (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            status: false,
            message: "IRCC update ID is required"
        });
    }

    AdminModel.MdlEditIrccUpdate(req.params.id, req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: `IRCC update not found with id ${req.params.id}`
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error updating IRCC update"
            });
        }
        res.status(200).json({
            status: true,
            message: "IRCC update modified successfully",
            info: data
        });
    });
};

// Delete IRCC Update
exports.deleteIrccUpdate = (req, res) => {
    AdminModel.MdlDeleteIrccUpdate(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: `IRCC update not found with id ${req.params.id}`
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error deleting IRCC update"
            });
        }
        res.status(200).json({
            status: true,
            message: "IRCC update deleted successfully",
            info: data
        });
    });
};

// Set Default IRCC Update
exports.setDefaultIrccUpdate = (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            status: false,
            message: "IRCC update ID is required"
        });
    }

    AdminModel.MdlSetDefaultIrccUpdate(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: err.message || `IRCC update not found with id ${req.params.id}`
                });
            }
            if (err.kind === "already_default") {
                return res.status(400).json({
                    status: false,
                    message: err.message
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error setting default IRCC update"
            });
        }
        res.status(200).json({
            status: true,
            message: "IRCC update set as default successfully",
            info: data
        });
    });
};

// Create IRCC Update
exports.createIrccUpdate = (req, res) => {
    if (!req.body.title || !req.body.types || !req.body.description) {
        return res.status(400).json({
            status: false,
            message: "All fields are required (title, types, description)"
        });
    }

    const irccUpdate = {
        title: req.body.title,
        types: req.body.types,
        description: req.body.description,
        is_default: req.body.is_default || false
    };

    AdminModel.MdlCreateIrccUpdate(irccUpdate, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while creating the IRCC update."
            });
            return;
        }
        res.status(201).json({
            status: true,
            message: "IRCC update created successfully",
            info: data
        });
    });
};

// Get All News and Insights
exports.getNewsAndInsights = (req, res) => {
    AdminModel.MdlGetNewsAndInsights((err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving news and insights."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "News and insights retrieved successfully",
            info: data
        });
    });
};

// Get News and Insights by ID
exports.getNewsAndInsightsById = (req, res) => {
    AdminModel.MdlGetNewsAndInsightsById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: `News and insights not found with id ${req.params.id}`
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error retrieving news and insights"
            });
        }
        res.status(200).json({
            status: true,
            message: "News and insights retrieved successfully",
            info: data
        });
    });
};

// Edit News and Insights
exports.editNewsAndInsights = (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({
            status: false,
            message: "News and insights ID is required"
        });
    }

    AdminModel.MdlEditNewsAndInsights(req.params.id, req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: `News and insights not found with id ${req.params.id}`
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error updating news and insights"
            });
        }
        res.status(200).json({
            status: true,
            message: "News and insights updated successfully",
            info: data
        });
    });
};

// Delete News and Insights
exports.deleteNewsAndInsights = (req, res) => {
    AdminModel.MdlDeleteNewsAndInsights(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: `News and insights not found with id ${req.params.id}`
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error deleting news and insights"
            });
        }
        res.status(200).json({
            status: true,
            message: "News and insights deleted successfully",
            info: data
        });
    });
};

// Create News and Insights
exports.createNewsAndInsights = (req, res) => {
    if (!req.body.title || !req.body.types || !req.body.description) {
        return res.status(400).json({
            status: false,
            message: "All fields are required (title, types, description)"
        });
    }

    const newsData = {
        title: req.body.title,
        types: req.body.types,
        description: req.body.description
    };

    AdminModel.MdlCreateNewsAndInsights(newsData, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while creating news and insights."
            });
            return;
        }
        res.status(201).json({
            status: true,
            message: "News and insights created successfully",
            info: data
        });
    });
};

// Get All News
exports.getNews = (req, res) => {
    AdminModel.MdlGetNews((err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving news."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "News retrieved successfully",
            info: data
        });
    });
};

// Get News by ID
exports.getNewsById = (req, res) => {
    AdminModel.MdlGetNewsById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: `News not found with id ${req.params.id}`
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error retrieving news"
            });
        }
        res.status(200).json({
            status: true,
            message: "News retrieved successfully",
            info: data
        });
    });
};

// Edit News
exports.editNews = (req, res) => {
    AdminModel.MdlEditNews(req.params.id, req.body, req, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: `News not found with id ${req.params.id}`
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error updating news"
            });
        }
        res.status(200).json({
            status: true,
            message: "News updated successfully",
            info: data
        });
    });
};

// Delete News
exports.deleteNews = (req, res) => {
    AdminModel.MdlDeleteNews(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: `News not found with id ${req.params.id}`
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error deleting news"
            });
        }
        res.status(200).json({
            status: true,
            message: "News deleted successfully",
            info: data
        });
    });
};

// Add News
exports.addNews = (req, res) => {
    if (!req.files.image) {
        return res.status(400).json({
            status: false,
            message: "Image is required"
        });
    }

    const newsData = {
        title: req.body.title,
        description: req.body.description
    };

    AdminModel.MdlAddNews(newsData, req, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while creating news."
            });
            return;
        }
        res.status(201).json({
            status: true,
            message: "News created successfully",
            info: data
        });
    });
};

// Get All Noc Codes
exports.getAllNocCodes = (req, res) => {
    AdminModel.MdlGetAllNocCodes((err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving Noc Codes."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Noc Codes retrieved successfully",
            info: data
        });
    });
};

// Get Noc Codes by ID
exports.getNocCodesById = (req, res) => {
    AdminModel.MdlGetNocCodesById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") { 
                return res.status(404).json({
                    status: false,
                    message: `Noc Codes not found with id ${req.params.id}`
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error retrieving Noc Codes"
            });
        }
        res.status(200).json({
            status: true,
            message: "Noc Codes retrieved successfully",
            info: data
        });
    });
};

// Create Noc Codes
exports.createNocCodes = (req, res) => {
    if (!req.body.noc_code  || !req.body.class_title) {
        return res.status(400).json({
            status: false,
            message: "All fields are required (noc_code, class_title)"
        });
    }

    const nocCodesData = {
        noc_code: req.body.noc_code,
        class_title: req.body.class_title,
        programs: req.body.programs,
        example_titles: req.body.example_titles,
        main_duties: req.body.main_duties,
        employment_requirements: req.body.employment_requirements,
        provinces: req.body.provinces
    };

    AdminModel.MdlCreateNocCodes(nocCodesData, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while creating Noc Codes."
            });
            return;
        }

        res.status(201).json({
            status: true,
            message: "Noc Codes created successfully",
            info: data
        });
    });
};      

// Edit Noc Codes
exports.editNocCodes = (req, res) => {
    if (!req.params.id) {
        return res.status(400).json({   
            status: false,
            message: "Noc Codes ID is required"
        });
    }
console.log(req.body.teer_category);

    const nocCodesData = {
        noc_code: req.body.noc_code,
        class_title: req.body.class_title,
        teer_category: req.body.teer_category,
        programs: req.body.programs,
        example_titles: req.body.example_titles,
        main_duties: req.body.main_duties,
        employment_requirements: req.body.employment_requirements,
        provinces: req.body.provinces
    };

    AdminModel.MdlEditNocCodes(req.params.id, nocCodesData, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: `Noc Codes not found with id ${req.params.id}`
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error updating Noc Codes"
            });
        }
        res.status(200).json({
            status: true,
            message: "Noc Codes updated successfully",
            info: data
        });
    });
};

// Delete Noc Codes
exports.deleteNocCodes = (req, res) => {
    AdminModel.MdlDeleteNocCodes(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).json({
                    status: false,
                    message: `Noc Codes not found with id ${req.params.id}`
                });
            }
            return res.status(500).json({
                status: false,
                message: err.message || "Error deleting Noc Codes"
            });
        }
        res.status(200).json({
            status: true,
            message: "Noc Codes deleted successfully",
            info: data
        });
    });
};

// Get Dashboard Counts
exports.getDashboardCounts = (req, res) => {
    AdminModel.MdlGetDashboardCounts((err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving dashboard counts."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Dashboard counts retrieved successfully",
            info: data
        });
    });
};




    