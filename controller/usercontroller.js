
const userSchema=require("../db/userdb")
const bcrypt=require("bcrypt")
const { genSalt } = require("bcrypt")
//postMovie controller
exports.createUser= async (user) => {
    try {
      const emailExist= await userSchema.findOne({Email_Id:user.Email_Id})
      if (emailExist)
     {
          return {errors:true,message:"email already exists"}
      }

      else{
        let salt= await bcrypt.genSalt(10)
        const encryptedPassword= await bcrypt.hash(user.Password,salt)
      const users = await new userSchema({Name:user.Name,Email_Id:user.Email_Id,Password:encryptedPassword})
      const data = await users.save() 
      return {errors:false,data:data}
     }

    }
     catch (error) 
     {
        return {errors:true,message:error.message}
    }
}
//getMovie controller
exports.getUser= async () =>{
    try {
     const data= await userSchema.find()  
     return {errors:false,data:data}  
    } catch (error) {
       return {errors:true,message:error.message} 
    }
} 
//getone
exports.getoneUser= async (id) =>{
    try {
     const data = await userSchema.findById(id);
     
     return {errors:false,data:data}   
    } catch (error) {
       return {errors:true,message:error.message} 
    }
}

//put
exports.putUser = async (id,user) =>{
    try {
        const data = await userSchema.findByIdAndUpdate(id,user,{new:true})
        return {errors:false,data:data} 
    } catch (error) {
       return {errors:true,message:error.message} 
    }
}
//delete
exports.deleteUser= async (id)=>{
    try {
        await userSchema.findByIdAndDelete(id);
        return {errors:false,data:"deleted successfully"}
    } catch (error) {
       return {errors:true,message:error.message} 
    }
}