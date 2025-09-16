const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/keys");
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role)
      return res.status(400).json({ msg: "All fields required" });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
      role,
      createdBy: req.user ? req.user.id : null,
    });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
exports.login = async (req, res) => {
  console.log("Login attempt:", req.body); // Debugging line

  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ msg: "Email & password required" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
