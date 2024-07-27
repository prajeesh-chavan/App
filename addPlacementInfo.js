const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const mongoUrl =
  "mongodb+srv://prajeeshchavan:23072004@cluster0.h5wzxqh.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Database Connected");
    addPlacementInfo();
  })
  .catch((e) => {
    console.log(e);
  });

require("./companyInfo");

const Info = mongoose.model("CompanyInfo");

async function addPlacementInfo() {
  // Create an array of new info instances with explicit _id
  const newInfos = [
    {
      _id: new mongoose.Types.ObjectId(),
      id: "2",
      name: "Wipro",
      role: "System Engineer",
      eligibleBatch: "2024, 2025",
      logo: "",
      postedOn: "15/07/2024",
      applicationDeadline: "20/01/2024",
      jobDescription:
        "As a System Engineer at Wipro, you will be engaged in IT operations and support, focusing on IT management, systems administration, and troubleshooting. Responsibilities include monitoring IT systems and networks, providing technical support, preparing documentation, and managing service requests. Candidates should have a Bachelor’s degree in Computer Science, strong problem-solving skills, and experience with ITIL processes. Certifications in ITIL or similar frameworks are a plus.",
      requiredDocuments: ["Resume", "Identity Proof"],
    },
  ];

  // Save the info documents to the database
  try {
    await Info.insertMany(newInfos);
    console.log("Placement info added successfully");
  } catch (error) {
    console.log("Error adding placement info:", error);
  } finally {
    mongoose.connection.close();
  }
}
