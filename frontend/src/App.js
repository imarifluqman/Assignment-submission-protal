import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import AssignmentManagementPage from "./pages/AssignmentManagementPage";
import AssignmentDetailPage from "./pages/AssignmentDeatilPage";
import SubmissionManagementPage from "./pages/SubmissionManagementPage";
import SubmissionDeatailPage from "./pages/SubmissionDeatailPage";
import InstructorProfile from "./pages/InstuctorProfile";
import StudentDashboard from "./pages/StudentDashboard";
import Authentication from "./components/Authentication/Authentication";
import InstructorAuth from "./components/Authentication/InstructorAuth";
import StudentProfile from "./pages/StudentProfile";
import StudentAssignmentListingPage from "./pages/StudentAssignmentListingPage";
import AssignmentSubmissionPage from "./pages/AssignmentSubmissionPage";
import NotFound from './pages/NotFound'
import { ProtectedInstructorRoute, ProtectedStudentRoute } from "./ProtectedRoutes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="*" element={<NotFound />} />



          {/* Public Routes */}
          <Route path="/" element={<Authentication />} />
          <Route path="/instructorAuth" element={<InstructorAuth />} />

          {/* Protected Student Routes */}
          <Route
            path="/dashboard/:id"
            element={
              <ProtectedStudentRoute>
                <StudentDashboard />
              </ProtectedStudentRoute>
            }
          />
          <Route
            path="/:id/assignments"
            element={
              <ProtectedStudentRoute>
                <StudentAssignmentListingPage />
              </ProtectedStudentRoute>
            }
          />
          <Route
            path="/:id/assignments/:assignmentId"
            element={
              <ProtectedStudentRoute>
                <AssignmentSubmissionPage />
              </ProtectedStudentRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedStudentRoute>
                <StudentProfile />
              </ProtectedStudentRoute>
            }
          />

          {/* Protected Instructor Routes */}
          <Route
            path="/instructor/:instructorId/dashboard"
            element={
              <ProtectedInstructorRoute>
                <DashboardPage />
              </ProtectedInstructorRoute>
            }
          />
          <Route
            path="/instructor/:instructorId/profile"
            element={
              <ProtectedInstructorRoute>
                <InstructorProfile />
              </ProtectedInstructorRoute>
            }
          />
          <Route
            path="/instructor/:instructorId/assignments"
            element={
              <ProtectedInstructorRoute>
                <AssignmentManagementPage />
              </ProtectedInstructorRoute>
            }
          />
          <Route
            path="/instructor/:instructorId/assignments/:assignmentId"
            element={
              <ProtectedInstructorRoute>
                <AssignmentDetailPage />
              </ProtectedInstructorRoute>
            }
          />
          <Route
            path="/instructor/:instructorId/assignments/:assignmentId/submissions"
            element={
              <ProtectedInstructorRoute>
                <SubmissionManagementPage />
              </ProtectedInstructorRoute>
            }
          />
          <Route
            path="/instructor/:instructorId/assignments/:assignmentId/submissions/:submissionId"
            element={
              <ProtectedInstructorRoute>
                <SubmissionDeatailPage />
              </ProtectedInstructorRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
