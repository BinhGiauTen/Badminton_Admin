import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./components/MainLayout";
import Coaches from "./pages/Coaches";
import Users from "./pages/Users";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ResetPassword from "./pages/auth/ResetPassword";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import Categories from "./pages/Categories";
import AddCategory from "./pages/AddCategory";
import AddFreeLesson from "./pages/free/AddFreeLesson";
import Register from "./pages/auth/Register";
import CourseDetail from "./pages/CourseDetail";
import AddPaidLesson from "./pages/paid/AddPaidLesson";
import FreeCourses from "./pages/free/FreeCourses";
import PaidCourses from "./pages/paid/PaidCourses";
import AddPaidCourse from "./pages/paid/AddPaidCourse";
import AddFreeCourse from "./pages/free/AddFreeCourse";
import FreeLesson from "./pages/free/FreeLesson";
import PaidLesson from "./pages/paid/PaidLesson";
import AddFreeQuestion from "./pages/free/AddFreeQuestion";
import AddPaidQuestion from "./pages/paid/AddPaidQuestion";

function App() {
  const { token, user } = useContext(AuthContext);

  return (
    <>
      <Router>
        <Routes>
          {user && token ? (
            <Route path="/dashboard" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="coaches" element={<Coaches />} />
              <Route path="users" element={<Users />} />
              <Route path="free-courses" element={<FreeCourses />} />
              <Route path="paid-courses" element={<PaidCourses />} />
              <Route path="free-course" element={<AddFreeCourse />} />
              <Route path="free-course/:courseId" element={<AddFreeCourse />} />
              <Route path="paid-course" element={<AddPaidCourse />} />
              <Route path="paid-course/:courseId" element={<AddPaidCourse />} />
              <Route path="free-course/:courseId/course-detail" element={<CourseDetail />} />
              <Route path="paid-course/:courseId/course-detail" element={<CourseDetail />} />
              <Route path="free-course/:courseId/add-lesson" element={<AddFreeLesson />} />
              <Route path="paid-course/:courseId/add-lesson" element={<AddPaidLesson />} />
              <Route path="free-course/:courseId/preview-lesson/:lessonId" element={<FreeLesson />} />
              <Route path="paid-course/:courseId/preview-lesson/:lessonId" element={<PaidLesson />} />
              <Route path="free-course/:courseId/preview-lesson/:lessonId/add-question" element={<AddFreeQuestion />} />
              <Route path="free-course/:courseId/preview-lesson/:lessonId/question/:questionId" element={<AddFreeQuestion />} />
              <Route path="paid-course/:courseId/preview-lesson/:lessonId/add-question" element={<AddPaidQuestion />} />
              <Route path="paid-course/:courseId/preview-lesson/:lessonId/question/:questionId" element={<AddPaidQuestion />} />
              <Route path="free-course/:courseId/lesson/:id" element={<AddFreeLesson />} />
              <Route path="paid-course/:courseId/lesson/:id" element={<AddPaidLesson />} />
              <Route path="categories" element={<Categories />} />
              <Route path="category" element={<AddCategory />} />
              <Route path="category/:id" element={<AddCategory />} />
            </Route>
          ) : (
            <>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="verify-otp" element={<VerifyOTP />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </>
          )}
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
