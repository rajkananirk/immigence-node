const { ProgramLevelModel } = require("../models/programLevel.model.js");


// Get All Program Levels
exports.getAllProgramLevels = (req, res) => {
    ProgramLevelModel.MdlGetAllProgramLevels((err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving program levels."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Program levels retrieved successfully",
            info: data
        });
    });
};

// Get Program Level by ID
exports.getProgramLevelById = (req, res) => {
    ProgramLevelModel.MdlGetProgramLevelById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving program level."
            });
            return;
        }
        res.status(200).json({  
            status: true,
            message: "Program level retrieved successfully",
            info: data
        });
    });
};



// Create Program Level
exports.createProgramLevel = (req, res) => {
    ProgramLevelModel.MdlCreateProgramLevel(req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while creating the program level."
            });
            return;
        }
        res.status(201).json({
            status: true,
            message: "Program level created successfully",
            info: data
        });
    });
};

// Update Program Level
exports.updateProgramLevel = (req, res) => {
    ProgramLevelModel.MdlUpdateProgramLevel(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while updating the program level."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Program level updated successfully",
            info: data
        });
    });
};

// Delete Program Level
exports.deleteProgramLevel = (req, res) => {
    ProgramLevelModel.MdlDeleteProgramLevel(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while deleting the program level."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Program level deleted successfully",
            info: data
        });
    });
};


// Get All Field of Study
exports.getAllFieldOfStudy = (req, res) => {
    ProgramLevelModel.MdlGetAllFieldOfStudy((err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving field of study."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Field of study retrieved successfully",
            info: data
        });
    });
};

// Get Field of Study by ID
exports.getFieldOfStudyById = (req, res) => {
    ProgramLevelModel.MdlGetFieldOfStudyById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving field of study."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Field of study retrieved successfully",
            info: data
        });
    });
};


// Create Field of Study
exports.createFieldOfStudy = (req, res) => {
    ProgramLevelModel.MdlCreateFieldOfStudy(req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while creating the field of study."
            });
            return;
        }
        res.status(201).json({
            status: true,
            message: "Field of study created successfully",
            info: data
        });
    });
};

// Update Field of Study
exports.updateFieldOfStudy = (req, res) => {
    ProgramLevelModel.MdlUpdateFieldOfStudy(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while updating the field of study."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Field of study updated successfully",
            info: data
        });
    });
};

// Delete Field of Study
exports.deleteFieldOfStudy = (req, res) => {
    ProgramLevelModel.MdlDeleteFieldOfStudy(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while deleting the field of study."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Field of study deleted successfully",
            info: data
        });
    });
};


// Get All Destination
exports.getAllDestination = (req, res) => {
    ProgramLevelModel.MdlGetAllDestination((err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving destination."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Destination retrieved successfully",
            info: data
        });
    });
};


// Create Destination
exports.createDestination = (req, res) => {
    ProgramLevelModel.MdlCreateDestination(req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while creating the destination."
            });
            return;
        }
        res.status(201).json({
            status: true,
            message: "Destination created successfully",
            info: data
        });
    });
};

// Update Destination
exports.updateDestination = (req, res) => {
    ProgramLevelModel.MdlUpdateDestination(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while updating the destination."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Destination updated successfully",
            info: data
        });
    });
};

// Delete Destination
exports.deleteDestination = (req, res) => {
    ProgramLevelModel.MdlDeleteDestination(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while deleting the destination."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Destination deleted successfully",
            info: data
        });
    });
};


// Get Destination by ID
exports.getDestinationById = (req, res) => {
    ProgramLevelModel.MdlGetDestinationById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving the destination."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Destination retrieved successfully",
            info: data
        });
    });
};



// Get All Institution
exports.getAllInstitution = (req, res) => {
    ProgramLevelModel.MdlGetAllInstitution((err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving the institution."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Institution retrieved successfully",
            info: data
        });
    });
};

// Create Institution
exports.createInstitution = (req, res) => {
    ProgramLevelModel.MdlCreateInstitution(req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while creating the institution."
            });
            return;
        }
        res.status(201).json({
            status: true,
            message: "Institution created successfully",
            info: data
        });
    });
};

// Update Institution
exports.updateInstitution = (req, res) => {
    ProgramLevelModel.MdlUpdateInstitution(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while updating the institution."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Institution updated successfully",
            info: data
        });
    });
};

// Delete Institution
exports.deleteInstitution = (req, res) => {
    ProgramLevelModel.MdlDeleteInstitution(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while deleting the institution."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Institution deleted successfully",
            info: data
        });
    });
};

// Get Institution by ID
exports.getInstitutionById = (req, res) => {
    ProgramLevelModel.MdlGetInstitutionById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving the institution."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Institution retrieved successfully",
            info: data
        });
    });
};


// Get All Program Tag
exports.getAllProgramTag = (req, res) => {
    ProgramLevelModel.MdlGetAllProgramTag((err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving the program tag."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Program tag retrieved successfully",
            info: data
        });
    });
};

// Create Program Tag
exports.createProgramTag = (req, res) => {
    ProgramLevelModel.MdlCreateProgramTag(req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while creating the program tag."
            });
            return;
        }
        res.status(201).json({
            status: true,
            message: "Program tag created successfully",
            info: data
        });
    });
};

// Update Program Tag
exports.updateProgramTag = (req, res) => {
    ProgramLevelModel.MdlUpdateProgramTag(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while updating the program tag."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Program tag updated successfully",
            info: data
        });
    });
};

// Delete Program Tag
exports.deleteProgramTag = (req, res) => {


    ProgramLevelModel.MdlDeleteProgramTag(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while deleting the program tag."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Program tag deleted successfully",
            info: data
        });
    });
};

// Get Program Tag by ID
exports.getProgramTagById = (req, res) => {
    ProgramLevelModel.MdlGetProgramTagById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving the program tag."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Program tag retrieved successfully",
            info: data
        });
    });
};

// Get All Programs
exports.getAllPrograms = (req, res) => {
    ProgramLevelModel.MdlGetAllPrograms((err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving the programs."
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

// Get Program by ID
exports.getProgramById = (req, res) => {
    ProgramLevelModel.MdlGetProgramById(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while retrieving the program."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Program retrieved successfully",
            info: data
        });
    });
};

// Create Program
exports.createProgram = (req, res) => {
    ProgramLevelModel.MdlCreateProgram(req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while creating the program."
            });
            return;
        }
        res.status(201).json({
            status: true,
            message: "Program created successfully",
            info: data
        });
    });
};

// Update Program
exports.updateProgram = (req, res) => {
    ProgramLevelModel.MdlUpdateProgram(req.params.id, req.body, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while updating the program."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Program updated successfully",
            info: data
        });
    });
};

// Delete Program
exports.deleteProgram = (req, res) => {
    ProgramLevelModel.MdlDeleteProgram(req.params.id, (err, data) => {
        if (err) {
            res.status(500).json({
                status: false,
                message: err.message || "Some error occurred while deleting the program."
            });
            return;
        }
        res.status(200).json({
            status: true,
            message: "Program deleted successfully",
            info: data
        });
    });
};
