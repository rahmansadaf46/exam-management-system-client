import React, { useEffect, useState } from 'react';
import DepartmentCard from '../DepartmentCard/DepartmentCard';
import { Link } from 'react-router-dom';
// import logo from '../../../images/ICON/ist.png';
// import { UserContext } from '../../../App';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import './Department.css';


const Department = () => {
    document.title = "Department";
    // const [loggedInUser] = useContext(UserContext);
    const [isTeacher, setIsTeacher] = useState(false);
    const [dept, setDept] = useState([]);

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
    useEffect(() => {
        if (localStorage.getItem("teacherAccess")) {
            setIsTeacher(true);
            const semesterData = JSON.parse(localStorage.getItem("semester"))
            let department = semesterData.map(semester => { return semester.department }).filter((v, i, a) => a.indexOf(v) === i);
            setDept(department)
        }
        else {
            setIsTeacher(false);
        }
        // console.log(localStorage.getItem("semester"))
    }, [])
    console.log(isTeacher)
    return (
        <div>
            {
                isTeacher === true ?
                    <section className=" container">
                        <Link style={{textDecoration: 'none', color:'orange'}} to='/'>
                            <div className="d-flex justify-content-center ">
                                {/* <img style={{ width: "200px", height: "200px" }} src={logo} alt="" /> */}
                                    <h1 className='my-5'>Online Exam Hall</h1>
                            </div>
                        </Link>
                        <h2 className="text-center">Select <span className="text-yellow">Department</span> </h2>
                        <div className="department-underline mb-2"></div>
                        {
                            dept.length === 0 && <img className="rounded mx-auto d-block mt-4 pt-3" src="https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="" />
                        }
                        <div className="row justify-content-center">
                            {/* {
                                dept.map(department => <button className="col-md-3 mx-3 department-card btn">
                                    <h3 className="text-center my-2">{department}</h3>
                                </button>)
                            } */}
                            {
                                dept.map(department => <DepartmentCard key={department._id} department={department}></DepartmentCard>)
                            }
                            {/* <Link to={`/admin/allstudent/${department.department}`} className="col-md-4 department-card">
                                <h4 className="text-center my-2">{department.department}</h4>
                            </Link> */}
                        </div>
                    </section>
                    : <Unauthorized />
            }

        </div>
    );
};

export default Department;