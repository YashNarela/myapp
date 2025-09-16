const mongoose = require("mongoose");
const patrolSchema = new mongoose.Schema({
  guard: { type: mongoose.Schema.Types.ObjectId, ref: "Guard", required: true },
  qrCodeId: { type: String, required: true },
  location: { lat: Number, lng: Number },
  distanceMeters: Number,
  photo: String,
  isVerified: Boolean
}, { timestamps: true });
module.exports = mongoose.model("Patrol", patrolSchema);
