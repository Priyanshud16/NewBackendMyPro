const {Router}=require("express")
const userModel = require("../model/userModel")
const bcrypt = require('bcrypt');
const dotenv=require("dotenv").config()
var jwt = require('jsonwebtoken');
const userRouter=Router()

userRouter.post('/register',async(req,res)=>{
    const {email,password,name}=req.body
    try {
        bcrypt.hash(password,5, async(err, hash)=> {
            // Store hash in your password DB.
            if(err){
                res.status(404).json({message:"Error while hasing the Password"})
            }else{
                const user=new userModel({email,password:hash,name})
                await user.save()
                res.status(201).json({message:"User Registered Successfully"})
            }
        });

    } catch (error) {
        res.status(404).json({message:"Something Wents Wrong"})
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await userModel.findOne({email})
         if(user){
            bcrypt.compare(password, user.password, async(err, result)=> {
                // result == false
                if(result){
              const token= jwt.sign({id:user._id,email:user.email},process.env.JWT_TOKEN)
              res.status(201).json({message:"User Login Successfully",token})

                }else{
                    res.status(404).json({message:"Password is incorrect"})
                }
            });
         }
    } catch  {
        
    }
})

module.exports=userRouter