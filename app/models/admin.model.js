const bcrypt = require('bcrypt');
const {
    Admin,
    ExpressEntryDraw,
    PnpTools,
    PnpDraw,
    NocPrograms,
    IrccUpdate,
    NewsAndInsights,
    News,
    NocCodes
} = require('../schema/schema.model');
const fs = require('fs');
const path = require('path');
const AdminModel = {};


// PNP List
AdminModel.MdlPnpList = (req, result) => {
    PnpTools.find({ parent_id: 0 })
        .then(async parents => {
            if (parents.length === 0) {
                result(null, []);
                return;
            }

            const output = await Promise.all(parents.map(async (data) => {
                const children = await PnpTools.find({ parent_id: data.pnp_id });
                data = data.toObject();
                data.pnp_sub_tools = children;
                return data;
            }));

            result(null, output);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// NOC Program
AdminModel.MdlNocProgram = (req, result) => {
    const noc_code = req.query.noc_code || "";
    NocPrograms.find({ noc_code })
        .then(programs => {
            result(null, programs);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Search Immigration Program
AdminModel.MdlSearchImmigrationProgramm = (req, result) => {
    const keyword = req.query.keyword;
    const searchPattern = new RegExp(keyword, 'i');
    NocList.find({
        $or: [
            { class_title: searchPattern },
            { noc_code: searchPattern }
        ]
    })
        .then(programs => {
            result(null, programs);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Admin Login
AdminModel.MdlAdminLogin = (email, password, result) => {
    Admin.findOne({ email })
        .then(admin => {
            if (!admin) {
                result(null, null);
                return;
            }

            bcrypt.compare(password, admin.password)
                .then(isMatch => {
                    if (!isMatch) {
                        result(null, null);
                        return;
                    }

                    const adminData = admin.toObject();
                    delete adminData.password;
                    result(null, adminData);
                })
                .catch(err => {
                    console.error("Password comparison error:", err);
                    result(err, null);
                });
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Create Admin
AdminModel.MdlCreateAdmin = (adminData, result) => {
    Admin.findOne({ email: adminData.email })
        .then(existingAdmin => {
            if (existingAdmin) {
                result({ kind: "email_exists", message: "Email already registered" }, null);
                return;
            }

            bcrypt.genSalt(10)
                .then(salt => bcrypt.hash(adminData.password, salt))
                .then(hashedPassword => {
                    const newAdmin = new Admin({
                        name: adminData.name,
                        email: adminData.email,
                        password: hashedPassword
                    });

                    return newAdmin.save();
                })
                .then(savedAdmin => {
                    const responseData = savedAdmin.toObject();
                    delete responseData.password;
                    result(null, responseData);
                })
                .catch(err => {
                    console.error("Database error:", err);
                    result(err, null);
                });
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Create Express Entry Draw
AdminModel.MdlCreateExpressEntryDraw = (drawData, result) => {
    const newDraw = new ExpressEntryDraw(drawData);
    newDraw.save()
        .then(savedDraw => {
            result(null, savedDraw);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Get All Express Entry Draws
AdminModel.MdlGetAllExpressEntryDraws = (result) => {
    ExpressEntryDraw.aggregate([
        {
            // Sort by is_default (true first) and then by draw_date
            $sort: {
                is_default: -1,  // -1 means descending, so true comes first
                draw_date: -1    // -1 means descending, so newest dates first
            }
        }
    ])
        .then(draws => {
            result(null, draws);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Get Express Entry Draw By ID
AdminModel.MdlGetExpressEntryDrawById = (id, result) => {
    ExpressEntryDraw.findById(id)
        .then(draw => {
            if (!draw) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, draw);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Edit Express Entry Draw
AdminModel.MdlEditExpressEntryDraw = (id, updateData, result) => {
    ExpressEntryDraw.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    )
        .then(draw => {
            if (!draw) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, draw);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Delete Express Entry Draw
AdminModel.MdlDeleteExpressEntryDraw = (id, result) => {
    ExpressEntryDraw.findByIdAndDelete(id)
        .then(draw => {
            if (!draw) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, draw);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Update the setDefaultDraw function
AdminModel.MdlSetDefaultDraw = async (id, result) => {

    try {
        // Find the current document
        const currentDraw = await ExpressEntryDraw.findById(id);

        if (!currentDraw) {
            result({
                kind: 'not_found',
                message: "Express Entry Draw not found"
            });
        }

        // Toggle the is_default value
        const updatedDraw = await ExpressEntryDraw.findByIdAndUpdate(
            id,
            { is_default: !currentDraw.is_default }, // Toggle the value
            { new: true }
        );

        result(null, updatedDraw);

    } catch (error) {
        result({
            kind: 'error',
            message: "Error updating default status",
        });
    }
};

// Get All PNP Draws
AdminModel.MdlGetAllPNPDraws = (result) => {
    PnpDraw.aggregate([
        {
            $sort: {
                is_default: -1,
                draw_date: -1
            }
        }
    ])
        .then(draws => {
            result(null, draws);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Get PNP Draw by ID
AdminModel.MdlGetPNPDrawById = (id, result) => {
    PnpDraw.findById(id)
        .then(draw => {
            if (!draw) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, draw);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Edit PNP Draw
AdminModel.MdlEditPNPDraw = (id, updateData, result) => {
    PnpDraw.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    )
        .then(draw => {
            if (!draw) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, draw);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Delete PNP Draw
AdminModel.MdlDeletePNPDraw = (id, result) => {
    PnpDraw.findByIdAndDelete(id)
        .then(draw => {
            if (!draw) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, draw);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Set Default PNP Draw
AdminModel.MdlSetDefaultPNPDraw = async (id, result) => {

    try {
        // Find the current document
        const currentDraw = await PnpDraw.findById(id);

        if (!currentDraw) {
            result({
                kind: 'not_found',
                message: "PNP Draw not found"
            });
        }

        // Toggle the is_default value
        const updatedDraw = await PnpDraw.findByIdAndUpdate(
            id,
            { is_default: !currentDraw.is_default }, // Toggle the value
            { new: true }
        );

        result(null, updatedDraw);

    } catch (error) {
        result({
            kind: 'error',
            message: "Error updating default status",
        });
    }
};

// Add this new function to your existing Admin model
AdminModel.MdlCreatePNPDraw = (drawData, result) => {
    const newDraw = new PnpDraw(drawData);
    newDraw.save()
        .then(savedDraw => {
            result(null, savedDraw);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Get All IRCC Updates
AdminModel.MdlGetAllIrccUpdates = (result) => {
    IrccUpdate.aggregate([
        {
            $sort: {
                is_default: -1,
                createdAt: -1
            }
        }
    ])
        .then(updates => {
            result(null, updates);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Get IRCC Update by ID
AdminModel.MdlGetIrccUpdateById = (id, result) => {
    IrccUpdate.findById(id)
        .then(update => {
            if (!update) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, update);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Edit IRCC Update
AdminModel.MdlEditIrccUpdate = (id, updateData, result) => {
    IrccUpdate.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    )
        .then(update => {
            if (!update) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, update);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Delete IRCC Update
AdminModel.MdlDeleteIrccUpdate = (id, result) => {
    IrccUpdate.findByIdAndDelete(id)
        .then(update => {
            if (!update) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, update);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Set Default IRCC Update
AdminModel.MdlSetDefaultIrccUpdate = (id, result) => {
    IrccUpdate.findOne({ is_default: true })
        .then(existingDefault => {
            if (existingDefault && existingDefault._id.toString() === id) {
                result({
                    kind: "already_default",
                    message: "This IRCC update is already set as default"
                }, null);
                return Promise.reject('already_handled');
            }

            return IrccUpdate.updateMany(
                { is_default: true },
                { $set: { is_default: false } }
            );
        })
        .then((updateResult) => {
            if (updateResult === 'already_handled') return;

            return IrccUpdate.findByIdAndUpdate(
                id,
                { is_default: true },
                { new: true, runValidators: true }
            );
        })
        .then(update => {
            if (update === 'already_handled') return;

            if (!update) {
                result({
                    kind: "not_found",
                    message: "IRCC update not found"
                }, null);
                return;
            }
            result(null, update);
        })
        .catch(err => {
            if (err === 'already_handled') return;
            console.error("Database error:", err);
            result(err, null);
        });
};

// Create IRCC Update
AdminModel.MdlCreateIrccUpdate = (updateData, result) => {
    const newUpdate = new IrccUpdate(updateData);
    newUpdate.save()
        .then(savedUpdate => {
            result(null, savedUpdate);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Get All News and Insights
AdminModel.MdlGetNewsAndInsights = (result) => {
    NewsAndInsights.find()
        .sort({ createdAt: -1 })
        .then(news => {
            result(null, news);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Get News and Insights by ID
AdminModel.MdlGetNewsAndInsightsById = (id, result) => {
    NewsAndInsights.findById(id)
        .then(news => {
            if (!news) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, news);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Edit News and Insights
AdminModel.MdlEditNewsAndInsights = (id, updateData, result) => {
    NewsAndInsights.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    )
        .then(news => {
            if (!news) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, news);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Delete News and Insights
AdminModel.MdlDeleteNewsAndInsights = (id, result) => {
    NewsAndInsights.findByIdAndDelete(id)
        .then(news => {
            if (!news) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, news);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Create News and Insights
AdminModel.MdlCreateNewsAndInsights = (newsData, result) => {
    const newNews = new NewsAndInsights(newsData);
    newNews.save()
        .then(savedNews => {
            result(null, savedNews);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Get All News
AdminModel.MdlGetNews = (result) => {
    News.find()
        .sort({ createdAt: -1 })
        .then(news => {
            result(null, news);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Get News by ID
AdminModel.MdlGetNewsById = (id, result) => {
    News.findById(id)
        .then(news => {
            if (!news) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, news);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Edit News
AdminModel.MdlEditNews = (id, updateData, req, result) => {
    let image = "";

    News.findById(id)
        .then(news => {
            if (!news) {
                result({ kind: "not_found" }, null);
                return;
            }


            // Update image path if new image is uploaded
            if (req.files != undefined) {

                if (req.files.image != undefined || req.body.image != null) {

                    if (req.files.image.length != 0) {
                        var filename = req.files.image[0].filename;
                        var ext = req.files.image[0].originalname.split(".").pop();
                        filenameForDB = "public/images/news/" + filename + "." + ext;
                        fs.renameSync(
                            "public/images/news/" + filename,
                            "public/images/news/" + filename + "." + ext
                        );
                        updateData.image = filenameForDB;

                        fs.unlink(news.image, function (err) {
                            if (err) console.log(err);
                            console.log('previous file deleted successfully');
                        });
                    }
                }
            }

            return News.findByIdAndUpdate(
                id,
                updateData,
                { new: true, runValidators: true }
            );
        })
        .then(updatedNews => {
            result(null, updatedNews);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Delete News
AdminModel.MdlDeleteNews = (id, result) => {
    News.findById(id)
        .then(news => {
            if (!news) {
                result({ kind: "not_found" }, null);
                return;
            }

            // Delete image file
            if (news.image) {

                fs.unlink(news.image, function (err) {
                    if (err) console.log(err);
                    console.log('previous file deleted successfully');
                });
            }


            return News.findByIdAndDelete(id);
        })
        .then(deletedNews => {
            result(null, deletedNews);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Add News
AdminModel.MdlAddNews = (newsData, req, result) => {
    let image = "";
    if (req.files != undefined) {

        if (req.files.image != undefined || req.body.image != null) {

            if (req.files.image.length != 0) {
                var filename = req.files.image[0].filename;
                var ext = req.files.image[0].originalname.split(".").pop();
                filenameForDB = "public/images/news/" + filename + "." + ext;
                fs.renameSync(
                    "public/images/news/" + filename,
                    "public/images/news/" + filename + "." + ext
                );
                image = filenameForDB;

            }
        }
    }
    const newNews = new News({
        ...newsData,
        image: image
    });

    console.log('newNews=======', newNews);

    newNews.save()
        .then(savedNews => {
            result(null, savedNews);
        })
        .catch(err => {
            // Delete uploaded image if save fails
            // const imagePath = path.join(__dirname, '../public/images/news', imageFile.filename);
            // if (fs.existsSync(imagePath)) {
            //     fs.unlinkSync(imagePath);
            // }
            console.error("Database error:", err);
            result(err, null);
        });
};

// Get All Noc Codes
AdminModel.MdlGetAllNocCodes = (result) => {
    NocCodes.find()
        .then(nocCodes => {
            result(null, nocCodes);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Get Noc Codes by ID
AdminModel.MdlGetNocCodesById = (id, result) => {
    NocCodes.findById(id)
        .then(nocCodes => {
            result(null, nocCodes);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Create Noc Codes
AdminModel.MdlCreateNocCodes = (nocCodesData, result) => {
    const newNocCodes = new NocCodes(nocCodesData);
    newNocCodes.save()
        .then(savedNocCodes => {
            result(null, savedNocCodes);
        })  
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Edit Noc Codes
AdminModel.MdlEditNocCodes = (id, nocCodesData, result) => {
    NocCodes.findByIdAndUpdate(
        id,
        nocCodesData,
        { new: true, runValidators: true }
    )
        .then(updatedNocCodes => {  
            result(null, updatedNocCodes);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Delete Noc Codes
AdminModel.MdlDeleteNocCodes = (id, result) => {
    NocCodes.findByIdAndDelete(id)
        .then(deletedNocCodes => {
            result(null, deletedNocCodes);
        })
        .catch(err => {
            console.error("Database error:", err);
            result(err, null);
        });
};

// Get Dashboard Counts
AdminModel.MdlGetDashboardCounts = async (result) => {
    try {
        const counts = await Promise.all([
            NocCodes.countDocuments(),
            News.countDocuments(),
            NewsAndInsights.countDocuments(),
            IrccUpdate.countDocuments(),
            PnpDraw.countDocuments(),
            ExpressEntryDraw.countDocuments()
        ]);

        const dashboardCounts = {
            nocCodes: counts[0],
            news: counts[1],
            newsAndInsights: counts[2],
            irccUpdates: counts[3],
            pnpDraws: counts[4],
            expressEntryDraws: counts[5]
        };

        result(null, dashboardCounts);
    } catch (err) {
        console.error("Database error:", err);
        result(err, null);
    }
};

module.exports = {
    AdminModel,
};