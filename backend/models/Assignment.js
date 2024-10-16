// models/Assignment.js
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    instructor:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    course:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now   
    }
});

module.exports = mongoose.model('Assignment', assignmentSchema);