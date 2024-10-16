import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SubmissionManagementPage = () => {
  let { assignmentId, instructorId } = useParams();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState(null);
  const [status, setStatus] = useState('');
  const [submissions, setSubmissions] = useState([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);
  const [errMsg, setErrMsg] = useState(false);

  const handleGetSubmissionsByAssignmentId = async () => {
    try {
      setErrMsg(false);
      const response = await axios.get(
        `http://localhost:5000/api/submissions/assignment/${assignmentId}`
      );
      setSubmissions(response.data);
      setFilteredSubmissions(response.data); // Initialize filtered submissions
    } catch (error) {
      console.error(error);
      if (error.response.data.message === "No submissions found for this assignment") {
        setErrMsg(true);
      }
    }
  };

  const handleGetAssignment = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/assignments/${assignmentId}`
      );
      setAssignment(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetSubmissionsByAssignmentId();
    handleGetAssignment();
  }, [assignmentId]);

  const filterSubmissions = (status) => {
    setStatus(status);
    if (status === '') {
      setFilteredSubmissions(submissions);
      setErrMsg(submissions.length === 0);
    } else {
      const isGraded = status === 'graded';
      const filtered = submissions.filter(submission => submission.isGraded === isGraded);
      setFilteredSubmissions(filtered);
      setErrMsg(filtered.length === 0);
    }
  };

  return (
    <>
      <div>
        <div className="max-w-7xl text-center mx-auto p-4">
          <div className="flex">
            <div
              onClick={() => {
                navigate(
                  `/instructor/${instructorId}/assignments/${assignmentId}`
                );
              }}
              className="md:text-5xl md:mr-8 lg:text-7xl m-3 w-8 text-xl lg:mr-10"
            >
              <i className="fa-solid fa-circle-left"></i>
            </div>
            <div className="lg:ml-64 md:ml-36">
              <h1 className="text-3xl font-bold mb-4">
                Submission Management Page
              </h1>

              <div className="mb-4">
                <h1 className="text-3xl font-bold">
                  Assignment Title {" : "}{" "}
                  <span className="font-extrabold">
                    {assignment && assignment.title}
                  </span>
                </h1>
              </div>
            </div>
          </div>
          <div className="flex justify-center m-2 lg:text-xl text-sm flex-nowrap">
            <h1>Filtered By Status : </h1>
            <select onChange={(e) => filterSubmissions(e.target.value)} className="" name="status" id="status">
              <option value="" selected>All</option>
              <option value="graded">Graded</option>
              <option value="notGraded">Not Graded</option>
            </select>
          </div>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            {errMsg ? (
              <div className="flex justify-center items-center flex-col">
                <h1 className="text-3xl text-red-500 font-bold m-1">
                  No submissions found for this filter
                </h1>
              </div>
            ) : (
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-1 px-2 lg:py-3 lg:px-6 text-left">Student Name</th>
                    <th className="py-1 px-2 lg:py-3 lg:px-6 text-left">Submission Date</th>
                    <th className="py-1 px-2 lg:py-3 lg:px-6 text-left">Status</th>
                    <th className="py-1 px-2 lg:py-3 lg:px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 text-sm font-light">
                  {filteredSubmissions.map((submission) => (
                    <tr
                      key={submission._id}
                      className="border-b border-gray-200 hover:bg-gray-100 text-lg"
                    >
                      <td className="py-1 px-2 lg:py-3 lg:px-6 text-left whitespace-nowrap">
                        {submission.student}
                      </td>
                      <td className="py-1 px-2 lg:py-3 lg:px-6 text-left">
                        {format(new Date(submission.submittedAt), "dd-MM-yyyy")}
                      </td>
                      <td className="py-1 px-2 lg:py-3 lg:px-6 text-left flex justify-center items-center" >
                        {submission.isGraded ? (
                          <h1 className="bg-origin-border  p-3 border-4 border-dotted bg-gradient-to-r from-sky-500 to-indigo-500 text-center rounded-2xl text-white font-semibold">
                            Graded
                          </h1>
                        ) : (
                          <h1 className="bg-origin-border p-3 border-4 border-dotted bg-gradient-to-r from-rose-500 to-red-600 text-center rounded-2xl text-white font-semibold">
                            Not Graded
                          </h1>
                        )}
                      </td>
                      <td className="py-1 px-2 lg:py-3 lg:px-6 text-center">
                        <button
                          onClick={() => {
                            navigate(
                              `/instructor/${instructorId}/assignments/${assignmentId}/submissions/${submission._id}`
                            );
                          }}
                          className="inline-flex items-center gap-x-2 rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold text-blue-400 shadow-sm hover:bg-blue-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-900"
                        >
                          <i className="fas fa-eye"></i> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmissionManagementPage;
