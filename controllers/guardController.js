const Guard = require("../models/Guard");
exports.createGuard = async (req,res)=>{
  try{
    const { name, photo } = req.body;
    if(!name) return res.status(400).json({msg:"name required"});
    const guard = await Guard.create({ name, photo, createdBy: req.user.id });
    res.json(guard);
  }catch(err){ res.status(500).json({msg:err.message}); }
};
exports.getGuards = async (req,res)=>{
  try{
    const guards = await Guard.find().populate("createdBy","name email");
    res.json(guards);
  }catch(err){ res.status(500).json({msg:err.message}); }
};
exports.updateGuard = async (req,res)=>{
  try{
    const guard = await Guard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!guard) return res.status(404).json({msg:"Guard not found"});
    res.json(guard);
  }catch(err){ res.status(500).json({msg:err.message}); }
};
exports.deleteGuard = async (req,res)=>{
  try{
    const guard = await Guard.findByIdAndDelete(req.params.id);
    if(!guard) return res.status(404).json({msg:"Guard not found"});
    res.json({msg:"Guard deleted"});
  }catch(err){ res.status(500).json({msg:err.message}); }
};
