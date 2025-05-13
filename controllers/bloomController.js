
const mongoose= require('mongoose')
const Bloom= require('../models/bloomModel') 
const User= require('../models/userModel') 
//get all blooms
const getBlooms = async(req,res)=>{
    const blooms = await Bloom.find({})
      .sort({createdAt:-1})
      .populate('userId','name')
      .exec();
    
    res.status(200).json(blooms)
}
const createBloom = async(req,res)=>{
    const {username,text}= req.body 
    const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    try {
        const bloom = await Bloom.create({username,text,userId:user._id})
        const populatedBloom = await Bloom.findById(bloom._id)
        .populate("userId", "name")
        .exec();

        res.status(200).json(populatedBloom)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
const getPBlooms = async(req,res)=>{
   const{username} = req.params
   if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }
   try {
     const Pblooms = await Bloom.find({username}).sort({createdAt:-1})
     res.status(200).json({Pblooms})
   }
   catch (error){
      console.error("Error fetching blooms:", error);
      res.status(500).json({ error: "Server error. Please try again later." });
   }
}
//delete a workout
const deleteBloom = async (req,res)=>{
    const {id} = req.params// single workout route /:id, so that changing value is stores in params prop
    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error:'no such bloom'})
    }
    const bloom = await Bloom.findOneAndDelete({_id: id})
    if(!bloom){
       return res.status(404).json({error: 'no such bloom'})
    }
    res.status(200).json(bloom)
 }
 
 //update a workout
 const editBloom = async (req,res)=>{
    const {id} = req.params// single workout route /:id, so that changing value is stores in params prop
    if(!mongoose.Types.ObjectId.isValid(id)){
       return res.status(404).json({error:'no such bloom'})
    }
    const bloom = await Bloom.findOneAndUpdate({_id: id},{
       ...req.body
    })
    if(!bloom){
       return res.status(404).json({error: 'no such bloom'})
    }
    res.status(200).json(bloom)
 }
 
 module.exports = {
    getBlooms,
    getPBlooms,
    deleteBloom,
    createBloom,
    editBloom
 }