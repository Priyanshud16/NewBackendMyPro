const express =require("express")
const ConnectDB = require("./config/db")
const cors=require("cors")
const userRouter = require("./Routes/userRoutes")
const productRouter = require("./Routes/productRoutes")
const dotenv=require("dotenv").config()
const app=express()
app.use(express.json())

app.use(cors());
app.use('/user',userRouter)
app.use("/",productRouter)
app.get('/',(req,res)=>{
    res.send("This is our Home Route")
})

app.listen(process.env.PORT,async()=>{
    try {
        await ConnectDB()
        console.log("Server Is Running and DB is Connected");
    } catch (error) {
        
    }
   
})