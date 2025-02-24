const {
    check,
    validationResult
} = require("express-validator");
const { verifyToken } = require("../middleware/authJwt.js");

module.exports = function (app, upload, news_image) {
    const admin = require("../controllers/admin.controller.js");

    app.get("/", (req, res) => {
        res.json({
            message: "Welcome to Inmigence application."
        });
    });

    // Admin Login Route
    app.post("/admin/login", [
        check("email").isEmail().withMessage("Please enter a valid email"),
        check("password").notEmpty().withMessage("Password is required")
    ], admin.adminLogin);

    // Admin registration route with validation
    app.post("/admin/register", [
        check("name").notEmpty().withMessage("Name is required"),
        check("email")
            .isEmail().withMessage("Please enter a valid email")
            .normalizeEmail(),
        check("password")
            .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
            .matches(/\d/).withMessage("Password must contain a number")
    ], admin.createAdmin);

    // Create Updates Route with JWT verification - Fixed syntax
    app.post(
        "/admin/express-entry-draw",
        [   // Validation middleware array
            verifyToken,
            check("title").notEmpty().withMessage("Title is required"),
            check("types").notEmpty().withMessage("Type is required"),
            check("draw_date").notEmpty().withMessage("Draw date is required"),
            check("draw_number").notEmpty().withMessage("Draw number is required"),
            check("crs_cut_off").isNumeric().withMessage("CRS cut off must be a number"),
            check("itas_issued").isNumeric().withMessage("ITAS issued must be a number")
        ],
        admin.createExpressEntryDraw  // Controller function
    );

    // Get all updates
    app.get("/admin/express-entry-draws", verifyToken, admin.getAllExpressEntryDraws);

    // Get single update by ID (optional)
    app.get("/admin/express-entry-draw/:id", verifyToken, admin.getExpressEntryDrawById);

    // Edit Update Date Route
    app.put("/admin/express-entry-draw/:id", verifyToken, admin.editExpressEntryDraw);

    // Add this new route
    app.delete("/admin/express-entry-draw/:id", verifyToken, admin.deleteExpressEntryDraw);

    // Add new route to set default
    app.put("/admin/express-entry-draw/set-default/:id", [
        verifyToken
    ], admin.setDefaultDraw);

    // PNP Draw Routes
    app.get("/admin/pnp-draws", verifyToken, admin.getAllPNPDraws);
    app.get("/admin/pnp-draw/:id", verifyToken, admin.getPNPDrawById);
    app.put("/admin/pnp-draw/:id", verifyToken, admin.editPNPDraw);
    app.delete("/admin/pnp-draw/:id", verifyToken, admin.deletePNPDraw);
    app.put("/admin/pnp-draw/set-default/:id", verifyToken, admin.setDefaultPNPDraw);

    // Add this new route with your existing PNP routes
    app.post("/admin/pnp-draw", [
        verifyToken,
        check('title').notEmpty().withMessage("Title is required"),
        check('draw_date').notEmpty().isISO8601().withMessage("Valid draw date is required"),
        check('types').notEmpty().withMessage("Types is required"),
        check('province').notEmpty().withMessage("Province is required"),
        check('streams').notEmpty().withMessage("Streams is required"),
        check('nois_issued').notEmpty().withMessage("NOIs issued is required"),
        check('score').notEmpty().withMessage("Score is required"),
        check('is_default').optional().isBoolean().withMessage("Is default must be boolean")
    ], admin.createPNPDraw);

    // IRCC Update Routes
    app.get("/admin/ircc-updates", verifyToken, admin.getAllIrccUpdates);
    app.get("/admin/ircc-update/:id", verifyToken, admin.getIrccUpdateById);
    app.post("/admin/ircc-update", [
        verifyToken,
        check('title').notEmpty().withMessage("Title is required"),
        check('types').notEmpty().withMessage("Types is required"),
        check('description').notEmpty().withMessage("Description is required"),
        check('is_default').optional().isBoolean().withMessage("Is default must be boolean")
    ], admin.createIrccUpdate);
    app.put("/admin/ircc-update/:id", [
        verifyToken,
        check('title').optional().notEmpty().withMessage("Title cannot be empty"),
        check('types').optional().notEmpty().withMessage("Types cannot be empty"),
        check('description').optional().notEmpty().withMessage("Description cannot be empty")
    ], admin.editIrccUpdate);
    app.delete("/admin/ircc-update/:id", verifyToken, admin.deleteIrccUpdate);
    app.put("/admin/ircc-update/set-default/:id", verifyToken, admin.setDefaultIrccUpdate);

    // News and Insights Routes
    app.get("/admin/news-insights", verifyToken, admin.getNewsAndInsights);
    app.get("/admin/news-insights/:id", verifyToken, admin.getNewsAndInsightsById);
    app.post("/admin/news-insights", [
        verifyToken,
        check('title').notEmpty().withMessage("Title is required"),
        check('types').notEmpty().withMessage("Types is required"),
        check('description').notEmpty().withMessage("Description is required")
    ], admin.createNewsAndInsights);
    app.put("/admin/news-insights/:id", verifyToken, admin.editNewsAndInsights);
    app.delete("/admin/news-insights/:id", verifyToken, admin.deleteNewsAndInsights);

    // News Routes
    app.get("/admin/news", verifyToken, admin.getNews);
    app.get("/admin/news/:id", verifyToken, admin.getNewsById);

    var NewsUploadFields = news_image.fields([{
        name: "image",
        maxCount: 1
    },
    ]);
    app.post("/admin/news", [
        verifyToken,
        check('title').notEmpty().withMessage("Title is required"),
        check('description').notEmpty().withMessage("Description is required")
    ], NewsUploadFields, admin.addNews);

    var NewsEditUploadFields = news_image.fields([{
        name: "image",
        maxCount: 1
    },
    ]);
    app.put("/admin/news/:id", [
        verifyToken,
        check('title').optional().notEmpty().withMessage("Title cannot be empty"),
        check('description').optional().notEmpty().withMessage("Description cannot be empty")
    ], NewsEditUploadFields, admin.editNews);

  
  
    app.delete("/admin/news/:id", verifyToken, admin.deleteNews);


    // Noc Codes Routes
    app.get("/admin/noc-codes", verifyToken, admin.getAllNocCodes);
    app.get("/admin/noc-codes/:id",verifyToken, admin.getNocCodesById);
    app.post("/admin/noc-codes", [
        verifyToken,
        check('noc_code').notEmpty().withMessage("NOC code is required"),
        check('class_title').notEmpty().withMessage("Title is required"),
        check('programs').isArray().withMessage("Programe must be an array"),
        check('example_titles').isArray().withMessage("Example titles must be an array"),
        check('main_duties').isArray().withMessage("Main duties must be an array"),
        check('employment_requirements').isArray().withMessage("Employment requirements must be an array")
    ], admin.createNocCodes);

    app.put("/admin/noc-codes/:id", [
        verifyToken,
        check('noc_code').optional().notEmpty().withMessage("NOC code cannot be empty"),
        check('class_title').optional().notEmpty().withMessage("Title cannot be empty"),
        check('programs').optional().isArray().withMessage("Programe must be an array"),
        check('example_titles').optional().isArray().withMessage("Example titles must be an array"),
        check('main_duties').optional().isArray().withMessage("Main duties must be an array"),
        check('employment_requirements').optional().isArray().withMessage("Employment requirements must be an array")
    ], admin.editNocCodes);

    app.delete("/admin/noc-codes/:id", verifyToken, admin.deleteNocCodes);
};