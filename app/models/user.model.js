const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {
    ExpressEntryDraw,
    PnpDraw,
    IrccUpdate,
    NewsAndInsights,
    News,
    NocCodes,
    ProgramLevel,
    ProgramTag,
    Programs,
    Institution
} = require('../schema/schema.model');
const User = {};

// Get All Frontend Latest Updates Data
User.MdlGetFrontendLatestUpdatesData = async (result) => {
    try {
        // Get latest express entry draw (default)
        const latestExpressDraw = await ExpressEntryDraw.findOne(
            { is_default: true }
        ).sort({ draw_number: -1 });

        // Get latest PNP draw (default)
        const latestPnpDraw = await PnpDraw.findOne(
            { is_default: true }
        ).sort({ draw_number: -1 });

        // Get express entry draws (non-default, sorted by draw number)
        const expressEntryDraws = await ExpressEntryDraw.find(
        ).sort({ createdAt: -1 });

        // Get PNP draws (sorted by creation date)
        const pnpDraws = await PnpDraw.find(
        )
            .sort({ createdAt: -1 });

        // Get IRCC updates (sorted by creation date)
        const irccUpdates = await IrccUpdate.find()
            .sort({ createdAt: -1 });

        // Get news and insights (sorted by creation date)
        const newsAndInsights = await NewsAndInsights.find()
            .sort({ createdAt: -1 });

        // Get news (sorted by creation date)
        const news = await News.find()
            .sort({ createdAt: -1 });

        // Combine all data
        const combinedData = {
            latest_express_draw: latestExpressDraw || null,
            latest_pnp_draw: latestPnpDraw || null,
            express_entry: expressEntryDraws || [],
            pnp_draw: pnpDraws || [],
            ircc_updates: irccUpdates || [],
            news_and_insights: newsAndInsights || [],
            news: news || []
        };

        result(null, combinedData);
    } catch (err) {
        console.error("Database error:", err);
        result(err, null);
    }
};

// Get Frontend Latest Draw Data
User.MdlGetFrontendLatestDrawData = async (result) => {
    try {
        // Get latest express entry draw (default)
        const latestExpressDraw = await ExpressEntryDraw.find(
            { is_default: true }
        ).sort({ draw_number: -1 });

        // Get latest PNP draw (default)
        const latestPnpDraw = await PnpDraw.find(
            { is_default: true }
        ).sort({ draw_number: -1 });

        // Combine all data
        const combinedData = {
            draw_data: [...latestExpressDraw, ...latestPnpDraw]
        };

        result(null, combinedData);
    } catch (err) {
        console.error("Database error:", err);
        result(err, null);
    }
};

// Get Frontend Noc Codes
User.MdlGetFrontendNocCodes = async (result) => {
    try {
        const nocCodes = await NocCodes.find()
            .select('class_title noc_code teer_category _id');
        result(null, nocCodes);
    } catch (err) {
        console.error("Database error:", err);
        result(err, null);
    }
};

// Get Frontend Noc Codes By Id
User.MdlGetFrontendNocCodesById = async (noc_code, result) => {
    try {
        const nocCode = await NocCodes.findOne({ noc_code: noc_code });
        result(null, nocCode);
    } catch (err) {
        console.error("Database error:", err);
        result(err, null);
    }
};

// Get Frontend Pnp Draw By Province
User.MdlGetFrontendPnpDrawByProvince = async (province, result) => {
    try {
        const pnpDraw = await PnpDraw.find({
            province: { $regex: province, $options: 'i' }
        });
        result(null, pnpDraw);
    } catch (err) {
        console.error("Database error:", err);
        result(err, null);
    }
};

// Get Frontend Program Levels
User.MdlGetFrontendProgramLevels = async (result) => {
    try {
        const programLevels = await ProgramLevel.find();
        result(null, programLevels);
    } catch (err) {
        console.error("Database error:", err);
        result(err, null);
    }
};

// Get Frontend Institution Types
User.MdlGetFrontendInstitutionTypes = async (result) => {
    try {
        const institutionTypes = await Institution.find();
        result(null, institutionTypes); 
    } catch (err) {
        console.error("Database error:", err);
        result(err, null);
    }
};



// Get Frontend Program Tags
User.MdlGetFrontendProgramTags = async (result) => {
    try {
        const programTags = await ProgramTag.find();
        result(null, programTags);
    } catch (err) {
        console.error("Database error:", err);
        result(err, null);
    }
};

// Get Frontend Program Search
User.MdlGetFrontendProgramSearch = async (filters, result) => {
    try {
        let query = {};
        
        // Pagination parameters
        const page = parseInt(filters.page) || 1;
        const limit = parseInt(filters.limit) || 10;
        const skip = (page - 1) * limit;
        
        // Build query based on provided filters
        if (filters) {
            if (filters.course) {
                query.course = filters.course;
            }
            if (filters.program_level) {
                query.program_level = filters.program_level;
            }
            if (filters.field_of_study) {
                query.field_of_study = filters.field_of_study;
            }
            if (filters.program_tags && filters.program_tags.length > 0) {
                query.program_tags = { $in: filters.program_tags };
            }
            if (filters.university_name) {
                query.university_name = { $regex: filters.university_name, $options: 'i' };
            }
            if (filters.campus_city) {
                query.campus_city = { $regex: filters.campus_city, $options: 'i' };
            }
            if (filters.institution_type) {
                query.institution_type = filters.institution_type;
            }
        }

        // Get total count for pagination
        const totalCount = await Programs.countDocuments(query);

        // Get paginated data
        const programSearch = await Programs.find(query)
            .populate('program_tags')
            .populate('program_level')
            .populate({
                path: 'field_of_study',
                populate: {
                    path: 'field_of_study',
                    match: { '_id': filters.course }
                }
            })
            .populate('institution_type')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Filter out empty field_of_study arrays
        const filteredProgramSearch = programSearch.map(program => {
            if (program.field_of_study && program.field_of_study.field_of_study) {
                program.field_of_study.field_of_study = program.field_of_study.field_of_study.filter(
                    field => field._id.toString() === filters.course
                );
            }
            return program;
        });

        // Prepare pagination info
        const totalPages = Math.ceil(totalCount / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
            
        if (typeof result === 'function') {
            result(null, {
                data: filteredProgramSearch,
                pagination: {
                    total: totalCount,
                    page: page,
                    limit: limit,
                    totalPages: totalPages,
                    hasNextPage: hasNextPage,
                    hasPrevPage: hasPrevPage,
                    nextPage: hasNextPage ? page + 1 : null,
                    prevPage: hasPrevPage ? page - 1 : null
                }
            });
        }
    } catch (err) {
        console.error("Database error:", err);
        if (typeof result === 'function') {
            result(err, null);
        }
    }
};
// Get Frontend Program Search By Program Name
User.MdlGetFrontendProgramSearchByProgramName = async (filters, result) => {
    try {
        let query = {};
        
        // Build query based on provided filters
        if (filters) {
            // Program name search (required)
            if (filters.program_name) {
                query.program_name = { $regex: filters.program_name, $options: 'i' };
            }

            // Optional filters
            if (filters.course) {
                query.course = filters.course;
            }
            if (filters.field_of_study) {
                query.field_of_study = filters.field_of_study;
            }
            if (filters.institution_type) {
                query.institution_type = filters.institution_type;
            }
            if (filters.program_level) {
                query.program_level = filters.program_level;
            }
            if (filters.program_sublevel) {
                query.program_sublevel = filters.program_sublevel;
            }
        }

        // Pagination parameters
        const page = parseInt(filters.page) || 1;
        const limit = parseInt(filters.limit) || 10;
        const skip = (page - 1) * limit;

        // Get total count for pagination
        const totalCount = await Programs.countDocuments(query);

        // Get paginated data
        const programSearch = await Programs.find(query)
            .populate('program_tags')
            .populate('program_level')
            .populate({
                path: 'field_of_study',
                populate: {
                    path: 'field_of_study',
                    match: { '_id': filters.field_of_study }
                }
            })
            .populate('institution_type')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // Filter out empty field_of_study arrays if course filter is applied
        const filteredProgramSearch = programSearch.map(program => {
            if (filters.course && program.field_of_study && program.field_of_study.field_of_study) {
                program.field_of_study.field_of_study = program.field_of_study.field_of_study.filter(
                    field => field._id.toString() === filters.course
                );
            }
            return program;
        });

        // Prepare pagination info
        const totalPages = Math.ceil(totalCount / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        if (typeof result === 'function') {
            result(null, {
                data: filteredProgramSearch,
                pagination: {
                    total: totalCount,
                    page: page,
                    limit: limit,
                    totalPages: totalPages,
                    hasNextPage: hasNextPage,
                    hasPrevPage: hasPrevPage,
                    nextPage: hasNextPage ? page + 1 : null,
                    prevPage: hasPrevPage ? page - 1 : null
                }
            });
        }
    } catch (err) {
        console.error("Database error:", err);
        if (typeof result === 'function') {
            result(err, null);
        }
    }
};



module.exports = {
    User,

};