const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const candidate = require("./candidate");

const user = new mongoose.Schema({
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  vote: {
    type: mongoose.Schema.Types.ObjectId,
    ref: candidate,
  },
});

user.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const hashed = await bcrypt.hash(this.password, 10);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

user.methods.comparePassword = async function (attempt, next) {
  try {
    console.log("inside comparepassword");
    return await bcrypt.compare(attempt, this.password);
  } catch (err) {
    return next(err);
  }
};

module.exports = mongoose.model("users", user);

// mongodb+srv://Eunimart_test:<password>@cluster0.m1q0z.mongodb.net/<dbname>?retryWrites=true&w=majority
