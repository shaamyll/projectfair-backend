const users = require('../Models/userSchema')
const jwt = require('jsonwebtoken')



//register logic
exports.registerAPI=async(req,res)=>{
    console.log("Inside the register API");
    const {username,email,password} = req.body
    const existingUser = await users.findOne({email})    

    if(existingUser){
        res.status(402).json({message:"User Already existing.."})
    }
    else{
        const newUser = new users({
            username:username,
            email:email,
            password:password,
            github:"",
            linkedIn:"",
            profilePic:""
        })

        await newUser.save()
        res.status(200).json("Register successfull...")
    }
}




//login logic
exports.loginAPI=async(req,res)=>{
    console.log("Inside the login API");
    const {email,password} = req.body

    const existingUser = await users.findOne({email,password})


  try{

    if(existingUser){

        const token = jwt.sign({userId:existingUser._id},process.env.jwtKey)
        console.log(token);
        
        res.status(200).json({currentUser:existingUser,token})
    }
    else{
       
        res.status(402).json("Invalid User Details")
    }
  }
  catch(err){
    res.status(401).json(err)
  }
}





