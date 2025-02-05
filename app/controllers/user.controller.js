const {
       check,
       validationResult
} = require("express-validator");
const sql = require("../config/db.js");
const UserModel = require("../models/user.model.js");


//COMMON_API

exports.search_immigration_programm = (req, res) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
           return res.status(422).json({
                  errors: errors.array()
           });
    }

  
    UserModel.MdlSearchImmigrationProgramm(req, (err, result) => {
       if (err) {
              res.send(err);
       } else {
              res.send({
                     message: "Searched data fetch successfully.",
                     status: true,
                     info: result
              });
       }
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

  

    UserModel.MdlGetLatestCrsData(req, (err, result) => {
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

function makeotp(length) {
       var result = "1234";
       var characters = "0123456789";
       var charactersLength = characters.length;
       for (var i = 0; i < length; i++) {
              // result += characters.charAt(Math.floor(Math.random() * charactersLength));
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