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
import FreeCourses from "./pages/FreeCourses";
import AddFreeCourse from "./pages/AddFreeCourse";
import Lessons from "./pages/Lessons";
import AddFreeLesson from "./pages/AddFreeLesson";

function App() {
  const { token, user } = useContext(AuthContext);

  return (
    <>
      <Router>
        <Routes>
          {user && token ? (
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="coaches" element={<Coaches />} />
              <Route path="users" element={<Users />} />
              <Route path="free-courses" element={<FreeCourses />} />
              <Route path="free-course" element={<AddFreeCourse />} />
              <Route path="free-course/:id" element={<AddFreeCourse />} />
              <Route path="lessons" element={<Lessons />} />
              <Route path="free-lesson" element={<AddFreeLesson />} />
              <Route path="free-lesson/:id" element={<AddFreeLesson />} />
              <Route path="categories" element={<Categories />} />
              <Route path="category" element={<AddCategory />} />
              <Route path="category/:id" element={<AddCategory />} />
            </Route>
          ) : (
            <>
              <Route index element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<VerifyOTP />} />
              <Route path="/reset-password" element={<ResetPassword />} />
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
