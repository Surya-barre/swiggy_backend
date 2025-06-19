import Vendor from "../models/Vendor.js";
 import jwt from "jsonwebtoken";
 import bcrypt from "bcryptjs"
 import dotenv from "dotenv";
 dotenv.config();
 const secretkey = process.env.SecretKey;

 const vendorRegister=async(req,res)=>{
    const {username,email,password}=req.body;
     try{
   const vendorEmail=await Vendor.findOne({email});
   if(vendorEmail){
    return res.status(400).json("email already exists");
   }
   const hashpassword=await bcrypt.hash(password,10);
   const newVendor=new Vendor({
    username,
    email,
    password:hashpassword

   })
   await newVendor.save();
   res.status(200).json({mesage:"vendor registered successfully"});
     }
     catch(err){
         console.log(err);
         res.status(500).json({err:"Internal server err"})
     }
    }
 const vendorLogin= async(req,res)=>{
  try{
    const { email, password } = req.body;
  const exist = await Vendor.findOne({ email });
  if (!exist) {
    return res.send(404).json({ message: "vendor not found" });
  }
  const correct=await bcrypt.compare(password,exist.password)
   if (!correct) {
     return res.send(401).json({ message: "Invaild password" });
   }
   const token = jwt.sign({ vendorId: exist._id }, secretkey,{expiresIn:"1h"});
   
  res.status(200).json({ message: "Login successfully",token});
  }
  catch(err){
   res.status(500).json({err:"Server error"})
  }
     }

     const getAllVendors=async(req,res)=>{
      try{
        const vendor=await Vendor.find().populate('firm');
        res.json({vendor})
      }catch(error){

    console.log(error)
    res.status(500).json({error:"Internal server error"}) 
      }

     }
     const getVendorById=async(req,res)=>{
      const vendorId=req.params.id;
      
      try{
        const vendor=await Vendor.findById(vendorId).populate('firm');
        // console.log(vendor)
        if(!vendor)
          {
            res.status(404).json({error:"vendor not found"})
          }
          res.status(200).json({vendor})
      }catch(err){
        console.log(err)
        res.status(500).json({error:"Ineternal server error"})
      }
     }

  
export { vendorRegister,vendorLogin,getAllVendors,getVendorById };