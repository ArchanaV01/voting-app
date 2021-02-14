const mongoose = require("mongoose");

const candidate = new mongoose.Schema({
  candidate: {
    type: String,
    required: true,
  },
  n_of_votes: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("candidateTable", candidate);
