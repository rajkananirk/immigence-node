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
    app.get("/get-frontend-noc-codes", users.getFrontendNocCodes);
    app.get("/get-frontend-noc-codes/:noc_code", users.getFrontendNocCodesById);
    app.get("/get-frontend-pnp-draw/:province", users.getFrontendPnpDrawByProvince);
    app.get("/get-frontend-program-levels", users.getFrontendProgramLevels);
    app.get("/get-frontend-program-tags", users.getFrontendProgramTags)

    app.get("/get-frontend-institution-types", users.getFrontendInstitutionTypes)
    // Frontend Program Search Route
    app.get("/get-frontend-program-search", users.getFrontendProgramSearch);

    app.post("/get-frontend-program-search-by-program-name", users.getFrontendProgramSearchByProgramName)



};