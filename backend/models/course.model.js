const mongoose = require('mongoose')
const courseModel = new mongoose.Schema({
    courseName:{
        type :String,
        require:true
    },
    courseDuration:{
        type:String,
        require:true
    },
    isSelected:{
        type:Boolean,
        default:false
    }
})

const course = new mongoose.model('Course',courseModel)
module.exports=course