let mongoose = require("mongoose");

let subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = subjectSchema;
