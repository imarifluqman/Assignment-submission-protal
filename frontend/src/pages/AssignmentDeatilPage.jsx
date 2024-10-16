import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { useParams } from 'react-router-dom'
import Example from '../components/modal'
import EditModal from '../components/EditModal'
import Swal from 'sweetalert2'

const AssignmentDeatilPage = () => {
  let {assignmentId,instructorId} = useParams()
  const [assignment,setAssignment] = useState(null)
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const handleDelete = async()=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async(result) => {
      if (result.isConfirmed) {
        
        try {
         const response = await  axios.delete(`http://localhost:5000/api/assignments/${assignmentId}`)
         console.log(response);
         Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        //  handleGetAssignments()
         navigate(`/instructor/${instructorId}/assignments`)
          
        } catch (error) {
          console.error(error);
          
        }
      }
    });
    }
    const handleGetAssignment = async ()=>{
        try {
           const response = await axios.get(`http://localhost:5000/api/assignments/${assignmentId}`)
           console.log(response.data);
           setAssignment(response.data)
           
        } catch (error) {
            console.error(error);
            
        }
    }
    useEffect(()=>{
handleGetAssignment()
    },[])
  return (
    <>
     <div className="flex justify-between items-start">

    <div  onClick={()=>{navigate(`/instructor/${instructorId}/assignments`)}}  className=' text-7xl m-3 w-8'  >
    <i className="fa-solid fa-circle-left   "></i>
    </div>

</div>
    {assignment&&(<div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{assignment.title}</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <p className="mb-2"><strong>Description:</strong> {assignment.description}</p>
        <p className="mb-2"><strong>Course:</strong> {assignment.course}</p>
        <p className="mb-2"><strong>Instructor:</strong> {assignment.instructor}</p>
        <p className="mb-2"><strong>Due Date:</strong> {assignment.dueDate}</p>
        <p className="mb-2"><strong>Created At:</strong> {format(new Date(assignment.createdAt), 'dd-MM-yyyy')}</p>
        <div className="flex space-x-4 mt-4">
          {/* <Link to={`/editAssignment/${assignment._id}`}> */}
            <button onClick={()=>{setOpen(true)}} className="inline-flex items-center gap-x-2 rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold text-gray-400 shadow-sm hover:bg-gray-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
              <i className="fa-regular fa-pen-to-square"></i>
              Edit
            </button>
          {/* </Link> */}
          <button 
            onClick={handleDelete} 
            className="inline-flex items-center gap-x-2 rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold text-red-400 shadow-sm hover:bg-red-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600">
            <i className="fa-solid fa-trash"></i>
            Delete
          </button>
          <button 
            onClick={()=>{navigate(`/instructor/${instructorId}/assignments/${assignmentId}/submissions`)}} 
            className="inline-flex items-center gap-x-2 rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold text-green-400 shadow-sm hover:bg-green-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
            <i className="fa-regular fa-eye"></i>
            Veiw Submissions
          </button>
        </div>
      </div>
    <EditModal  func={{open,setOpen,handleGetAssignment,assignment}} />

    </div>)}
    </>
  )
}

export default AssignmentDeatilPage