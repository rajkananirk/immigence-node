const {
    check,
    validationResult
} = require("express-validator");
const { verifyToken } = require("../middleware/authJwt.js");

module.exports = function (app) {
        
    const programLevel = require("../controllers/programLevel.controller.js");

    // Program Level Routes 
    app.get("/program/program-levels",  programLevel.getAllProgramLevels);
    app.get("/program/program-levels/:id", programLevel.getProgramLevelById);
    app.post("/program/program-levels", verifyToken, programLevel.createProgramLevel);
    app.put("/program/program-levels/:id", verifyToken, programLevel.updateProgramLevel);
    app.delete("/program/program-levels/:id", verifyToken, programLevel.deleteProgramLevel);


    // Field of Study Routes
    app.get("/program/field-of-study", programLevel.getAllFieldOfStudy);
    app.get("/program/field-of-study/:id", programLevel.getFieldOfStudyById);
    app.post("/program/field-of-study", verifyToken, programLevel.createFieldOfStudy);
    app.put("/program/field-of-study/:id", verifyToken, programLevel.updateFieldOfStudy);
    app.delete("/program/field-of-study/:id", verifyToken, programLevel.deleteFieldOfStudy);

    // Destination Routes
    app.get("/program/destination", programLevel.getAllDestination);
    app.get("/program/destination/:id", programLevel.getDestinationById);
    app.post("/program/destination", verifyToken, programLevel.createDestination);
    app.put("/program/destination/:id", verifyToken, programLevel.updateDestination);
    app.delete("/program/destination/:id", verifyToken, programLevel.deleteDestination);

    // Institution Routes
    app.get("/program/institution-type", programLevel.getAllInstitution);
    app.get("/program/institution-type/:id", programLevel.getInstitutionById);
    app.post("/program/institution-type", verifyToken, programLevel.createInstitution);
    app.put("/program/institution-type/:id", verifyToken, programLevel.updateInstitution);
    app.delete("/program/institution-type/:id", verifyToken, programLevel.deleteInstitution);

    // Program Tag Routes
    app.get("/program/program-tags", programLevel.getAllProgramTag);
    app.get("/program/program-tags/:id", programLevel.getProgramTagById);
    app.post("/program/program-tags", verifyToken, programLevel.createProgramTag);
    app.put("/program/program-tags/:id", verifyToken, programLevel.updateProgramTag);
    app.delete("/program/program-tags/:id", verifyToken, programLevel.deleteProgramTag);

    // Programs Routes
    app.get("/program/programs",verifyToken, programLevel.getAllPrograms);
    app.get("/program/programs/:id",verifyToken, programLevel.getProgramById);
    app.post("/program/programs", verifyToken, programLevel.createProgram);
    app.put("/program/programs/:id", verifyToken, programLevel.updateProgram);
    app.delete("/program/programs/:id", verifyToken, programLevel.deleteProgram);   
};