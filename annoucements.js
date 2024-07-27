const mongoose = require("mongoose");

const annoucementsScheme = new mongoose.Schema(
  {
    items: [String],
  },
  {
    collection: "annoucements",
  }
);

mongoose.model("annoucements", annoucementsScheme);
