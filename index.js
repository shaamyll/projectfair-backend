//backend creation

//1 Load .env file
require('dotenv').config()


//2 import express
const express = require('express')

//6 import cors
const cors = require('cors')
const db = require('./DB/connection')
const router = require('./Routes/router')
const ApplicationMiddleware = require('./Middlewares/ApplicationMiddleware')


//3 Create an application using express
const pfserver = express()

//8 use cors
pfserver.use(cors())
pfserver.use(express.json())
// pfserver.use(ApplicationMiddleware)
pfserver.use(router)

//export image from backend to frontend
pfserver.use('/uploads', express.static('./uploads'))



//4 Define port
const PORT = 3000 || process.env.PORT


//5 Run the server
pfserver.listen(PORT,()=>{
    console.log("pfserver is running on the port" +PORT);
    
})


pfserver.get('/',(req,res)=>{
    console.log("Welcome to PF server");
    res.send("Welcome to PF server")
})

