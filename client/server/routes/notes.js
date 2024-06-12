const express=require("express");
const {body,validationResult}=require("express-validator");
const Notes=require("../models/Notes");
const fetchuser=require("../middleware/fetchuser");



const router= express.Router();

router.get('/fetchallnotes',fetchuser,async(req,res)=>{
       try{
        const userid=req.user.id;
        const notes= await Notes.find({user:userid});
        res.json(notes);
       }
       catch(error){
         res.status(500).json({error:"Internal server error"});
       }
})

router.post('/addnote',fetchuser,[
    body('title').isString(),
    body('description').isString()
],async(req,res)=>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.json({error:"Failed to add the note!"});
    }
    try{
      const {title,description,tag}=req.body;
      const  notes= new Notes({user:req.user.id,title,description,tag});
      const addednotes = await notes.save();
      res.json(addednotes);

    }
    catch(err){
      res.json({error:err,message:"Error occured cannot add the notes"});
    }
})


router.put("/updatenote/:id",fetchuser,async(req,res)=>{
      try{
        const {id}=req.params;
        const notes=await Notes.findById(id);
        const {title,description,tag}=req.body;
        if(!notes){
           return res.status(500).json({error:"Notes doesn't Exists"});
        }
        const notesfound=await Notes.findByIdAndUpdate(id,{title,description,tag});
        res.json(notesfound);
      }
      catch(err){
         res.status(500).json({error:err.message});
      }   
})

router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
    try{
        const {id}=req.params;
        const  notes=await Notes.findById(id);
        const {title,description,tag}=req.body;
        if(!notes){
           return res.status(500).json({error:"Notes doesn't Exists"});
        }
        if(notes.user.toString()!==req.user.id){
            return res.status(401).send("Not Allowed")
        }
        const deletednotes=await Notes.findByIdAndDelete(id);
        res.json(deletednotes);
      }
      catch(err){
         res.status(500).json({error:err.message});
      }
})

module.exports=router;





























































// const express= require('express');
// const router= express.Router();
// const Notes=require('../models/Notes');
// const fetchuser=require('../middleware/fetchuser');
// const {body, validationResult}=require('express-validator');


// //Get all the notes from the database to client side;

// router.get('/fetchallnotes',fetchuser,async(req,res)=>{
//     try{

//     }
//     catch(err){
//         res.status()
//     }
// })


// //Post request to add notes


// router.post('/addnote',fetchuser,[
//     body('title').isString(),
//     body('description').isString(),
// ], async(req,res)=>{
//      try{
//          const valerror=validationResult(req);
//          if(!valerror.isEmpty()){
//           return  res.status(500).send({error:"Information is missing"});
//          }
//          const {title,description,tag}=req.body;
//         //  console.log(title,description,tag);
//          const notes= new Notes({user:req.user.id,title,description,tag});
//          const savednotes=await notes.save();
//          res.json(savednotes);    
//      }
//      catch(error){
//         console.log(error);
//         res.status(404).json({error:"Something is wrong"});
//      }
// })


// //Updating the existing notes

// router.put('/updatenote/:id',fetchuser,[
//     body('title').isString(),
//     body('description').isString(),
//     body('tag').isString(),
// ],async(req,res)=>{
//     try{
//         const valerror=validationResult(req);
//          if(!valerror.isEmpty()){
//           return  res.status(500).send({error:"Information is missing"});
//          }
//         const {id}=req.params;
//         const {title,description,tag}=req.body;
//         const updatednotes = await Notes.findByIdAndUpdate(id,{title:title,description:description,tag:tag});
//         res.send(updatednotes);
//     }
//     catch(error){
//          res.status(500).json("Error has occurred");
//     }
// })

// //Deleting the notes if exits in the notes database


// router.delete('/deletenote/:id',fetchuser,async(req,res)=>{
      
//        try{
//         const {id}=req.params;
//         let delnotes=await Notes.findById(id);
//         if(!delnotes) return res.status(401).send("Not Allowed");
//         delnotes = await Notes.findByIdAndDelete(id);
//         res.json({"success":"delete successfull",note:delnotes});
//        }
//        catch(error){
//         console.log(error);
//          res.status(500).json('Internal Server Error');
//        }
// })


// module.exports=router;