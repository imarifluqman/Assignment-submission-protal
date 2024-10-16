// controllers/submissionController.js
const Submission = require('../models/Submission');
const upload = require("../config/multerConfig")
// Initialize multer with storage configuration

exports.createSubmission = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'File upload failed' });
        }
        if (!req.file) {
            return res.status(400).json({ error: 'Please send file' });
        }

        const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
        console.log(req.file, "File URL:", fileUrl);

        try {
            const submission = new Submission({
                student: req.body.student,
                assignment: req.body.assignment,
                fileUrl: fileUrl,
                grade: req.body.grade,
                isGraded: req.body.isGraded
            });

            await submission.save();
            res.status(201).json({ message: 'Submission created successfully', submission });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });
};
// Get all submissions
exports.getAllSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find()
        res.status(200).json(submissions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Get  submission By id
exports.getSubmissionById = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.submissionId)
        if(!submission){
            return res.status(404).json({ message: 'Submission not found' });
        }
        res.status(200).json(submission);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get submissions by assignment  
//? part of instructor
exports.getSubmissionsByAssignment = async (req, res) => {
    try {
        const submissions = await Submission.find({ assignment: req.params.assignmentId });
        if (!submissions.length) {
            return res.status(404).json({ message: 'No submissions found for this assignment' });
        }
        res.status(200).json(submissions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get submissions by student
// ? instructor and std
exports.getSubmissionsByStudent = async (req, res) => {
    try {
        const submissions = await Submission.find({ student: req.params.studentId });
        if (!submissions.length) {
            console.log('No submissions found');
            return res.status(200).json({ message: 'No submissions found for this student' });
        }
        res.status(200).json(submissions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update a submission's grade
exports.updateSubmissionGrade = async (req, res) => {
    try {
        const submission = await Submission.findByIdAndUpdate(req.params.id, { grade: req.body.grade ,isGraded:true}, { new: true });
        if (!submission) {
            console.log('No student found')
            return res.status(404).json({ message: 'Submission not found' });
        }
        res.status(200).json({ message: 'Grade updated successfully', submission });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Get Submission status by of particular student of particular assignment
exports.getAssignmentStatus = async (req, res) => {     //will work on this ai
    try {
        // Find submissions based on student and assignment IDs
        const submissions = await Submission.find({
            student: req.params.studentId,
            assignment: req.params.assignmentId
        });

        // Check if any submissions are found
        if (submissions.length === 0) {
            console.log("Assignment not submitted");
            return res.status(200).json({ message: 'Assignment not submitted' });
        }

        // If submissions are found, return success message
        res.status(200).json({ message: 'Assignment Already Submitted' });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};