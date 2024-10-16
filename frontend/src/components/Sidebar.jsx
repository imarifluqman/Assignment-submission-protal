import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Sidebar = () => {
  let {instructorId} = useParams()
  console.log(instructorId);
  const navigate = useNavigate();

  
const handleLogout = ()=>{
  localStorage.removeItem("instructorId")
  navigate(`/instructorAuth`)
}
  return (
    <div>
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
            <li onClick={()=>{navigate(`/instructor/${instructorId}/assignments`)}} >
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
            <li onClick={()=>{navigate(`/instructor/${instructorId}/profile`)}}>
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
  );
};

export default Sidebar;
