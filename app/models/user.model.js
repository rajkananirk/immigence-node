const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {   
    ExpressEntryDraw,
    PnpDraw,
    IrccUpdate,
    NewsAndInsights,
    News
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


module.exports = {
    User,
   
};