const bcrypt = require('bcrypt');
const {
    ProgramLevel,
    FieldOfStudy,
    Destination,
    Institution,
    ProgramTag,
    Programs
} = require('../schema/schema.model');
const ProgramLevelModel = {};


// Get All Program Levels
ProgramLevelModel.MdlGetAllProgramLevels = (result) => {
    ProgramLevel.find()
    .then(programLevels => {
        result(null, programLevels);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};

// Get Program Level by ID
ProgramLevelModel.MdlGetProgramLevelById = (id, result) => {
    ProgramLevel.findById(id)
    .then(programLevel => {
        result(null, programLevel); 
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};  



// Create Program Level
ProgramLevelModel.MdlCreateProgramLevel = (data, result) => {   
    const programLevel = new ProgramLevel(data);
    programLevel.save()
    .then(programLevel => {
        result(null, programLevel);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};  

// Update Program Level
ProgramLevelModel.MdlUpdateProgramLevel = (id, data, result) => {
    ProgramLevel.findByIdAndUpdate(id, data, { new: true }) 
    .then(programLevel => {
        result(null, programLevel);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};      

// Delete Program Level 
ProgramLevelModel.MdlDeleteProgramLevel = (id, result) => {
    ProgramLevel.findByIdAndDelete(id)
    .then(programLevel => {
        result(null, programLevel);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};

module.exports = {
    ProgramLevelModel,
};

// Get All Field of Study
ProgramLevelModel.MdlGetAllFieldOfStudy = (result) => {
    FieldOfStudy.find()
    .then(fieldOfStudy => {
        result(null, fieldOfStudy);
    })
    .catch(err => {     
        console.error("Database error:", err);
        result(err, null);
    });
};

// Get Field of Study by ID
ProgramLevelModel.MdlGetFieldOfStudyById = (id, result) => {
    FieldOfStudy.findById(id)
    .then(fieldOfStudy => {
        result(null, fieldOfStudy);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};

// Create Field of Study
ProgramLevelModel.MdlCreateFieldOfStudy = (data, result) => {
    const fieldOfStudy = new FieldOfStudy(data);
    fieldOfStudy.save()
    .then(fieldOfStudy => {
        result(null, fieldOfStudy);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};  

// Update Field of Study
ProgramLevelModel.MdlUpdateFieldOfStudy = (id, data, result) => {
    FieldOfStudy.findByIdAndUpdate(id, data, { new: true })
    .then(fieldOfStudy => { 
        result(null, fieldOfStudy);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};      

// Delete Field of Study
ProgramLevelModel.MdlDeleteFieldOfStudy = (id, result) => {
    FieldOfStudy.findByIdAndDelete(id)
    .then(fieldOfStudy => { 
        result(null, fieldOfStudy);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};  


// Get All Destination
ProgramLevelModel.MdlGetAllDestination = (result) => {
    Destination.find()
    .then(destination => {
        result(null, destination);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};

// Create Destination
ProgramLevelModel.MdlCreateDestination = (data, result) => {
    const destination = new Destination(data);
    destination.save()
    .then(destination => {
        result(null, destination);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};

// Update Destination
ProgramLevelModel.MdlUpdateDestination = (id, data, result) => {
    Destination.findByIdAndUpdate(id, data, { new: true })
    .then(destination => {
        result(null, destination);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};

// Delete Destination
ProgramLevelModel.MdlDeleteDestination = (id, result) => {
    Destination.findByIdAndDelete(id)
    .then(destination => {
        result(null, destination);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};

// Get Destination by ID
ProgramLevelModel.MdlGetDestinationById = (id, result) => {
    Destination.findById(id)
    .then(destination => {
        result(null, destination);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};  

// Get All Institution
ProgramLevelModel.MdlGetAllInstitution = (result) => {
    Institution.find()
    .then(institution => {
        result(null, institution);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};          

// Create Institution
ProgramLevelModel.MdlCreateInstitution = (data, result) => {
    const institution = new Institution(data);
    institution.save()
    .then(institution => {
        result(null, institution);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};

// Update Institution
ProgramLevelModel.MdlUpdateInstitution = (id, data, result) => {
    Institution.findByIdAndUpdate(id, data, { new: true })
    .then(institution => {
        result(null, institution);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};

// Delete Institution
ProgramLevelModel.MdlDeleteInstitution = (id, result) => {
    Institution.findByIdAndDelete(id)
    .then(institution => {
        result(null, institution);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};

// Get Institution by ID
ProgramLevelModel.MdlGetInstitutionById = (id, result) => {
    Institution.findById(id)
    .then(institution => {
        result(null, institution);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};  

// Get All Program Tag
ProgramLevelModel.MdlGetAllProgramTag = (result) => {
    ProgramTag.find()
    .then(programTag => {
        result(null, programTag);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};  

// Create Program Tag
ProgramLevelModel.MdlCreateProgramTag = (data, result) => {
    const programTag = new ProgramTag(data);
    programTag.save()
    .then(programTag => {
        result(null, programTag);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};  

// Update Program Tag
ProgramLevelModel.MdlUpdateProgramTag = (id, data, result) => {
    ProgramTag.findByIdAndUpdate(id, data, { new: true })
    .then(programTag => {
        result(null, programTag);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};  

// Delete Program Tag
ProgramLevelModel.MdlDeleteProgramTag = (id, result) => {       
    ProgramTag.findByIdAndDelete(id)
    .then(programTag => {
        result(null, programTag);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};  

// Get Program Tag by ID
ProgramLevelModel.MdlGetProgramTagById = (id, result) => {
    ProgramTag.findById(id)
    .then(programTag => {
        result(null, programTag);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};    

// Get All Programs
ProgramLevelModel.MdlGetAllPrograms = (result) => {
    Programs.find()
    .populate('program_level')
    .populate('program_tags')
    .populate('field_of_study')
    .then(programs => {
        result(null, programs);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};      

// Get Program by ID
ProgramLevelModel.MdlGetProgramById = (id, result) => {
    Programs.findById(id)
    .then(program => {
        result(null, program);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};      

// Create Program
ProgramLevelModel.MdlCreateProgram = (data, result) => {
    const program = new Programs(data);
    program.save()
    .then(program => {
        result(null, program);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};

// Update Program
ProgramLevelModel.MdlUpdateProgram = (id, data, result) => {
    Programs.findByIdAndUpdate(id, data, { new: true })
    .then(program => {
        result(null, program);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};

// Delete Program
ProgramLevelModel.MdlDeleteProgram = (id, result) => {
    Programs.findByIdAndDelete(id)
    .then(program => {
        result(null, program);
    })
    .catch(err => {
        console.error("Database error:", err);
        result(err, null);
    });
};

module.exports = {
    ProgramLevelModel,
};