// controllers/assignmentController.js
const Assignment = require('../models/Assignment');

// Create a new assignment
exports.createAssignment = async (req, res) => {
    try {
        const assignment = new Assignment(req.body);
        await assignment.save();
        res.status(201).json({ message: 'Assignment created successfully', assignment });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all assignments
exports.getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find();
        res.status(200).json(assignments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get an assignment by ID
exports.getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.status(200).json(assignment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an assignment
exports.updateAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.status(200).json({ message: 'Assignment updated successfully', assignment });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an assignment
exports.deleteAssignment = async (req, res) => {
    try {
        const assignment = await Assignment.findByIdAndDelete(req.params.id);
        if (!assignment) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.status(200).json({ message: 'Assignment deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get assignments by course
exports.getAssignmentsByCourse = async (req, res) => {
    try {
        const assignments = await Assignment.find({ course: req.params.courseId });
        if (!assignments.length) {
            return res.status(404).json({ message: 'No assignments found for this course' });
        }
        res.status(200).json(assignments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get assignments by instructor
exports.getAssignmentsByInstructor = async (req, res) => {
    try {
        const assignments = await Assignment.find({ instructor: req.params.instructorId });
        if (!assignments.length) {
            return res.status(404).json({ message: 'No assignments found for this instructor' });
        }
        res.status(200).json(assignments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

