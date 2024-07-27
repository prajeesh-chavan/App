const mongoose = require("mongoose");

const UserDetailsScheme = new mongoose.Schema(
  {
    username: String,
    password: String,
    name: String,
    logo: String,
    class: String,
    prn: String,
    Mob_no: String,
    email: String,
    skills: [String],
    resume: String,
  },
  {
    collection: "UserInfo",
  }
);

mongoose.model("UserInfo", UserDetailsScheme);
