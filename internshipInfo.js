// models/Internship.js

const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
  companyName: { type: String },
  role: { type: String },

  eligible: {
    passoutYear: {
      type: String,
      // required: true,
    },
    branches: {
      type: String,
      // required: true,
    },
  },
  postedOn: { type: Date, default: Date.now },
  deadline: { type: Date },
  description: { type: String },
  requiredDocuments: { type: [String] },
  logo: { type: String, default: "" }, // Path to the logo file
});

const Internship = mongoose.model("Internship", internshipSchema);

module.exports = Internship;
