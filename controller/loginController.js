const userSchema=require("../db/userdb")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

exports.login= async (user)=>{
    try {
        const users= await userSchema.findOne({Email_Id:user.Email_Id})
        if(!users){
            return {errors:true,message:"invalid email or password"}
        }
        const passwordExist = await bcrypt.compare(user.Password,users.Password)
        if(!passwordExist){
            return {errors:true, message:"invalid email or password"}
        }
        const token = await jwt.sign({_id:users._id},process.env.SEC)
        return {errors:false,data:{token:token,user:users}}
    } catch (error) {
       return {errors:true,message:error.message} 
    }
}