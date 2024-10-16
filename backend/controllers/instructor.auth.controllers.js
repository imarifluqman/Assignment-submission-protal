const Instructor = require("../models/instructor.model");
const bcrypt = require("bcrypt");
const Course = require('../models/course.model')

// Register a new instructor
const register = async (req, res) => {
  try {
      const { instructorName, email, phone, course, password, qualification } = req.body;

      // Validate all required fields
      if (!instructorName || !email || !phone || !course || !password || !qualification) {
          return res.status(422).json({ message: "Please fill all required fields." });
      }

      // Validate email format
      if (!/^\S+@\S+\.\S+$/.test(email)) {
          return res.status(422).json({ message: "Invalid email format." });
      }

      // Validate phone number format
      if (!/^\d{10,11}$/.test(phone)) {
          return res.status(422).json({ message: "Invalid phone number format." });
      }

      const instructorExist = await Instructor.findOne({ email });
      if (instructorExist) {
          return res.status(409).json({ message: "Email already exists." });
      }

      // Hash the password
      const salt = 10;
      const hash_password = await bcrypt.hash(password, salt);

      // Check if the course exists and is not already selected
      const getCourseStatus = await Course.findById(course, 'isSelected');
      if (!getCourseStatus) {
          return res.status(422).json({ message: "Selected course not found." });
      }

      if (getCourseStatus.isSelected === false) {
          const createInstructor = await Instructor.create({
              instructorName,
              email,
              phone,
              course,
              password: hash_password,
              qualification,
          });

          await Course.updateOne({ _id: course }, { $set: { isSelected: true } });

          return res.status(201).json({
              message: 'Registration Successful',
              instructorId: createInstructor._id.toString(),
              token: await createInstructor.generateToken(),
          });
      } else {
          return res.status(409).json({ message: 'Course already selected.' });
      }
  } catch (error) {
      res.status(500).json({ message: "Error in registering Instructor", error: error.message });
  }
};

  
  const login = async (req,res,next)=>{
      try {
          const {email,password}= req.body
          const InstructorExist= await Instructor.findOne({email})
          // console.log ('Instructor:' ,InstructorExist)
  
          if(!InstructorExist){
              // return null
            return  res.status(400).json({message:'Instructor not Exist'})
          }
          else{

              const passwordCompare= await bcrypt.compare(password,InstructorExist.password)
              passwordCompare===true?res.status(200).json({
                  message:'Login Successful',
                  token:await InstructorExist.generateToken(),
                  InstructorId:InstructorExist._id.toString()
              }):
               res.json({message:"Invalid Credentials"})
      
          }
      } catch (error) {
          // console.log(error)
          res.status(500).json({message:'Internal Server Error'})
      }
  }


// Find an instructor by ID
const findInstructorById = async (req, res) => {
  try {
    const instructorId = req.params.id;  // Get the Instructor ID from the route parameters
    const instructor = await Instructor.findById(instructorId);

    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// Find an instructor by ID
const findAndUpdateInstructorById = async (req, res) => {
  try {
    // const instructorId = req.params.id;  // Get the Instructor ID from the route parameters
    const instructor = await Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    res.status(200).json(instructor);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// Export all functions
module.exports = { register, login, findInstructorById ,findAndUpdateInstructorById };

