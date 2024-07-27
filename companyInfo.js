const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      // required: true,
    },
    role: {
      type: String,
      // required: true,
    },
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
    logo: {
      type: String, // Assuming the logo is a URL
      // required: true,
    },
    postedOn: {
      type: Date,
      default: Date.now,
    },
    deadline: {
      type: Date,
      // required: true,
    },
    jobDescription: {
      type: String,
      // required: true,
    },
    requiredDocuments: {
      type: [String],
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CompanyInfo", companySchema);
