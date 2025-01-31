const sql = require("../config/db.js");
const fs = require('fs');
const { log } = require("console");
const User = function (user) { };

var readHTMLFile = function (path, callback) {
       fs.readFile(path, {
              encoding: "utf-8"
       }, function (err, html) {
              if (err) {
                     throw err;
                     callback(err);
              } else {
                     callback(null, html);
              }
       });
};
//COMMON_API

User.MdlGetLatestCrsData = (req, result) => {
       sql.query(
              "Select * from latest_crs_draws",
              function (err, res) {
                     if (err) {
                            console.log("error: ", err);
                            result(err, null);
                     } else {
                            result(null, res[0]);
                     }
              }
       );
};

User.MdlSearchImmigrationProgramm = async (req, result) => {
       sql.query("SELECT * FROM `noc_list` WHERE `class_title` LIKE '%"+ req.query.keyword+"%'", function (
              err,
              res
       ) {
              if (err) {
                     console.log("error: ", err);
                     result(err, null);
              } else {
                     console.log(res);
                     
                     result(null, res);
              }
       });
};

function makeotp(length) {
       var result = "";
       var characters = "0123456789";
       var charactersLength = characters.length;
       for (var i = 0; i < length; i++) {
              result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return 1234;
}

module.exports = User;