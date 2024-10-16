// models/Submission.js
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.ObjectId,
        ref: 'Student',
        required: true
    },
    assignment: {
        type: mongoose.Schema.ObjectId,
        ref: 'Assignment',
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    grade: {
        type: Number,
        default: null
    },
    isGraded: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Submission', submissionSchema);