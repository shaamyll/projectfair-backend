const ApplicationMiddleware = (req,res,next)=>{
    console.log("Inside Application Middlewares");
    next()
}

module.exports=ApplicationMiddleware