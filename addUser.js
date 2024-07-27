const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const mongoUrl =
  "mongodb+srv://prajeeshchavan:23072004@cluster0.h5wzxqh.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Connected");
    addUser();
  })
  .catch((e) => {
    console.log(e);
  });

require("./UserDetails");

const User = mongoose.model("UserInfo");

async function addUser() {
  const username = "2203068"; // replace with the desired username
  const password = "2203068"; // replace with the desired password

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user instance
  const newUser = new User({
    username: username,
    password: hashedPassword,
    name: "Prajeesh Chavan",
    class: "TY CSE",
    prn: "2203068",
    Mob_no: "7012020059",
    email: "2203068@ritindia.edu",
    skills: [
      "C",
      "C++",
      "Java",
      "Kotlin",
      "HTML",
      "CSS",
      "JavaScript",
      "ReactJS",
    ],
  });

  // Save the user to the database
  try {
    await newUser.save();
    console.log("User added successfully");
  } catch (error) {
    console.log("Error adding user:", error);
  } finally {
    mongoose.connection.close();
  }
}
