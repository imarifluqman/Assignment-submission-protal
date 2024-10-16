import React, { useState } from "react";
import "./Form.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Swal from "sweetalert2";

const EditStudentProfile = ({ func }) => {
  const {id } = useParams();
  let {open,setOpen , data,handleGetStudentData} = func;
  const [StudentData, setStudentData] = useState({
    username: data.username,
    email: data.email,
    phone: data.phone,
  });

  // console.log(instructor);
  // if(instructor){

  //   // setStudentData(instructor)
  // }

  const [errMsg, setErrMsg] = useState(false);
  console.log(StudentData);

  const handleSubmit = async () => {
    if (
      !StudentData.username ||
      !StudentData.email ||
      !StudentData.phone 
      
    ) {
      // if(!instructor.email){
      console.log("Err");
      setErrMsg(true);
    } else {
      setErrMsg(false);
      try {
        const response = await axios.put(
          `http://localhost:5000/api/auth/user/${id}`,
          {
            username: StudentData.username,
            email: StudentData.email,
            phone: StudentData.phone,
          }
        );
        console.log(response);
        if (response) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Profile updated suceesfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          setOpen(false);

          handleGetStudentData()
        }
      } catch (error) {
        console.error(error);
      }
    }
    console.log(StudentData);
  };
  return (
    <div>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div>
                {errMsg && (
                  <div
                    class="max-w-screen-lg bg-red-500 text-sm text-white rounded-md shadow-lg  mb-3"
                    role="alert"
                  >
                    <div class="flex p-4">
                      All Feild is required
                      <div class="ml-auto">
                        <button
                          type="button"
                          class="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-md text-white/[.5] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-800 focus:ring-red-500 transition-all text-sm dark:focus:ring-offset-red-500 dark:focus:ring-red-700"
                        >
                          <span class="sr-only">Close</span>
                          <svg
                            class="w-3.5 h-3.5"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z"
                              fill="currentColor"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="">
                  <div className="  px-6 py-12 bg-white border-0 shadow-lg sm:rounded-3xl">
                    <h1 className="text-2xl font-bold mb-8">
                      Edit Student Data
                    </h1>
                    <form id="form" novalidate>
                      <div className="relative z-0 w-full mb-5">
                        <input
                          type="text"
                          name="name"
                          onChange={(event) => {
                            setStudentData((prev) => ({
                              ...prev,
                              username: event.target.value,
                            }));
                          }}
                          value={StudentData.username}
                          placeholder=" "
                          required
                          className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                        />
                        <label
                          for="name"
                          className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                        >
                          Enter Student Name
                        </label>
                      </div>{" "}
                      <div className="relative z-0 w-full mb-5">
                        <input
                          type="email"
                          name="name"
                          onChange={(event) => {
                            setStudentData((prev) => ({
                              ...prev,
                              email: event.target.value,
                            }));
                          }}
                          value={StudentData.email}
                          placeholder=" "
                          required
                          className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                        />
                        <label
                          for="name"
                          className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                        >
                          Enter Student Email
                        </label>
                      </div>{" "}
                      <div className="relative z-0 w-full mb-5">
                        <input
                          type="number"
                          name="name"
                          onChange={(event) => {
                            setStudentData((prev) => ({
                              ...prev,
                              phone: event.target.value,
                            }));
                          }}
                          value={StudentData.phone}
                          placeholder=" "
                          required
                          className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                        />
                        <label
                          for="name"
                          className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                        >
                          Enter Insructor phone
                        </label>
                      </div>{" "}
                      {/* <div className="relative z-0 w-full mb-5"> */}
                        {/* <select name="course" value={qualification}
                                            onChange={(e) => {
                                                setQualification(e.target.value)
                                            }}
                                        >
                                            <option defaultChecked value="matric">Matric</option>
                                            <option value="intermediate">Intermediate</option>
                                            <option value="graduate">Graduate</option>
                                        </select> */}
                        {/* <select
                          // type="text"
                          name="name"
                          onChange={(event) => {
                            setStudentData((prev) => ({
                              ...prev,
                              qualification: event.target.value,
                            }));
                          }}
                          // value={StudentData.qualification}
                          // placeholder=" "
                          required
                          className="pt-3 pb-2 block w-full px-0 mt-0 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
                        >
                          <option defaultChecked value="matric">
                            Matric
                          </option>
                          <option value="intermediate">Intermediate</option>
                          <option value="graduate">Graduate</option>
                        </select>
                        <label
                          for="name"
                          className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
                        >
                          Enter Insructor qualification
                        </label>
                      </div> */}
                      <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        <button
                          type="button"
                          onClick={() => handleSubmit()}
                          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          data-autofocus
                          onClick={() => setOpen(false)}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default EditStudentProfile;
