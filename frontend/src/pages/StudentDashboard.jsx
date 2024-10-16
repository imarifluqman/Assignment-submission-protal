import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Dashboard() {

const {id} = useParams()
const navigate = useNavigate()
const  [data,setData] = useState(null)


const handleGetStudentData = async()=>{
  try {
    const response = await axios.get(`http://localhost:5000/api/auth/${id}`);
    if (response.status === 200) {
      console.log(response);
      setData(response.data.User)

      }
  } catch (error) {
    console.log("Error in getting student Info", error);
  }
  
}

// const getStudentInfo = async () => {
// };

useEffect(()=>{

  handleGetStudentData()

},[id])





const handleLogout = ()=>{
  localStorage.removeItem("studentId")
  navigate(`/`)
}


    return (
<>
<div className='flex justify-center '  >
      {/* <h1>This is ID  :{id}</h1> */}
      <div >
      <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-white h-full text-gray-600 transition-all duration-300 border-none z-10 sidebar">
        <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
          <ul className="flex flex-col py-4 space-y-1">
            <li>
              <a
                // href="#"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-green-500 text-gray-600 hover:text-white border-l-4 border-transparent"
              >
                {/* <!-- Icono Home de Font Awesome --> */}
                <span className="inline-flex justify-center items-center ml-4">
                  <i className="fas fa-home"></i>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Dashboard
                </span>
              </a>
            </li>
            <li 
            onClick={()=>{navigate(`/${id}/assignments`)}}
            >
              <a
                // href='#'
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-green-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
              >
                {/* <!-- Icono Check Circle de Font Awesome --> */}
                <span className="inline-flex justify-center items-center ml-4">
                <i class="fa-solid fa-file-lines"></i>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Assignment Managment
                </span>
              </a>
            </li>
            {/* <li onClick={()=>{navigate(`/instructor/${instructorId}/submissions`)}}  >
              <a
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-green-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
              >
                <span className="inline-flex justify-center items-center ml-4">
                <i class="fa-solid fa-upload"></i>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Submission Managment
                </span>
              </a> */}
            {/* </li> */}
            <li onClick={()=>{navigate(`/profile/${id}`)}}>
              <a
                // href="#"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-green-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
              >
                {/* <!-- Icono Store de Font Awesome --> */}
                <span className="inline-flex justify-center items-center ml-4">
                <i class="fa-solid fa-user"></i>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Profile
                </span>
              </a>
            </li>
            <li 
            onClick={()=>{handleLogout()}}>
              <a
                // href="#"
                className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-green-500 text-gray-600 hover:text-gray-800 border-l-4 border-transparent"
              >
                {/* <!-- Icono Sign Out de Font Awesome --> */}
                <span className="inline-flex justify-center items-center ml-4">
                  <i className="fas fa-sign-out-alt"></i>
                </span>
                <span className="ml-2 text-sm tracking-wide truncate">
                  Sign Out
                </span>
              </a>
            </li>
          </ul>
         
        </div>
      </div>
    </div>

<div>
    <div className='m-9  '> <h1 className='text-7xl text-gray-800'>Hey ! , { data? data.username : "Student"}</h1></div> 
        <div className='bg-green-100 h-80  w-[800px]  flex  flex-col justify-center'>
             <h1 className='font-extrabold text-4xl text-center text-gray-800  '>Wellcome </h1>
            <h1 className='font-extrabold text-4xl text-center text-gray-800  '>To </h1>
            <h1 className='font-extrabold text-4xl text-center text-gray-800  '>Assignment </h1>
            <h1 className='font-extrabold text-4xl text-center text-gray-800  '>Submission</h1>
            <h1 className='font-extrabold text-4xl text-center text-gray-800  '>Portal</h1>
        </div>
        

</div>

     
    </div>
    </>
  )
}

export default Dashboard
