import { faUserPlus, faUserCog, faPlus, faUserGraduate, faCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { UserContext } from '../../../App';
import './Sidebar.css';

const Sidebar = () => {
    // const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [dept, setDept] = useState([]);
    const logout = () => {

        localStorage.clear();
        window.location.assign("/");
        // setLoggedInUser({})
    }
    function MyComponent() {
        useEffect(() => {
            setDept(JSON.parse(localStorage.getItem("dept")) || {});
        }, [])
    }

    function MyComponent2() {
        useEffect(() => {
            fetch('http://localhost:5000/departments')
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        localStorage.setItem('dept', JSON.stringify(data));
                    }
                    setDept(data)
                })
        }, [])
    }


    if (localStorage.getItem("dept")) {
        MyComponent();
    }
    else {
        MyComponent2()
    }
    return (
        <div className="sidebar d-flex flex-column justify-content-between align-items-center col-md-2 py-5 px-4" style={{ height: "100vh" }}>

            <ul className="list-unstyled py-3">
                <li>
                    <Link style={{ textDecoration: 'none' }} to="/admin/allstudent" className="">
                        <span><FontAwesomeIcon icon={faUserGraduate} /> All Student</span>
                    </Link>
                    <div className="">

                        <li className="subMenu">
                            {
                                dept.length === 0 && <p>Loading...</p>
                            }

                            {

                                dept.map(department => <Link onClick={() => { window.location.href = `/admin/department/${department.department}` }} style={{ textDecoration: 'none' }} key={department._id} to={`/admin/department/${department.department}`} className="subMenu">
                                    <small style={{ display: "block", marginBottom: "2px" }}><FontAwesomeIcon icon={faCircle} />{department.department}</small>
                                </Link>)
                            }
                        </li>
                    </div>
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
                    <Link onClick={() => { window.location.href = "/admin/addSemester" }} style={{ textDecoration: 'none' }} to="/admin/addSession" className="">
                        <span> <FontAwesomeIcon icon={faPlus} /> Add Semester</span>
                    </Link>
                </li>
                <li>
                    <Link onClick={() => { window.location.href = "/admin/admin" }} style={{ textDecoration: 'none' }} to="/admin/admin" className="">
                        <span> <FontAwesomeIcon icon={faUserCog} /> Make Admin</span>
                    </Link>
                </li>
                <button onClick={logout} className="log-out-btn ml-3 btn-danger mb-3 btn text-white btn-sm">Log Out  <FontAwesomeIcon icon={faSignOutAlt} /></button>
            </ul>

        </div >
    );
};

export default Sidebar;