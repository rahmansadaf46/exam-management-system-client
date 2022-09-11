import { faBars,  faSignOutAlt, faClipboard, faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
// import { UserContext } from '../../../App';
// import './Sidebar.css';

const StudentSidebar = () => {
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
                    <Link style={{ textDecoration: 'none' }} to="/studentDashboard" className="">
                        <span><FontAwesomeIcon icon={faBars} /> Student Dashboard</span>
                    </Link>

                </li>
              
                <li>
                    <Link style={{ textDecoration: 'none' }} to="/exam" className="">
                        <span><FontAwesomeIcon icon={faClipboard} /> Exam Panel</span>
                    </Link>

                </li>
                <li>
                    <Link style={{ textDecoration: 'none' }} to="/studentResult" className="">
                        <span><FontAwesomeIcon icon={faList} /> Result</span>
                    </Link>

                </li>
                <button onClick={logout} className="log-out-btn ml-3 btn-danger mb-3 btn text-white btn-sm">Log Out  <FontAwesomeIcon icon={faSignOutAlt} /></button>
            </ul>

        </div >
    );
};

export default StudentSidebar;