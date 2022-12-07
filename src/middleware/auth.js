let jwt=require('jsonwebtoken')
let user=require('../models/user')
let auth=async(req,res,next)=>{
    try {
        let token=req.header('Authorization').replace('Bearer ','')
        let decoded=jwt.verify(token,process.env.JWT_SECRET)
        let User=await user.findOne({_id:decoded._id,'tokens.token':token})
        if(!User){
            throw new Error()
        }
        req.token=token
        req.User=User
        next()
    } catch (error) {
        res.status(401).send({error:"Please Authenticate"})
    }
}
module.exports=auth