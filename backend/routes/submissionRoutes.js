// routes/submissionRoutes.js
const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
// const upload = require('../config/multerConfig');

router.post('/submissions',  submissionController.createSubmission); 
// router.post('/submissions', submissionController.createSubmission);

router.get('/submissions', submissionController.getAllSubmissions);
router.get('/submissions/:submissionId', submissionController.getSubmissionById);
router.get('/submissions/assignment/:assignmentId', submissionController.getSubmissionsByAssignment);
router.get('/submissions/student/:studentId', submissionController.getSubmissionsByStudent);
router.put('/submissions/:id/grade', submissionController.updateSubmissionGrade);


router.get('/submissionStatus/:studentId/:assignmentId',submissionController.getAssignmentStatus)
module.exports = router;