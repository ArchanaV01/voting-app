const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = global.Promise;
// mongoose.connect(process.env.DB_ACCESS, () =>
//   console.log("Database Connected")
// );

module.exports.User = require("./user");
module.exports.Candidate = require("./candidate");
