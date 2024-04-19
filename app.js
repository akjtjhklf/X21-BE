const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const qnaRouter = require("./src/routes/qnaRouter");
const subjectRouter = require("./src/routes/subjectRouter");

require("dotenv").config({ path: "./.env" });

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", qnaRouter);
app.use("/", subjectRouter);

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
