const Subject = require("../models/subjectSchema");

exports.getAllSubjects = async function (req, res) {
  try {
    const Subjects = await Subject.find();
    if (!Subject.length) {
      res.status(404).json({
        msg: "No subjects found",
      });
    }
    res.status(200).json({
      data: Subjects,
      msg: "Get all subjects success !",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Interval server error" });
  }
};
