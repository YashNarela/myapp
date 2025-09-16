const mongoose = require("mongoose");
const qrSchema = new mongoose.Schema({
  siteId: { type: String, required: true, unique: true },
  lat: Number,
  lng: Number,
  radius: Number,
  sig: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });
module.exports = mongoose.model("QR", qrSchema);
