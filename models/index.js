const dbConfig = require("../config/DB");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.pc = require("./Pc.model.js")(mongoose);

module.exports = db;