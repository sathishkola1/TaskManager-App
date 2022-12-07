let mongoose=require('mongoose')
let validator=require('validator')
let bcrypt=require('bcryptjs')
let jwt=require('jsonwebtoken')
let task=require('./task')
let userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is Invalid')
            }
        },
        trim:true,
        lowercase:true,
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        trim:true,
    },
    tokens:[{
            token:{
                type:String,
                required:true
            }
    }
    ],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
})
userSchema.pre('save',async function(next){
    
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,8)
    }
    next()
})

userSchema.methods.generateAuthToken= async function(){
    let token=jwt.sign({_id:this._id.toString()},process.env.JWT_SECRET)
    this.tokens=this.tokens.concat({token})
    await this.save()
    return token
}

userSchema.methods.toJSON=function(){
    let userObject=this.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    delete userObject.createdAt
    delete userObject.updatedAt
    delete userObject.__v
    return userObject
}

userSchema.statics.findByCredentials=async (email,password)=>{
    let User= await user.findOne({email})
    if(!User){
        throw new Error("Invalid Credentials")
    }
    let isMatch=await bcrypt.compare(password,User.password)
    if(!isMatch){
        throw new Error("Invalid Credentials")
    }
    return User
}

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})

userSchema.pre('remove',async function(next){
    await task.deleteMany({owner:this._id})
    next()
})

let user=mongoose.model('User',userSchema)

module.exports=user