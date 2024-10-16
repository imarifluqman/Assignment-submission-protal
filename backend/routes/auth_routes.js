const express= require('express')
const routes = express.Router()
const controllers= require('../controllers/auth_controllers')
const instructorControllers = require('../controllers/instructor.auth.controllers')
const validate= require('../middleware/validate.middleware')
const {signupSchema}= require('../validator/auth.validator')
const {loginSchema}= require('../validator/auth.validator')
const {instructorSignUp} =require('../validator/auth.validator')

routes.route('/register').post(validate(signupSchema),controllers.register)
routes.route('/login').post(validate(loginSchema),controllers.login)

routes.get('/:userId', controllers.getUserInfo);
routes.put('/user/:id', controllers.findAndUpdateStudentById);




routes.get('/instructor/:id', instructorControllers.findInstructorById);
routes.put('/instructor/:id', instructorControllers.findAndUpdateInstructorById);


routes.route('/instructorRegister').post(validate(instructorSignUp), instructorControllers.register)
routes.route('/instructorLogin').post(validate(loginSchema), instructorControllers.login)

module.exports=routes