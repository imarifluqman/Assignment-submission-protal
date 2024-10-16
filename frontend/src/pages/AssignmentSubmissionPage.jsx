import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import './assignment.css'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
function AssignmentSubmission() {
  const navigate =useNavigate()
const {id,assignmentId} =useParams()
const submitAssingment=async()=>{
  if(file==null){
 Swal.fire(
  {
    title:'Invalid File',
    text:'Not able to submit Empty File',
  background:'gray',
  color:'black',
  confirmButtonText: 'OK',
  confirmButtonColor: 'black',
  } 
) }
 else{
    const formData =new FormData()
    formData.append('student',id)
    formData.append('assignment',assignmentId)
    formData.append('myFile',file)
    // console.log(file)

    try {
      const response = await axios.post('http://localhost:5000/api/submissions',formData)
      console.log(response)
      if(response.status===201){
        Swal.fire({
          // position: "top-end",
          icon: "success",
          title: "Assignment submitted suceesfully!",
          showConfirmButton: false,
          timer: 1500
        });
        setSubmitMode(false)
      }
    } catch (error) {
      console.log("Error in Submitting Assignment",error)    
      }
    
  }
}


useEffect(()=>{
  submittedAssignment()
  getAssignmentDetail()
},[id,assignmentId]) 

const [submitMode,setSubmitMode] =useState(false)
const [assignmentDetail,setAssignmentDetail]= useState({})
const [file,setFile]=useState(null)
const submittedAssignment = async () => {
  try {
      
      const response = await axios.get(`http://localhost:5000/api/submissionStatus/${id}/${assignmentId}`);
      
      console.log(response.data.message)
if(response.data.message==='Assignment Already Submitted'){
  setSubmitMode(false) 
}

else{
  setSubmitMode(true)
}
      // if(response.data.message==='No submissions found for this student'){
      //   setSubmitMode(true)
      // }
  } catch (error) {
    console.log("Error in submission", error)
  }
}

const getAssignmentDetail = async()=>{
    try {
      const response = await axios.get(`http://localhost:5000/api/assignments/${assignmentId}`)
      // console.log(response.data)
        setAssignmentDetail(response.data)
      
    } catch (error) {
      // console.log("Error in Getting Assignment Detail :" ,error)
    }
  }

  const handleFileChange=(e)=>{
    const selectedFile= e.target.files[0]
    console.log(selectedFile)
    setFile(selectedFile)
  }



  return (
<>{
  submitMode?<div>
    <div style={{cursor:"pointer"}}
              onClick={() => {
                navigate(
                  `/${id}/assignments`
                );
              }}
              className=" md:text-5xl md:mr-8 lg:text-7xl m-3 w-8 text-xl  lg:mr-10  "
              >
              <i className="fa-solid fa-circle-left   "></i>
            </div>
  {/* <h1 className='container mt-3' style={{textAlign:'center'}}>Assignment Submission</h1> */}
  <img src="https://3.bp.blogspot.com/-hk48mQjm8AQ/V9ZkmUsR9zI/AAAAAAAAGhU/EO6Z1sQQZEINse-OMDTUogD-WlyZaqMpACLcB/s1600/Assignment1.png" style={{width:'100%',height:'25vh'}} alt="" />
<div  style={{display:'flex',justifyContent:'center',alignItems:"center",height:'75vh'}}>
    <div className='mainDiv' style={{color:"white" ,boxShadow:'0px 4px 10px rgba(5,50,2,3)',height:'70vh',width:'80vw',borderRadius:'10px',fontSize:'large'}}        >
      <h1 className='mt-3' style={{textAlign:"center",textTransform:"uppercase"}}>{assignmentDetail?.title}</h1>
    <br />
    <span>Description :</span> 
    <span>&nbsp;{assignmentDetail?.description}</span>
    <br /><br />
    <span>Due Date :</span> 
    <span>&nbsp; {assignmentDetail?.dueDate}</span>
<br />
<br />
    <div className="mt-3">
  <label htmlFor="formFile" className="form-label" >Upload File :</label>
  <input className="form-control" name='file' style={{width:'78vw',marginLeft:'1vw'}} type="file" id="formFile"
  onChange={handleFileChange}
  />
</div>

<br />
<div style={{display:"flex",justifyContent:'center'}}>
<button  style={{justifyContent:'center',alignItems:'center'}} id='submitButton' onClick={()=>submitAssingment()} className='btn btn-lg  '>Submit</button>
</div>
    </div>
</div>
</div>:
<div>
<div style={{cursor:"pointer"}}
              onClick={() => {
                navigate(
                  `/${id}/assignments`
                );
              }}
              className=" md:text-5xl md:mr-8 lg:text-7xl m-3 w-8 text-xl  lg:mr-10  "
              >
              <i className="fa-solid fa-circle-left   "></i>
            </div>

<div className='m-9  '>  
        <div className='bg-green-100 h-80  w-[800px]  flex  flex-col justify-center'>
             <h1 className='font-extrabold text-4xl text-center text-gray-800  '>Assignment</h1>
            <h1 className='font-extrabold text-4xl text-center text-gray-800  '>Already </h1>
            <h1 className='font-extrabold text-4xl text-center text-gray-800  '>Submitted </h1>
            
        </div>
        </div>
        </div>
}

</>
  )
}

export default AssignmentSubmission