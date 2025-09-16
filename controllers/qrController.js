const QR = require("../models/QR");
const { generateQR } = require("../utils/qrGenerator");
exports.createQR = async (req,res)=>{
  try{
    const { siteId, lat, lng, radius } = req.body;
    if(!siteId||lat==null||lng==null||radius==null) return res.status(400).json({msg:"All fields required"});
    const payload = generateQR(siteId, lat, lng, radius);
    const qr = await QR.create({ siteId: payload.siteId, lat, lng, radius, sig: payload.sig, createdBy: req.user.id });
    res.json({ qr, payload });
  }catch(err){ res.status(500).json({msg:err.message}); }
};
exports.getAllQR = async (req,res)=>{
  try{
    const qrs = await QR.find().populate("createdBy","name email");
    res.json(qrs);
  }catch(err){ res.status(500).json({msg:err.message}); }
};
exports.deleteQR = async (req,res)=>{
  try{
    const qr = await QR.findByIdAndDelete(req.params.id);
    if(!qr) return res.status(404).json({msg:"QR not found"});
    res.json({msg:"QR deleted"});
  }catch(err){ res.status(500).json({msg:err.message}); }
};
