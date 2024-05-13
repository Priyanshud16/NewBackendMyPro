const {Schema,model}=require("mongoose")

const productSchema=new Schema({
title:{type:String,required:true},
price:{type:Number,required:true},
description:{type:String,required:true},
category:{type:String,required:true},
image:{type:String,required:true}
},{versionKey:false})

const productModel=model('product',productSchema)

module.exports=productModel