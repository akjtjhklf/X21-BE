const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")
const {connectDb} = require("./until/connectDb");
const userRouter = require("./routes/users");
const adminRouter = require("./routes/admins");
const subjectRouter = require("./routes/subjects");
const qnaRouter = require("./routes/questions");
require("dotenv").config({ path: "./.env" });

const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use("/users",userRouter);
app.use("/admins",adminRouter);
app.use("/subjects",subjectRouter);
app.use("/qnas",qnaRouter);

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  connectDb();
});
