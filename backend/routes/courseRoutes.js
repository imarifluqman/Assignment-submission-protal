const express= require('express')
const routes = express.Router()
const controllers= require('../controllers/courseControllers')


routes.route('/courseCreation').post(controllers.courseCreation)
routes.route('/getAllCourses').get(controllers.getAllCourses)

module.exports=routes