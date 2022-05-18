import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { createContext, useEffect, useState } from 'react';
import Home from './components/Home/Home/Home';
import Login from './components/Login/Login';
import Department from './components/Department/Department/Department';
import StudentsInfo from './components/Admin/StudentsInfo/StudentsInfo';
import PrivateRoute from './components/Login/PrivateRoute';
import EnrollStudent from './components/Admin/EnrollStudent/EnrollStudent';
import AddDepartment from './components/Admin/AddDepartment/AddDepartment';
import MakeAdmin from './components/Admin/MakeAdmin/MakeAdmin';
import StudentProfile from './components/Admin/StudentProfile/StudentProfile';
import StudentByDepartment from './components/Admin/StudentByDepartment/StudentByDepartment';
import NoMatch from './components/NotAccess/NoMatch/NoMatch';
import AddSession from './components/Admin/AddSession/AddSession';
import AddTeacher from './components/Admin/AddTeacher/AddTeacher';
import AddSemester from './components/Admin/AddSemester/AddSemester';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("user")) || {});

  }, []);


  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path="/" >
            <Home></Home>
          </Route>
          <Route path="/home" >
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/department">
            <Department></Department>
          </PrivateRoute>
          <PrivateRoute path="/admin/allstudent">
            <StudentsInfo></StudentsInfo>
          </PrivateRoute>
          <PrivateRoute path="/admin/department/:department">
            <StudentByDepartment />
          </PrivateRoute>
          <PrivateRoute path="/admin/addTeacher">
            <AddTeacher />
          </PrivateRoute>
          <PrivateRoute path="/admin/enrollment">
            <EnrollStudent />
          </PrivateRoute>
          <PrivateRoute path="/admin/department">
            <AddDepartment />
          </PrivateRoute>
          <PrivateRoute path="/admin/addSession">
            <AddSession></AddSession>
          </PrivateRoute>
          <PrivateRoute path="/admin/addSemester">
            <AddSemester></AddSemester>
          </PrivateRoute>
          <PrivateRoute path="/admin/admin">
            <MakeAdmin />
          </PrivateRoute>
          <PrivateRoute path="/admin/profile/:id">
            <StudentProfile></StudentProfile>
          </PrivateRoute>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
