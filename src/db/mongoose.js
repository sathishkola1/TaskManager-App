let mongoose=require('mongoose')
let user=require('../models/user')
let task=require('../models/task')
require('dotenv').config()
let url=process.env.MONGODB
mongoose.connect(url,{
    useNewUrlParser:true
})


