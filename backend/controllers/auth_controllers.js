// const User = require('../models/user.model')
const user = require('../models/user.model')
const bycrypt= require('bcrypt')
// const jwt = require('jsonwebtoken')

const register =async(req,res)=>{
try {
    // console.log('Request body',req.body)
    const {username,email,phone,course,password}= req.body
    
    const userExist = await user.findOne({email:email})
    if(userExist)
    {
        // console.log('Email Already Exist')
        return res.status(400).json({message:"Email already Exist"})
    }

    //Hashing password by using bycrypt 
    const salt =10
    const hash_password =await bycrypt.hash(password,salt) 
    const createUser =await user.create({username,email,phone,course,password:hash_password})
    // console.log('Requesting body after password',req.body)
    res.status(200).json({message:'Registration Successfully',userId:createUser._id.toString(),token:await createUser.generateToken()})


} catch (error) {
    // console.log('Registration Error:',error)
}
}

const login = async (req,res,next)=>{
    try {
        const {email,password}= req.body
        const userExist= await user.findOne({email})
        
        if(!userExist){
              res.status(400).json({message:'User not Exist'})
        }
        else{
            const passwordCompare= await bycrypt.compare(password,userExist.password)
            // console.log('Comparing Password',passwordCompare)
            passwordCompare===true?res.status(200).json({
                message:'Login Successful',
                token:await userExist.generateToken(),
                userId:userExist._id.toString()
            }):res.json({message:"Invalid Credentials"})
        }

    } catch (error) {
        // console.log(error)
        res.status(500).json({message:'Internal Server Error'})
    }
}



// Find an user by ID
const getUserInfo =async (req,res)=>{
  try {
      const userInfo = await user.findById(req.params.userId)
      console.log(userInfo)
  if(!userInfo){

      return res.status(400).json({message:'User not Found'})
  }
  else{
      res.status(200).json({'User':userInfo})
  }
}

catch (error) {
  console.log("Error in getting User Info",error)
  res.status(400).json({ error: error.message })
}
}  
  
  // Find an user by ID
  const findAndUpdateStudentById = async (req, res) => {
    try {
      // const userId = req.params.id;  // Get the user ID from the route parameters
      const User = await user.findByIdAndUpdate(req.params.id, req.body, { new: true });
  
      if (!User) {
        return res.status(404).json({ message: 'user not found' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  };
  

module.exports={register,login ,getUserInfo , findAndUpdateStudentById}