import React from "react";
import "./Authentication.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function InstructorAuth() {
  const navigate = useNavigate();

  // States for login
  const [InstructorEmail, setInstructorEmail] = useState("");
  const [InstructorPassword, setInstructorPassword] = useState("");

  // States for Registration
  const [registrationName, setRegistrationName] = useState("");
  const [registrationEmail, setRegistrationEmail] = useState("");
  const [registrationPassword, setRegistrationPassword] = useState("");
  const [registrationPhone, setRegistrationPhone] = useState("");
  const [registrationCourse, setRegistrationCourse] =useState("");
  const [qualification, setQualification] = useState("matric");
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const switchers = [...document.querySelectorAll(".switchers")];
    const handleClick = function () {
      switchers.forEach((item) =>
        item.parentElement.classList.remove("is-active")
      );
      this.parentElement.classList.add("is-active");
    };

    switchers.forEach((item) => item.addEventListener("click", handleClick));

    return () => {
      switchers.forEach((item) =>
        item.removeEventListener("click", handleClick)
      );
    };
  }, []);

  useEffect(() => {
    handleFetchCourseData();
  }, []);

  let login = async (event) => {
    event.preventDefault();
  
    if (!InstructorEmail.includes("@")) {
      Swal.fire({
        title: "Invalid Email",
        text: "Email must contain '@'",
        icon: "warning",
        background: "black",
        color: "white",
      });
    } else if (InstructorPassword.length < 7) {
      Swal.fire({
        title: "Invalid Password",
        text: "Password must be at least 7 characters long",
        icon: "warning",
        background: "black",
        color: "white",
      });
    } else {
      let data = {
        email: String(InstructorEmail),
        password: String(InstructorPassword),
      };
  
      try {
        let response = await axios.post(
          `http://localhost:5000/api/auth/instructorLogin`,
          data
        );
  
        if (response.data.message === "Invalid Credentials") {
          Swal.fire({
            title: "Login Failed",
            text: "Invalid Credentials",
            icon: "error",
            background: "black",
            color: "white",
          });
        } else {
          localStorage.setItem("instructorId", response.data.InstructorId);
          navigate(`/instructor/${response.data.InstructorId}/dashboard`);
        }
      } catch (error) {
        if (error.message === "Network Error") {
          Swal.fire({
            title: "Network Error",
            text: "Please check your internet connection",
            icon: "warning",
            background: "black",
            color: "white",
          });
        } else if (error.response && error.response.data.message) {
          const errorMessage = error.response.data.message;
          Swal.fire({
            title: "Login Failed",
            text: errorMessage,
            icon: "error",
            background: "black",
            color: "white",
          });
        } else {
          Swal.fire({
            title: "An Unexpected Error Occurred",
            text: "Please try again later",
            icon: "error",
            background: "black",
            color: "white",
          });
        }
      } finally {
        setInstructorEmail("");
        setInstructorPassword("");
      }
    }
  };
  
  let registration = async (e) => {
    e.preventDefault();
  
    const data = {
      instructorName: registrationName,
      email: registrationEmail,
      phone: registrationPhone,
      course: registrationCourse,
      password: registrationPassword,
      qualification: qualification,
    };
  
    try {
      let response = await axios.post(
        "http://localhost:5000/api/auth/instructorRegister",
        data
      );
  
      if (response.status === 200) {
        Swal.fire({
          title: "Registration Successful",
          icon: "success",
          background: "black",
          color: "white",
          timer: 2000,
        });
        setRegistrationName("");
        setRegistrationEmail("");
        setRegistrationPassword("");
        setRegistrationPhone("");
        setRegistrationCourse("");
        setQualification("");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        const errorMessage = error.response.data.message;
  
        if (errorMessage === "Email already Exist") {
          Swal.fire({
            title: "Registration Failed",
            text: "Email Already Exists",
            icon: "error",
            background: "black",
            color: "white",
          });
        } else if (errorMessage === "Fill the input properly") {
          const extraDetails = error.response.data.extraDetails || "";
          Swal.fire({
            title: "Registration Failed",
            text: `Please fill all fields correctly. ${extraDetails}`,
            icon: "warning",
            background: "black",
            color: "white",
          });
        }
      } else {
        Swal.fire({
          title: "An Unexpected Error Occurred",
          text: "Please try again later",
          icon: "error",
          background: "black",
          color: "white",
        });
      }
    }
  };
  
  const handleFetchCourseData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/getAllCourses`
      );
      setCourseData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="instructor-background">
        <section className="forms-section">
          <div className="logo">
            <img
              className="logo-image"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5XaPknTWTxdBcdC3r0_9blSi_8n3rD_2Xg&s"
              alt=""
              width="80px"
              style={{ borderRadius: "50%" }}
            />
          </div>
          <h1 className="section-title">Instructor Portal</h1>
          <div className="forms">
            <div className="form-wrapper is-active">
              <button type="button" className="switchers switchers-login">
                <h3>Login </h3>
                <span className="underline"></span>
              </button>
              <form className="form form-login" onSubmit={login}>
                <fieldset>
                  <div className="input-block">
                    <label htmlFor="login-email">E-mail</label>
                    <input
                      type="email"
                      placeholder="abc@gmail.com"
                      value={InstructorEmail}
                      required
                      onChange={(e) => {
                        setInstructorEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="input-block">
                    <label htmlFor="login-password">Password</label>
                    <input
                      type="password"
                      placeholder="*******"
                      required
                      value={InstructorPassword}
                      onChange={(e) => {
                        setInstructorPassword(e.target.value);
                      }}
                    />
                  </div>
                </fieldset>
                <button type="submit" className="btn-login">
                  Login
                </button>
              </form>
            </div>
            <div className="form-wrapper">
              <button type="button" className="switchers switchers-signup">
                <h3>Register</h3>
                <span className="underline"></span>
              </button>
              <form className="form form-signup" onSubmit={registration}>
                <fieldset>
                  <div className="input-block">
                    <label htmlFor="signup-email">Username</label>
                    <input
                      type="text"
                      value={registrationName}
                      onChange={(e) => {
                        setRegistrationName(e.target.value);
                      }}
                      required
                      placeholder="abc    "
                    />
                  </div>

                  <div className="input-block">
                    <label htmlFor="signup-email">Email</label>
                    <input
                      placeholder="abc@gmail.com"
                      value={registrationEmail}
                      onChange={(e) => {
                        setRegistrationEmail(e.target.value);
                      }}
                      type="email"
                      required
                    />
                  </div>
                  <div className="input-block">
                    <label htmlFor="signup-email">Password</label>
                    <input
                      placeholder="*******"
                      type="password"
                      value={registrationPassword}
                      onChange={(e) => {
                        setRegistrationPassword(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div className="input-block">
                    <label htmlFor="signup-email">Phone No</label>
                    <input
                      placeholder="03111111111"
                      value={registrationPhone}
                      onChange={(e) => {
                        setRegistrationPhone(e.target.value);
                      }}
                      type="number"
                      required
                    />
                  </div>
                  <div className="input-block">
                    <label htmlFor="signup-password-confirm">Course</label>
                    <select
                      name="course"
                      value={registrationCourse}
                      onChange={(e) => {
                        setRegistrationCourse(e.target.value);
                      }}
                      disabled={!courseData || courseData.length === 0} // Disable the dropdown if no courses are available
                    >
                      <option disabled  value="">
                        Select Course
                      </option>
                      {courseData && courseData.length > 0 ? (
                        courseData.map(
                          (course, index) =>
                            !course.isSelected && (
                              <option key={index} value={course._id}>
                                {course.courseName}
                              </option>
                            )
                        )
                      ) : (
                        <option disabled>No Course Available</option>
                      )}
                    </select>
                  </div>

                  <div className="input-block">
                    <label htmlFor="signup-password-confirm">
                      Qualification
                    </label>
                    <select
                      name="course"
                      value={qualification}
                      onChange={(e) => {
                        setQualification(e.target.value);
                      }}
                    >
                      <option defaultChecked value="matric">
                        Matric
                      </option>
                      <option value="intermediate">Intermediate</option>
                      <option value="graduate">Graduate</option>
                    </select>
                  </div>
                </fieldset>
                <button type="submit" className="btn-signup">
                  Register
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default InstructorAuth;
