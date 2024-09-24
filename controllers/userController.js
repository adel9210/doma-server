const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config/constants");

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({status: false, message: "Invalid Email or Password!" });
        }

        const isMatch = password === user.password

        if (!isMatch) {
            return res.status(400).json({status: false, message: "Invalid Email or Password!" });
        }

        const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
            expiresIn: "30d",
        });

        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
