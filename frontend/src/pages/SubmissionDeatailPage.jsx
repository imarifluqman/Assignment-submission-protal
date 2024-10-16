import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

const SubmissionDeatailPage = () => {
    const { submissionId,assignmentId ,instructorId} = useParams(); // Get submission ID from URL parameters

    const navigate = useNavigate();
    const [submission, setSubmission] = useState(null);
    const [grade, setGrade] = useState('');
    const [assignment,setAssignment] = useState(null)
  
    const handleGetSubmission = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/submissions/${submissionId}`);
        setSubmission(response.data);
        setGrade(response.data.grade || '');
      } catch (error) {
        console.error(error);
      }
    };
    const handleGetAssignment =  async()=>{
      try {
        const response = await axios.get(`http://localhost:5000/api/assignments/${assignmentId}`)
        setAssignment(response.data)
      } catch (error) {
        console.error(error)
      }

    }
  
    useEffect(() => {
      handleGetSubmission();
      handleGetAssignment()
    }, [submissionId,assignmentId]);
  
    const handleGradeSubmit = async (e) => {
      e.preventDefault();
      try {
        await axios.put(`http://localhost:5000/api/submissions/${submissionId}/grade`, {
          grade
        });
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Grade saved suceesfully!",
          showConfirmButton: false,
          timer: 1500
        });
      handleGetSubmission();

      } catch (error) {
        console.error(error);
        alert('Error saving grade and comments.');
      }
    };
  
    if (!submission||!assignment) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-gray-900 dark:text-gray-100 dark:bg-gray-950">
            <h1 className="text-xl md:text-5xl font-bold flex items-center">
              Loading...
            </h1>
          </div>
        </div>
      );
    }
  
    return (
      <>
      <div className='flex'>

      <div
              onClick={() => {
                navigate(
                  `/instructor/${instructorId}/assignments/${assignmentId}/submissions/`
                );
              }}
              className=" md:text-5xl md:mr-8 lg:text-7xl m-3 w-8 text-xl  lg:mr-10  "
              >
              <i className="fa-solid fa-circle-left   "></i>
            </div>

     <div className='lg:ml-64 md:ml-36 '>
       
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Submission Details</h1>
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <p className="mb-4 text-lg"><strong className='mx-1' >Student Name:</strong> {submission.student}</p>
          <p className="mb-4 text-lg"><strong className='mx-1' >Assignment Title:</strong> {assignment.title}</p>
          <p className="mb-4 text-lg"><strong className='mx-1' >Assignment Description:</strong> {assignment.description}</p>
          <p className="mb-4 text-lg"><strong className='mx-1' >Submitted At:</strong> {format(new Date(submission.submittedAt), 'dd-MM-yyyy')}</p>
          <p className="mb-4 text-lg"><strong className='mx-1' >Status</strong> {
            submission.isGraded?(
              
              <span className=" bg-origin-border p-2 m-2 border-4 border-dotted  bg-gradient-to-r from-sky-500 to-indigo-500 text-center rounded-2xl text-white font-semibold " >Graded</span>
            ):
                            (
                                
                              <span className=" bg-origin-border p-2 m-2 border-4 border-dotted  bg-gradient-to-r from-rose-500 to-red-600 text-center rounded-2xl text-white font-semibold " >Not Graded</span>
                            )
                          }</p>
          <p className="mb-4 text-lg"><strong className='mx-1' >Submission File:</strong> <a href={submission.fileUrl} className='text-blue-800 underline' target="_blank" rel="noopener noreferrer">Download</a></p>
        </div>
        <form onSubmit={handleGradeSubmit} className="bg-white shadow-md rounded-lg p-4">
          <div className="mb-4">
            <label className="block text-gray-700">Grade</label>
            <input 
              type="number" 
              name="grade" 
              value={grade} 
              onChange={(e) => setGrade(e.target.value)} 
              className="w-full mt-1 p-2 border rounded-lg"
              required
              />
          </div>
          
          <button 
            type="submit" 
            className="inline-flex items-center gap-x-2 rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
          >
            Save Grade
          </button>
        </form>
      </div>
      </div>
            </div>
      </>
    );
}

export default SubmissionDeatailPage