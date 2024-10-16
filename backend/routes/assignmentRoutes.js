// routes/assignmentRoutes.js
const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
 
router.post('/assignments', assignmentController.createAssignment);
router.get('/assignments', assignmentController.getAllAssignments);
router.get('/assignments/:id', assignmentController.getAssignmentById);
router.put('/assignments/:id', assignmentController.updateAssignment);
router.delete('/assignments/:id', assignmentController.deleteAssignment);
router.get('/assignments/course/:courseId', assignmentController.getAssignmentsByCourse);
router.get('/assignments/instructor/:instructorId', assignmentController.getAssignmentsByInstructor);


module.exports = router;
