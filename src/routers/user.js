let express=require('express')
let user=require('../models/user')
let auth=require('../middleware/auth')
let router=new express.Router()
// let multer=require('multer')
let sharp=require('sharp')
const { contentType } = require('express/lib/response')

// let upload=multer({
//     limits:{
//         fileSize:1000000
//     },
//     fileFilter(req,file,cb){
//         if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
//             return cb(new Error('Please Upload an Image'))
//         }
//         cb(undefined,true)
//     }
// })

router.get('/api/users/me',auth,async (req,res)=>{
    res.send(req.User)
})

router.post('/api/users',async(req,res)=>{
    let newUser=new user(
        req.body
    )
    try {
        await newUser.save()
        //let token=await newUser.generateAuthToken()
        res.send({status:'OK'})
    } catch (error) {
        res.send({status:'ERROR',error})
    }  
})

router.post('/api/users/login',async(req,res)=>{
    try {
        let User=await user.findByCredentials(req.body.email,req.body.password)
        let token=await User.generateAuthToken()
        res.send({status:'OK',token})
    } catch (error) {
        res.send({status:'ERROR',error})
    }
})

router.post('api/users/logout',auth,async (req,res)=>{
    try {
        req.User.tokens=req.User.tokens.filter((token)=>token.token!==req.token)
        await req.User.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/logoutAll',auth,async (req,res)=>{
    try {
        req.User.tokens=[]
        await req.User.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
})

// router.post('/users/me/avatar',auth,upload.single('avatar'),async(req,res)=>{
//     let buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
//     req.User.avatar=buffer
//     await req.User.save()
//     res.send()
// },(err,req,res,next)=>{
//     res.status(400).send({error:err.message})
// })

router.delete('/users/me/avatar',auth,async(req,res)=>{
    req.User.avatar=undefined
    await req.User.save()
    res.send()
})

router.get('/users/:id/avatar',async(req,res)=>{
    try {
        let User=await user.findById(req.params.id)
        if(!User || !User.avatar){
            throw new Error()
        }
        res.set('Content-Type','image/png')
        res.send(User.avatar)
    } catch (error) {
        res.status(404).send()
    }
})

router.patch('/users/me',auth,async(req,res)=>{
    try {
        let updates=Object.keys(req.body)
        updates.forEach((update)=>req.User[update]=req.body[update])
        await req.User.save()
        res.send(req.User)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/users/me',auth,async(req,res)=>{
    try {
        await req.User.remove()
        res.status(200).send(req.User)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports=router