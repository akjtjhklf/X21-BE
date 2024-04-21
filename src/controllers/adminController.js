const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admins = require("../models/adminSchema"); // Import schema User từ tệp models/User

const register = async (req, res) => {
    const { fullName, email, password, phone, gender, dob, totalpoint } = req.body;

    try {
        // Kiểm tra xem người dùng đã tồn tại chưa
        const existingUser = await Admins.findOne({ email: email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists", isSuccess: 0 });
        }

        // Hash mật khẩu
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo người dùng mới
        const newUser = new Users({
            fullName: fullName,
            email: email,
            phone: 12345678910,
            password: password,
            phone: phone,
            gender: gender,
            dob: dob,
            avatar: "",
            totalpoint: totalpoint
        });

        // Lưu người dùng vào cơ sở dữ liệu
        await newUser.save();

        res.status(201).json({ message: "Register Successfully !", data: newUser, isSuccess: 1 });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Failed to register', isSuccess: 0 });
    }
};

const getUsersList = async (req, res) => {
    try {
        const users = await Admins.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Tìm người dùng trong cơ sở dữ liệu
        const user = await Admins.findOne({ email: email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials", isSuccess: 0 });
        }

        // So sánh mật khẩu
        // const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (password!=user.password) {
            return res.status(401).json({ message: "Invalid credentials", isSuccess: 0 });
        }

        // Tạo JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.json({ message: 'Login successful', token, user: user, isSuccess: 1 });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Failed to log in', isSuccess: 0 });
    }
};

const changePassword = async (req, res) => {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;

    try {
        // Tìm người dùng trong cơ sở dữ liệu
        const user = await Admins.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', isSuccess: 0 });
        }

        // Kiểm tra mật khẩu hiện tại
        const isPasswordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Current password is incorrect', isSuccess: 0 });
        }

        // Hash mật khẩu mới
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Cập nhật mật khẩu mới cho người dùng
        await Admins.findByIdAndUpdate(userId, { password: hashedNewPassword });

        res.json({ message: 'Password changed successfully', isSuccess: 1 });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Failed to change password', isSuccess: 0 });
    }
};

module.exports = { login, register, changePassword, getUsersList };
