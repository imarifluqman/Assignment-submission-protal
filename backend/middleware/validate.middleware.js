const {z} =require('zod')

const validate=(schema)=>async(req,res,next)=>{
try {
    const parseBody = await schema.parseAsync(req.body)
    req.body=parseBody
    next()
} catch (error) {
    console.log(error)
    const status= 422
    const extraDetails=error.errors[0].message
    const message= 'Fill the input properly'
    const Error={
        status,message,extraDetails
    }
    console.log(Error)
    next(Error)
}
}

module.exports=validate