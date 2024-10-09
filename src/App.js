
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/MainLayout';
import Coaches from './pages/Coaches';
import Users from './pages/Users';
import Courses from './pages/Courses';
import AddCourse from './pages/AddCourse';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VerifyOTP from './pages/auth/VerifyOTP';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route  path="/admin" element={<MainLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="coaches" element={<Coaches/>}/>
          <Route path="users" element={<Users/>}/>
          <Route path="courses" element={<Courses/>}/>
          <Route path="course" element={<AddCourse/>}/>
        </Route>
        <Route  path="/login" element={<Login/>}/>
        <Route  path="/forgot-password" element={<ForgotPassword/>}/>
        <Route  path="/verify-otp" element={<VerifyOTP/>}/>
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
