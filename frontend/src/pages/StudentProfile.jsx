import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditStudentProfile from "../components/EditStudentProfile";

const StudentProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const handleGetStudentData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/${id}`);
      if (response.status === 200) {
        console.log(response);
        setData(response.data.User);
      }
    } catch (error) {
      console.log("Error in getting student Info", error);
    }
  };
  useEffect(() => {
    handleGetStudentData();
  }, [id]);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-900 dark:text-gray-100 dark:bg-gray-950">
          <h1 className="text-xl md:text-5xl font-bold flex items-center">
            Loading...
          </h1>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex">
          <div
            onClick={() => {
              navigate(`/dashboard/${id}`);
            }}
            className=" md:text-5xl md:mr-8 lg:text-7xl m-3 w-8 text-xl  lg:mr-10  "
          >
            <i className="fa-solid fa-circle-left   "></i>
          </div>

          <div className="lg:ml-64 md:ml-36 ">
            <div className="w-[600px] mx-auto p-4">
              <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <div className="flex items-center capitalize">
                  <div className="mr-6">
                    <img
                      className="w-32 h-32 rounded-full"
                      src={
                        data.profilePicture ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAito-mmNtcFdIj9vlk30ZrOgyEixgqhk-pg&s"
                      }
                      alt="Profile"
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">
                      {" "}
                      Name {" :  "} {data?.username}
                    </h1>
                    <p className="text-gray-700 lowercase">
                      {" "}
                      Email {" :  "} {data?.email}
                    </p>
                    <p className="text-gray-700">
                      {" "}
                      Phone {" : "} {data?.phone}
                    </p>
                    <p className="text-gray-700">
                      {" "}
                      Course {" : "} {data?.course}
                      
                    </p>
                    {/* <Link to={`/editInstructor/${instructorId}`}> */}
                    <button onClick={()=>{setOpen(true)}} className="mt-4 inline-flex items-center gap-x-2 rounded-md bg-blue-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
                <i className="fa-regular fa-pen-to-square"></i>
                Edit Profile
              </button>
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
        data.username && (

          <EditStudentProfile func={{open,setOpen , data,handleGetStudentData}} />
        )
       }
      </>
    );
  }
};

export default StudentProfile;
