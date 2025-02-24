const mongoose = require('mongoose');

// Define schemas
const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, { timestamps: true });

const expressEntryDrawSchema = new mongoose.Schema({
    title: { type: String, required: true },
    types: { type: Object, required: true },
    draw_date: { type: Date, required: true },
    draw_number: { type: String, required: true },
    crs_cut_off: { type: Number, required: true },
    itas_issued: { type: Number, required: true },
    remarks: String,
    is_default: { type: Boolean, default: false }
}, { timestamps: true });

const pnpToolsSchema = new mongoose.Schema({
    pnp_id: { type: Number, required: true },
    parent_id: { type: Number, default: 0 },
    name: String,
    description: String
});

const nocProgramsSchema = new mongoose.Schema({
    noc_code: { type: String, required: true },
    title: String,
    description: String
});

const nocCodesSchema = new mongoose.Schema({
    noc_code: { type: String, required: true },
    class_title: String,
    programs: [{ type: Object }],
    example_titles: { type: Array },
    main_duties: { type: Array },
    employment_requirements: { type: Array }
});

const pnpDrawSchema = new mongoose.Schema({
    title: { type: String, required: true },
    draw_date: { type: Date, required: true },
    types: { type: Object, required: true },
    province: { type: String, required: true },
    score: { type: String, required: true },
    streams: { type: String, required: true },
    nois_issued: { type: String, required: true },
    is_default: { type: Boolean, default: false }
}, { timestamps: true });


const irccUpdateSchema = new mongoose.Schema({
    title: { type: String, required: true },
    types: { type: Object, required: true },
    description: { type: String, required: true },
    is_default: { type: Boolean, default: false }
}, { timestamps: true });

const newsAndInsightsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    types: { type: Object, required: true },
    description: { type: String, required: true }
}, { timestamps: true });

// Add this new schema
const newsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }
}, { timestamps: true });

const News = mongoose.model('News', newsSchema);
const IrccUpdate = mongoose.model('IrccUpdate', irccUpdateSchema);
const NewsAndInsights = mongoose.model('NewsAndInsights', newsAndInsightsSchema);


// Create models
const PnpDraw = mongoose.model('PnpDraw', pnpDrawSchema);
const Admin = mongoose.model('Admin', adminSchema);
const ExpressEntryDraw = mongoose.model('ExpressEntryDraw', expressEntryDrawSchema);
const PnpTools = mongoose.model('PnpTools', pnpToolsSchema);
const NocPrograms = mongoose.model('NocPrograms', nocProgramsSchema);
const NocCodes = mongoose.model('NocCodes', nocCodesSchema);

// Export all models
module.exports = {
    Admin,
    News,
    NewsAndInsights,
    PnpDraw,
    ExpressEntryDraw,
    PnpTools,
    NocPrograms,
    NocCodes,
    IrccUpdate
};