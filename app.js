const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" });

const app = express();

const port = process.env.PORT;
app.get("/", (req, res) => {
  res.send("hello");
});

const start = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION);

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
