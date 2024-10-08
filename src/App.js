
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/MainLayout';
import Coaches from './pages/Coaches';
import Users from './pages/Users';
import Courses from './pages/Courses';
import AddCourse from './pages/AddCourse';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/" element={<Login/>}/>
        <Route  path="/admin" element={<MainLayout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path="coaches" element={<Coaches/>}/>
          <Route path="users" element={<Users/>}/>
          <Route path="courses" element={<Courses/>}/>
          <Route path="course" element={<AddCourse/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
