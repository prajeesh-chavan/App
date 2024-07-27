const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  },
});

const app = express();

const mongoUrl =
  "mongodb+srv://prajeeshchavan:23072004@cluster0.h5wzxqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUrl)
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e));

require("./UserDetails");
require("./companyInfo");
require("./annoucements");
require("./internshipInfo"); // Add this line

const User = mongoose.model("UserInfo");
const Company = mongoose.model("CompanyInfo");
const Announcements = mongoose.model("annoucements");
const Internship = mongoose.model("Internship"); // Add this line

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send({ status: "Started" });
});

// User login
app.post("/login-user", async (req, res) => {
  const { username, password } = req.body;
  try {
    const oldUser = await User.findOne({ username });
    if (!oldUser) {
      return res.status(400).send({ message: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, oldUser.password);
    if (isMatch) {
      res.send({ user: oldUser });
    } else {
      res.status(400).send({ message: "Invalid password" });
    }
  } catch (error) {
    res.status(500).send({ error: "Error logging in user" });
  }
});

// Add Company
app.post("/submit-company", upload.single("logo"), async (req, res) => {
  try {
    const {
      companyName,
      role,
      passoutYear,
      branches,
      postedOn,
      deadline,
      jobDescription,
      requiredDocuments,
    } = req.body;

    const newCompany = new Company({
      companyName,
      role,
      eligible: {
        passoutYear,
        branches,
      },
      logo: req.file ? req.file.path : "",
      postedOn,
      deadline,
      jobDescription,
      requiredDocuments,
    });

    await newCompany.save();
    res.send({ data: "Company information saved successfully" });
  } catch (error) {
    res.status(500).send({ error: "Error saving company information" });
  }
});

// Get Companies
app.get("/company-info", async (req, res) => {
  try {
    const companies = await Company.find();
    res.send(companies);
  } catch (error) {
    res.status(500).send({ error: "Error fetching company information" });
  }
});

// Announcements
app.get("/announcements", async (req, res) => {
  try {
    const announcements = await Announcements.find();
    res.send(announcements);
  } catch (error) {
    res.status(500).send({ error: "Error fetching announcements" });
  }
});

// Update Announcements
app.post("/update-announcements", async (req, res) => {
  try {
    const { items } = req.body;
    // Assuming there's only one document for announcements
    const updateResult = await Announcements.findOneAndUpdate(
      {}, // Match all documents (if you have only one)
      { items }, // Update the items field
      { new: true, upsert: true } // Create the document if it does not exist
    );
    res.send(updateResult);
  } catch (error) {
    console.error("Error updating announcements:", error);
    res.status(500).send({ error: "Error updating announcements" });
  }
});

// Update user skills
app.post("/update-skills", async (req, res) => {
  const { userId, skills } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { skills } },
      { new: true }
    );
    res.send(updatedUser);
  } catch (error) {
    console.error("Error updating skills:", error);
    res.status(500).send({ error: "Error updating skills" });
  }
});

// Upload Resume
app.post("/upload-resume", upload.single("resume"), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ error: "No file uploaded" });
  }
  res.send("Resume uploaded successfully");
});

// Add Internship
app.post("/submit-internship", upload.single("logo"), async (req, res) => {
  try {
    const {
      companyName,
      role,
      branches,
      passoutYear,
      duration,
      stipend,
      applicationDeadline,
      description,
      requiredDocuments,
    } = req.body;

    const newInternship = new Internship({
      companyName,
      role,
      eligible: {
        passoutYear,
        branches,
      },
      duration,
      stipend,
      applicationDeadline,
      description,
      requiredDocuments,
      logo: req.file ? req.file.path : "", // Save the logo path if provided
    });

    await newInternship.save();
    res.send({ data: "Internship information saved successfully" });
  } catch (error) {
    console.error("Error saving internship information:", error);
    res.status(500).send({ error: "Error saving internship information" });
  }
});

// Get Internships
app.get("/internship-info", async (req, res) => {
  try {
    const internships = await Internship.find();
    res.send(internships);
  } catch (error) {
    res.status(500).send({ error: "Error fetching internship information" });
  }
});

app.listen(3000, () => {
  console.log("Node.js server started on port 3000");
});
