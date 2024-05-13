const {Router}=require("express")
const productModel = require("../model/productModel")
const productRouter=Router()

productRouter.post('/Post',async(req,res)=>{
    const {title,price,category,description,image}=req.body
const data=await productModel.create({title,price,category,description,image})
await data.save()
res.status(201).json({message:"Data Created Sucessfully"})
})

productRouter.get("/products",async(req,res)=>{
    const data=await productModel.find()
    res.status(201).json({data})
})

module.exports=productRouter