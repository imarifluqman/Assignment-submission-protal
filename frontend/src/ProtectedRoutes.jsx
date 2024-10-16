import React from "react";
import { Navigate } from "react-router-dom";

// Protected Route for Instructor
const ProtectedInstructorRoute = ({ children }) => {
  const instructorId = localStorage.getItem("instructorId");

  if (!instructorId) {
    // Redirect to the Instructor Login page if not authenticated
    return <Navigate to="/instructorAuth" />;
  }

  return children;
};

// Protected Route for Student
const ProtectedStudentRoute = ({ children }) => {
  const studentId = localStorage.getItem("studentId");

  if (!studentId) {
    // Redirect to the Student Login page if not authenticated
    return <Navigate to="/" />;
  }

  return children;
};

export { ProtectedInstructorRoute, ProtectedStudentRoute };
