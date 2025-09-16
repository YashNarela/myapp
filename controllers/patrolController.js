const Patrol = require("../models/Patrol");
const { validateLocation } = require("../utils/qrValidator");
const { verifyQRSignature } = require("../utils/qrVerifier");
const QR = require("../models/QR");
exports.scanQR = async (req,res)=>{
  try{
    const { guardId, siteId, qrLat, qrLng, qrRadius, qrSig, guardLat, guardLng, photo } = req.body;
    if(!guardId||!siteId||qrLat==null||qrLng==null||qrRadius==null||!qrSig||guardLat==null||guardLng==null){
      return res.status(400).json({msg:"All fields required"});
    }
    const qrDoc = await QR.findOne({ siteId });
    if(!qrDoc) return res.status(400).json({ ok:false, error: "Unknown QR siteId" });
    const validSig = verifyQRSignature(siteId, qrLat, qrLng, qrRadius, qrSig);
    if(!validSig) return res.status(400).json({ ok:false, error:"Invalid QR signature" });
    const distance = validateLocation(qrLat, qrLng, guardLat, guardLng);
    const isVerified = distance <= qrRadius;
    const patrol = await Patrol.create({
      guard: guardId,
      qrCodeId: siteId,
      location: { lat: guardLat, lng: guardLng },
      distanceMeters: distance,
      photo,
      isVerified
    });
    res.json({
      ok:true,
      isVerified,
      distanceMeters: distance.toFixed(2),
      qrSiteId: siteId,
      patrolId: patrol._id,
      msg: isVerified ? `Verified ✅` : `Out of range ❌ Distance: ${distance.toFixed(2)}m`,
      timestamp: new Date()
    });
  }catch(err){ res.status(500).json({msg:err.message}); }
};
