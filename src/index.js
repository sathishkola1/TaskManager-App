let express=require('express')
let cors = require("cors");
require('./db/mongoose')
let userRouter=require('./routers/user')
let taskRouter=require('./routers/task')
let path=require('path')
let app=express();
require('dotenv').config()
let port=process.env.PORT
app.use(express.json())
app.use(cors());
app.use(express.static(path.join(__dirname, '../build')));
app.use(userRouter)
app.use(taskRouter)
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});
app.listen(port,()=>{
    console.log("Server started")
}) 