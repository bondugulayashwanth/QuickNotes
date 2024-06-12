const jwt= require('jsonwebtoken');



module.exports=(req,res,next)=>{
      const token=req.header('token');
      if(!token)
        return res.status(401).json({error:"Please authenticate with valid token"})
      try{
        const data=jwt.verify(token,process.env.JWT_SECRET);
        // here data is actually id of the user
        if(!data){
          res.send(500).json({error:"Authenticate with correct token"});
        }
        req.user=data.user;
        next();
      }
      catch(err){
        res.status(401).json({error:err.message});
      }
}