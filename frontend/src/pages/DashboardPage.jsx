import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const DashboardPage = () => {
  let {instructorId} = useParams()
console.log(instructorId);
const  [data,setData] = useState(null)


const handleGetInstructorData = async()=>{
  try {
    const response = await axios.get(`http://localhost:5000/api/auth/instructor/${instructorId}`)
    // console.log(response);
    setData(response.data)
    
  } catch (error) {
    console.error(error)
  }
  
}

useEffect(()=>{

  handleGetInstructorData()

},[instructorId])
  
  return (
    <div className='flex justify-center '>  
        <Sidebar  />
        <div className='  '>
        
        <div className='m-9  '> <h1 className='text-7xl text-gray-800'>Hey ! , {data? data.instructorName : "instructor"}</h1></div> 
        <div className='bg-green-100 h-80  w-[800px]  flex  flex-col justify-center'>
             <h1 className='font-extrabold text-4xl text-center text-gray-800  '>Wellcome </h1>
            <h1 className='font-extrabold text-4xl text-center text-gray-800  '>To </h1>
            <h1 className='font-extrabold text-4xl text-center text-gray-800  '>Assignment </h1>
            <h1 className='font-extrabold text-4xl text-center text-gray-800  '>Submission</h1>
            <h1 className='font-extrabold text-4xl text-center text-gray-800  '>Portal</h1>
        </div>
        </div>
    </div>
  )
}

export default DashboardPage