import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./assignment.css"
import axios from 'axios' 
import StudentAssignmentModal from '../components/StudentAssignmentModal.jsx'
import { format } from 'date-fns'
export default function StudentAssignmentListingPage() {
 const {id} = useParams() 
 const [assignmentsArray,setAssignmentsArray]= useState([])
const [isModalOpen,setModalOpen]= useState(false)
const [courseId, setCourseId] = useState('');
const [selectedAssignment,setSelectedAssignment]=useState(null)
const navigate = useNavigate()

// Fetch student info when the component mounts
useEffect(() => {
  getStudentInfo();
}, []);

// Fetch assignments when the courseId is updated
useEffect(() => {
  if (courseId.length>0) {
    console.log("Course Id",courseId)
    getAllAssignment();
  }
}, [courseId]);

const getStudentInfo = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/api/auth/${id}`);
    console.log(response);
    
    if (response.status === 200) {
    //   console.log(response.data.User);
    //   console.log(response.data.User.course);
      setCourseId(response.data.User.course); // This will trigger the useEffect for fetching assignments
    }
  } catch (error) {
    console.log("Error in getting student Info", error);
  }
};

const getAllAssignment = async () => {
  try {
    if (courseId) {
      const response = await axios.get(`http://localhost:5000/api/assignments/course/${courseId}`);
      if (response.status === 200) {
        console.log(response.data);
        setAssignmentsArray(response.data);
      } else {
        console.log('Problem in getting Assignment');
      }
    }
  } catch (error) {
    console.log(error.response.data.message)
    if(error.response.data.message==='No assignments found for this course'){
            setAssignmentsArray([])
    }
    // console.log('Error in fetching Assignment data', error);
  }
};


const handleOpenModal = (assignment)=>{
    setSelectedAssignment(assignment)
    setModalOpen(true)
}

const handleCloseModal = ()=>{
    setModalOpen(false)
    setSelectedAssignment(null)
}

    return (
        <>


<div  onClick={()=>{navigate(`/dashboard/${id}`)}}  className=' text-7xl m-3 w-8'  >
    <i className="fa-solid fa-circle-left   "></i>
    </div>

    <div className='container mt-3'>
        <h1 style={{textAlign:'center',fontWeight:'bold'}}>Assignments</h1>
        <br />
   <br />
    <table className='table table-bordered'> 
                <thead>
                <tr>
                    <th scope='col'>#</th>
                    <th scope='col'>Title</th>
                    <th scope='col'>Issue Date</th>
                    <th scope='col'>Due Date</th>
                    <th scope='col'>Status</th>

                </tr>
                </thead>
               <tbody>
                {
                    assignmentsArray.map((currentElement,currentIndex)=>{
                        return(
                        <tr key={currentIndex}>
                            <td>{currentIndex+1}</td>
                            <td>{currentElement.title}</td>
                            <td>{format(new Date(currentElement.createdAt), 'dd-MM-yyyy')}</td>
                            <td>{currentElement.dueDate}</td>
                            <td>
                                <button className='btn btn-primary btn-outline-md' onClick={()=>handleOpenModal(currentElement)}
                            style={{borderRadius:'10%'}} >See Details</button></td>
                        </tr>   
                    )
                    })                    
                }
                </tbody>
                </table>

                 {/* Render the modal component */}
     <StudentAssignmentModal
        id={id}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        assignment={selectedAssignment}
      />

    </div>
    </>
  )
}