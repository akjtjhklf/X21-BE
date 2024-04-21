const Subjects = require("../models/subjectSchema"); // Import schema User từ tệp models/User

const getAll = async (req, res) => {
    try {
        const subjects = await Subjects.find();
        res.status(201).json({ message: "Get subjects successfully !", data: subjects, isSuccess: 1 });
    } catch (error) {
        console.error('Error during getting:', error);
        res.status(500).json({ message: 'Failed to getting', isSuccess: 0 });
    }
};

const createSubject = async (req, res) => {
    try {
        const { name } = req.body
        const existingSubjects = await Subjects.findOne({ name: name });
        if (existingSubjects) {
            return res.status(409).json({ message: "Subject already exists", isSuccess: 0 });
        }
        const newSubject = new Subjects({
            name: name,
        });
        await newSubject.save();
        res.status(201).json({ message: "Create subject successfully !", data: newSubject, isSuccess: 1 });

    } catch (error) {
        console.error('Error during createion:', error);
        res.status(500).json({ message: 'Failed to create', isSuccess: 0 });
    }
}

module.exports = { getAll, createSubject };
