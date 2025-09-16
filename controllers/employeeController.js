const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Create Employee (Admin only)
exports.createEmployee = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    // check if email already exists
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    const employee = await User.create({
      name,
      email,
      password: hash,
      role: "employee",
      createdBy: req.user.id, // admin who created
    });

    res.json({ msg: "Employee created successfully", employee });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get All Employees
exports.getEmployees = async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" })
      .select("-password")
      .populate("createdBy", "name email");
    res.json(employees);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const { name, email } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true }
    ).select("-password");

    if (!updated) return res.status(404).json({ msg: "Employee not found" });

    res.json({ msg: "Employee updated", updated });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ msg: "Employee not found" });

    res.json({ msg: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
