
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import EditModal from '../components/EditInstructorModal';

const InstructorProfile = () => {
  const navigate = useNavigate()
  const { instructorId } = useParams();
  const [instructor, setInstructor] = useState({
    // name:"Taha Ansari",
    // email:"taha@gmail.com",
    profilePicture:"data:image/png;base64,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"
  });
  const [courses, setCourses] = useState([
   ]);
   const [open,setOpen]  = useState(false)

  const fetchInstructorDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/instructor/${instructorId}`);
      setInstructor(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/courses/instructor/${instructorId}`);
      setCourses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInstructorDetails();
    fetchCourses();
  }, [instructorId]);

  if (!instructor) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-900 dark:text-gray-100 dark:bg-gray-950">
          <h1 className="text-xl md:text-5xl font-bold flex items-center">
            Loading...
          </h1>
        </div>
      </div>
    );
  }else{

    
    return (
   <>
   
   <div className='flex'>

      <div
              onClick={() => {
                navigate(
                  `/instructor/${instructorId}/dashboard`
                );
              }}
              className=" md:text-5xl md:mr-8 lg:text-7xl m-3 w-8 text-xl  lg:mr-10  "
              >
              <i className="fa-solid fa-circle-left   "></i>
            </div>

     <div className='lg:ml-64 md:ml-36 '>
     <div className="w-[600px] mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex items-center capitalize">
          <div className="mr-6">
            <img
              className="w-32 h-32 rounded-full"
              src={instructor.profilePicture ||"data:image/png;base64,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" }
              alt="Profile"
              />
          </div>
          <div>
            <h1 className="text-3xl font-bold"> Name {" :  "} {instructor?.instructorName}</h1>
            <p className="text-gray-700 lowercase"> Email {" :  "} {instructor?.email}</p>
            <p className="text-gray-700"> Phone {" : "} {instructor?.phone}</p>
            <p className="text-gray-700"> Course {" : "} {instructor?.course}</p>
            <p className="text-gray-700"> Qualification {" : "} {instructor?.qualification}</p>
            {/* <Link to={`/editInstructor/${instructorId}`}> */}
              <button onClick={()=>{setOpen(true)}} className="mt-4 inline-flex items-center gap-x-2 rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
                <i className="fa-regular fa-pen-to-square"></i>
                Edit Profile
              </button>
            {/* </Link> */}
          </div>
        </div>
      </div>

      {/* <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Courses Taught</h2>
        <table className="min-w-full bg-white shadow-xl rounded-xl">
        <thead>
        <tr className="bg-blue-gray-100 text-gray-700">
        <th className="py-3 px-4 text-left">Course Title</th>
        <th className="py-3 px-4 text-left">Start Date</th>
        <th className="py-3 px-4 text-left">End Date</th>
        <th className="py-3 px-4 text-left">Action</th>
        </tr>
        </thead>
          <tbody className="text-blue-gray-900 text-center">
          {courses.map((course) => (
            <tr key={course._id} className="border-b border-blue-gray-200">
            <td className="py-3 px-4">{course.title}</td>
            <td className="py-3 px-4">{format(new Date(course.startDate), 'dd-MM-yyyy')}</td>
            <td className="py-3 px-4">{format(new Date(course.endDate), 'dd-MM-yyyy')}</td>
            <td className="py-3 px-4">
            <Link to={`/courses/${course._id}`}>
            <button className="inline-flex items-center gap-x-2 rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold text-green-400 shadow-sm hover:bg-green-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
            <i className="fa-regular fa-eye"></i>
            View
            </button>
            </Link>
            <Link to={`/editCourse/${course._id}`}>
            <button className="inline-flex items-center gap-x-2 rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold text-gray-400 shadow-sm hover:bg-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
            <i className="fa-regular fa-pen-to-square"></i>
            Edit
            </button>
                  </Link>
                  <button
                  // onClick={() => handleDeleteCourse(course._id)}
                    className="inline-flex items-center gap-x-2 rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold text-red-400 shadow-sm hover:bg-red-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                    <i className="fa-solid fa-trash"></i>
                    Delete
                    </button>
                    </td>
                    </tr>
            ))}
          </tbody>
        </table>
        </div> */}
    </div>
</div>
       </div>
       {
        instructor.instructorName && (

          <EditModal func={{open,setOpen , instructor,fetchInstructorDetails}} />
        )
       }

   </>
  );
}
};

export default InstructorProfile;
