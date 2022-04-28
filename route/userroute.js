const auth = require("../middleware/auth")
const{createUser,getUser,getoneUser,putUser,deleteUser}=require("../controller/usercontroller");
const{login}=require("../controller/loginController")
const usermodel=require("../db/userdb")
const router=require("express").Router();
router.post("/insert", async (req,res)=>{
 try {
   const result = await createUser(req.body)  
   if(result.errors){
       res.status(404).json({errors:true,message:result.message})
   }
   else{
       res.status(200).json({errors:false,data:result.data})
   }
 } catch (error) {
    res.status(400).json({message:error.message}) 
 }

})

//login
router.post("/login", async (req,res)=>{
    try {
      const result = await login(req.body)  
      if(result.errors){
          res.status(404).json({errors:true,message:result.message})
      }
      else{
          res.status(200).json({errors:false,data:result.data})
      }
    } catch (error) {
       res.status(400).json({message:error.message}) 
    }
   
   })

router.get("/get", auth, async (req,res)=>{
   try {
    const result = await getUser() 
    if(result.errors){
        res.status(404).json({errors:true,message:result.message})
    }
    else{
        res.status(200).json({errors:false,data:result.data})
    } 
   } catch (error) {
    res.status(400).json({message:error.message})  
   }
})

router.get("/getone/:id", async (req,res)=>{
    try {
        const id = req.params.id;
        const result = await getUser(id,req.body) 
        if(result.errors){
            res.status(404).json({errors:true,message:result.message})
        }
        else{
            res.status(200).json({errors:false,data:result.data})
        }  
    } catch (error) {
      res.status(400).json({message:error.message}) 
    }
 })

router.put("/put/:id", async (req,res)=>{
    try {
        const id = req.params.id;
        const result = await putUser(id,req.body) 
        
        if(result.errors){
            res.status(404).json({errors:true,message:result.message})
        }
        else{
            res.status(200).json({errors:false,data:result.data})
        } 
       
   } catch (error) {
    res.status(400).json({message:error.message}) 
   }
    
})
router.delete("/delete/:id" , async (req,res)=>{
 try {
     const id = req.params.id;
  const result =  await deleteUser(id) 
    if(result.errors){
        res.status(404).json({errors:true,message:result.message})
    }
    else{
        res.status(200).json({errors:false,data:result.data})
    } 
 } catch (error) {
    res.status(400).json({errors:true, message:error.message})   
 }
})


module.exports = router;