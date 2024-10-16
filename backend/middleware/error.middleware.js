const errorMiddleware =(error,request,response,next)=>{
    const status=error.status||500
    const message=error.message||"Backend Error"
    const extraDetails= error.extraDetails||"Error from backend"

    return response.status(status).json({message:message,extraDetails:extraDetails})
}

module.exports=errorMiddleware