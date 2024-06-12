const express=require("express");
const bcrypt= require("bcryptjs");
const jwt=require('jsonwebtoken');
const router=express.Router();
const User= require('../models/User');
const fetchuser=require("../middleware/fetchuser");
const {body,validationResult}=require('express-validator');


router.post('/createuser',[
     body('name').isLength({min:3}),
     body('email').isEmail(),
     body('password').isLength({min:5}),
],async (req,res)=>{
     try{
          // if validation fails send bad request!!
          const error=validationResult(req);
          if(!error.isEmpty()){
               return res.status(400).json({statusbool:false,error:error.array()});
          }
          // if there exits a user with the eamil already then send a bad request!!
     
          let user= await User.findOne({email:req.body.email});
          if(user){
              return res.status(400).json({statusbool:false,error:`User with this email already exist ${req.body.email}`})
          }
          // below code is when no user exists
          
          //  Now, we will hash the password and also use salt and then it is stored in the database

          const salt= bcrypt.genSaltSync(10);
          const hashpass= bcrypt.hashSync(req.body.password,salt);
         
         user= await User.create({email:req.body.email,password:hashpass,name:req.body.name});
         const data={
            user:{
                 id:user.id
            }
         }
         const token=  jwt.sign(data,process.env.JWT_SECRET);
         res.json({statusbool:true,token});
     }
     catch(err){
        res.status(500).json({statusbool:false,error:"Error has occurred"});
     }
})

router.post('/login',[
     body('email').isEmail(),
     body('password').exists()
],async (req,res)=>{
   const error= validationResult(req);
        if(!error.isEmpty()){
           return res.status(400).json({statusbool:false,errors:error.array()});
        }
       const {email,password}=req.body;
     try{
       let user= await User.findOne({email});
       if(!user){
          return res.status(400).json({statusbool:false,error:"Enter correct credentials"});
       }
       const passcompare= await bcrypt.compare(password,user.password);
       if(!passcompare)
          return res.status(400).json({statusbool:false,error:"Enter correct credentials"});

       const data={
          user:{
               id:user.id
          }
       }
       const token=  jwt.sign(data,process.env.JWT_SECRET);
       res.json({statusbool:true,token:token});
     }
     catch(err){
        res.status(500).json({statusbool:false,error:err});
     }
})

// This router will give us all the details of the user when loggedin

router.post('/getuser',fetchuser,async(req,res)=>{
   try{
      const userid=req.user.id;
      console.log(req.user);
      const user= await User.findById(userid).select('-password');
      res.json({statusbool:false,user});
   }
   catch(err){
      res.status(500).json({statusbool:false,error:"Internal server error"});
   }

})


module.exports=router;









































































































// const express= require('express');
// const {body,validationResult}= require("express-validator");
// const bcrypt= require('bcryptjs');
// const jwt= require('jsonwebtoken');


// const User=require('../models/User');
// const fetchuser=require('../middleware/fetchuser');


// const router= express.Router();


// const JWT_SECTRET="Iamyashwanth!";


// //  Create a user POST 'api/auth/createuser'   Doesn't require Auth
// router.post('/createuser',[
//     body('name','Name must be atleast 5 characters').isLength({min:5}),
//     body('email','Email must be unique').isEmail(),
//     body('password','password must be atleast 5 characters').isLength({min:5})
// ], async (req,res)=>{
//     try{
//         const errors=validationResult(req);
//         // console.log(errors);
//         if(!errors.isEmpty()){
//           return res.status(400).json({errors:errors.array()});
//         }
//         let user= await User.findOne({email:req.body.email});
//         if(user) 
//         return res.status(400).json({error:"Sorry a user with this email already exists"})
//         const salt=await bcrypt.genSalt(10);
//         const secPass=await bcrypt.hash(req.body.password,salt);
//         user =  new  User({name:req.body.name,password:secPass,email:req.body.email});
//         user.save();
//         const data={id:req.body.id};
//         const token=jwt.sign(data,JWT_SECTRET);
//         res.json({token});
//     }
//     catch(err){
//         console.log(err.message);
//         res.status(500).send("Some error occured!!");
//     }
//   })

//   router.post('/login',[
//     body('email').isEmail(),
//     body('password','Password cannot be blank').isLength()
//   ],async(req,res)=>{
//     const errors=validationResult(req);
//     if(!errors.isEmpty()){
//       return res.status(400).json({errors:errors.array()});
//     }
//     const {email,password}=req.body;
//     try{
//      let user= await User.findOne({email:email});
//      if(!user)
//         return res.status(400).json({error:'Enter the correct crendentials!!'});
//      const passwordCompare= await bcrypt.compare(password,user.password);
//      if(!passwordCompare)
//         return res.status(400).json({error:'Enter the correct crendentials!!'});
//       const payload={
//         id:user.id
//       }
//       const token=jwt.sign(payload,JWT_SECRET);
//         res.json({token});

//     }
//     catch(err){
//       console.log(err.message);
//       res.status(500).send("Some error occured!!");
//     }
     
//   })

// // Get loggedin user details using post 'api/auth/getuser'

// router.post('/getuser',fetchuser,async(req,res)=>{
//    try{
//        const userid=req.user.id;
//        console.log(userid);
//        const user=await User.findById(userid).select('-password');
//        res.send(user);
//    }
//    catch(err){
//      res.status(500).send("Internal Server Error");
//    }
// })



// module.exports=router;




