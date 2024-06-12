const mongoose=require('mongoose');


const connectToMongodb= ()=>{
   mongoose.connect(process.env.MONGO_URL)
   .then(()=>{
      console.log("Database is successfully connected!!!");
   })
}


module.exports=connectToMongodb;