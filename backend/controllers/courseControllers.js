const course = require('../models/course.model')

const courseCreation= async(req,res)=>{
 try {
    const {courseName,courseDuration} =req.body
    const courseCreated =await course.create({courseName,courseDuration})
    res.status(200).json({
        success: true,
        data: courseCreated
    });
} catch (error) {
    console.error("Error in Creating Course", error);
    // Respond with an error message
    res.status(500).json({
        success: false,
        message: 'Error in Creating Course'
    });
}
};

const getAllCourses=async(req,res)=>{
try {
    const allCourses= await course.find()
    res.status(200).json({success:true,data:allCourses})
    
} catch (error) {
    console.log("Error in getting all course",error)
    res.status(500),json({
        success:false,
        message:'Error in getting All courses'
    })
}
}

module.exports = {courseCreation,getAllCourses}