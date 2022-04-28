const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    Name:String,
    Email_Id:String,
    Password:String
    
})
module.exports=mongoose.model("user",userSchema)