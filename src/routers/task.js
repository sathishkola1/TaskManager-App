let express=require('express')
let router=new express.Router()
let task=require('../models/task')
let user=require('../models/user')
let auth=require('../middleware/auth')

router.get('/api/tasks',auth,async (req,res)=>{
    let match={}
    let sortOptions={}
    if(req.query.completed){
        match.completed=req.query.completed==='true'
    }
    if(req.query.sortBy){
        let parts=req.query.sortBy.split(':')
        sortOptions[parts[0]]=parts[1]==='desc'?-1:1
    }
    let pageSkip=parseInt(req.query.skip) || 0
    let pageLimit=parseInt(req.query.limit) || 10
    try {
        let tasks=await task.find({...match,owner:req.User._id}).limit(pageLimit).skip(pageLimit*pageSkip).sort(sortOptions)
        //await req.User.populate('tasks').exec()
        res.send(tasks)
    } catch (error) {
        res.status(500).send()
    }
})


router.get('/tasks/:id',auth,async (req,res)=>{
    let _id=req.params.id
    try {
        let Task=await task.findOne({_id,owner:req.User._id})
        if(!Task){
            return res.status(404).send()
        }
        res.send(Task)
    } catch (error) {
        res.status(500).send()
    }
})


router.post('/api/tasks',auth,async (req,res)=>{
    console.log(req.body)
    let newTask=new task({
        ...req.body,
        owner: req.User._id
    })
    try {
        await newTask.save()
        res.status(201).send(newTask)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/api/tasks/:id',auth,async(req,res)=>{
    try {
        let updates=Object.keys(req.body)
        let Task=await task.findOne({_id:req.params.id,owner:req.User._id})
        if(!Task){
            return res.status(404).send()
        }
        updates.forEach((update)=>Task[update]=req.body[update])
        await Task.save()
        res.send(Task)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/api/tasks/:id',auth,async(req,res)=>{
    try {
        let Task=await task.findOneAndDelete({_id:req.params.id,owner:req.User._id})
        if(!Task){
            return res.status(404).send()
        }
        res.status(200).send(Task)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports=router