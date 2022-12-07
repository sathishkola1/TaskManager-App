let mongoose=require('mongoose')
let validator=require('validator')
let taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})
taskSchema.methods.toJSON=function(){
    let taskObject=this.toObject()
    delete taskObject.owner
    delete taskObject.createdAt
    delete taskObject.updatedAt
    delete taskObject.__v
    return taskObject
}
let task=mongoose.model('Task',taskSchema)
module.exports=task