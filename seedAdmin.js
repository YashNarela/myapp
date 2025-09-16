const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
mongoose.connect("mongodb://localhost:27017/guardPatrol");
async function seed(){
  const exists = await User.findOne({ email: "admin@company.com" });
  if(exists){ console.log("Admin exists"); return process.exit(); }
  const hash = await bcrypt.hash("admin123", 10);
  await User.create({ name: "Super Admin", email: "admin@company.com", password: hash, role: "admin" });
  console.log("Admin created: admin@company.com / admin123");
  process.exit();
}
seed();
