import { faBars, faPlus, faSignOutAlt, faClipboard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
// import { UserContext } from '../../../App';
// import './Sidebar.css';

const TeacherSidebar = () => {
    // const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // const [dept, setDept] = useState([]);
    const logout = () => {

        localStorage.clear();
        window.location.assign("/");
        // setLoggedInUser({})
    }
    // function MyComponent() {
    //     useEffect(() => {
    //         setDept(JSON.parse(localStorage.getItem("dept")) || {});
    //     }, [])
    // }

    // function MyComponent2() {
    //     useEffect(() => {
    //         fetch('http://localhost:5000/departments')
    //             .then(res => res.json())
    //             .then(data => {
    //                 if (data) {
    //                     localStorage.setItem('dept', JSON.stringify(data));
    //                 }
    //                 setDept(data)
    //             })
    //     }, [])
    // }


    // if (localStorage.getItem("dept")) {
    //     MyComponent();
    // }
    // else {
    //     MyComponent2()
    // }
    return (
        <div className="sidebar d-flex flex-column justify-content-between align-items-center col-md-2 py-5 px-4" style={{ height: "100vh" }}>

            <ul className="list-unstyled py-3">
                <li>
                    <Link style={{ textDecoration: 'none' }} to="/semesterDashboard" className="">
                        <span><FontAwesomeIcon icon={faClipboard} /> Semester Dashboard</span>
                    </Link>

                </li>
                <li>
                    <Link style={{ textDecoration: 'none' }} to="/createExam" className="">
                        <span><FontAwesomeIcon icon={faPlus} /> Create Exam</span>
                    </Link>

                </li>
                <li>
                    <Link style={{ textDecoration: 'none' }} to="/questionList" className="">
                        <span><FontAwesomeIcon icon={faBars} /> Question List</span>
                    </Link>

                </li>
                <li>
                    <Link style={{ textDecoration: 'none' }} to="/department" className="">
                        <span><FontAwesomeIcon icon={faBars} /> Department List</span>
                    </Link>

                </li>

                <li>
                    <Link style={{ textDecoration: 'none' }} to="/practice" className="">
                        <span><FontAwesomeIcon icon={faClipboard} /> Practice</span>
                    </Link>

                </li>
                {/* <li>
                    <Link onClick={() => { window.location.href = "/admin/teacherList" }} style={{ textDecoration: 'none' }} to="/admin/teacherList" className="">
                        <span><FontAwesomeIcon icon={faUser} /> All Teacher</span>
                    </Link>
                </li>

                <li>
                    <Link onClick={() => { window.location.href = "/admin/enrollment" }} style={{ textDecoration: 'none' }} to="/admin/enrollment" className="">
                        <span><FontAwesomeIcon icon={faUserPlus} /> Enroll A Student</span>
                    </Link>
                </li>
                <li>
                    <Link style={{ textDecoration: 'none' }} to="/admin/addTeacher" className="">
                        <span><FontAwesomeIcon icon={faUserPlus} /> Add Teacher</span>
                    </Link>
                </li>
                <li>
                    <Link onClick={() => { window.location.href = "/admin/department" }} style={{ textDecoration: 'none' }} to="/admin/department" className="">
                        <span><FontAwesomeIcon icon={faPlus} /> Add Department</span>
                    </Link>
                </li>
                <li>
                    <Link onClick={() => { window.location.href = "/admin/addSession" }} style={{ textDecoration: 'none' }} to="/admin/addSession" className="">
                        <span> <FontAwesomeIcon icon={faPlus} /> Add Session</span>
                    </Link>
                </li>
                <li>
                    <Link onClick={() => { window.location.href = "/admin/addSemester" }} style={{ textDecoration: 'none' }} to="/admin/addSemester" className="">
                        <span> <FontAwesomeIcon icon={faPlus} /> Add Semester</span>
                    </Link>
                </li>
                <li>
                    <Link onClick={() => { window.location.href = "/admin/admin" }} style={{ textDecoration: 'none' }} to="/admin/admin" className="">
                        <span> <FontAwesomeIcon icon={faUserCog} /> Make Admin</span>
                    </Link>
                </li> */}
                <button onClick={logout} className="log-out-btn ml-3 btn-danger mb-3 btn text-white btn-sm">Log Out  <FontAwesomeIcon icon={faSignOutAlt} /></button>
            </ul>

        </div >
    );
};

export default TeacherSidebar;