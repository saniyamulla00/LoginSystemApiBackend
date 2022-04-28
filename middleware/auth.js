const jwt=require("jsonwebtoken")
//const route= require("express").Router
const auth = async (req,res,next)=>{
    try {
       const token = req.header("auth") 
       const verifyUser = await jwt.verify(token,process.env.SEC)
       if(!verifyUser)
       {
           res.status(400).json({message:"invalid token"})
       }
       next()
    } catch (error) {
       res.status(400).json({message:error.message})
    }

}
module.exports = auth