import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { Toaster } from "react-hot-toast";

// Public pages
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUp from "./pages/Auth/SignUp";
import Login from "./pages/Auth/Login";

// Job Seeker pages
import JobSeekerDashboard from "./pages/JobSeeker/JobSeekerDashboard";
import JobDetails from "./pages/JobSeeker/JobDetails";
import SavedJobs from "./pages/JobSeeker/SavedJobs";
import UserProfile from "./pages/JobSeeker/UserProfile";
import MyApplications from "./pages/JobSeeker/MyApplications"; // NEW

// Employer pages
import EmployerDashboard from "./pages/Employer/EmployerDashboard";
import JobPostingForm from "./pages/Employer/JobPostingForm";
import ManageJobs from "./pages/Employer/MangeJobs";
import ApplicantsViewer from "./pages/Employer/ApplicationViewer";
import ApplicationPreview from "./components/Cards/ApplicationPreview";
import EmployerProfilePage from "./pages/Employer/EmployerProfilePage";
import EditEmployerProfile from "./pages/Employer/EditEmployerProfilePage";

// Protected Route
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        {/* ====================================================== */}
        {/* JOB SEEKER PROTECTED ROUTES */}
        {/* ====================================================== */}
        <Route element={<ProtectedRoute requiredRole="jobseeker" />}>
          <Route path="/find-jobs" element={<JobSeekerDashboard />} />
          <Route path="/job/:jobId" element={<JobDetails />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/my-applications" element={<MyApplications />} />
        </Route>

        {/* ====================================================== */}
        {/* EMPLOYER PROTECTED ROUTES */}
        {/* ====================================================== */}
        <Route element={<ProtectedRoute requiredRole="employer" />}>
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/post-job" element={<JobPostingForm />} />
          <Route path="/manage-jobs" element={<ManageJobs />} />
          <Route path="/applicants" element={<ApplicantsViewer />} />
          <Route path="/application/:id" element={<ApplicationPreview />} />
          <Route path="/company-profile" element={<EmployerProfilePage />} />
          <Route path="/employer/edit-profile" element={<EditEmployerProfile />} />
        </Route>

        {/* UNKNOWN ROUTES */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Toaster toastOptions={{ style: { fontSize: "13px" } }} />
    </Router>
  );
};

export default App;
