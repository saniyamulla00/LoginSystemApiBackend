const mongoose=require("mongoose")
const express=require("express")
require("dotenv/config")

const  user  = require("./route/userroute")

const app=express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("hi")
})


app.use("/user",user)
app.listen(process.env.PORT || 5000);

mongoose.connect(process.env.DB,{useNewUrlParser:true,useUnifiedTopology:true},()=>{
    console.log("dbconnect");
})
