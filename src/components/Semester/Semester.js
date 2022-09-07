import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import DepartmentCard from '../DepartmentCard/DepartmentCard';
import { Link } from 'react-router-dom';
import logo from '../../images/ICON/ist.png';
// import { UserContext } from '../../../App';
// import './Department.css';
import Unauthorized from '../NotAccess/Unauthorized/Unauthorized';


const Semester = () => {
    document.title = "Semester";
    // const [loggedInUser] = useContext(UserContext);
    const [isTeacher, setIsTeacher] = useState(false);
    const [semester, setSemester] = useState([]);
    const { department } = useParams();
    // function MyComponent() {
    //     useEffect(() => {
    //         setSemester(JSON.parse(localStorage.getItem("semester")) || {});
    //     }, [])
    // }

    // function MyComponent2() {
    //     useEffect(() => {
    //         fetch('http://localhost:5000/departments')
    //             .then(res => res.json())
    //             .then(data => {
    //                 if (data) {
    //                     localStorage.setItem('semester', JSON.stringify(data));
    //                 }
    //                 setSemester(data)
    //             })
    //     }, [])
    // }


    // if (localStorage.getItem("semester")) {
    //     MyComponent();
    // }
    // else {
    //     MyComponent2()
    // }
    useEffect(() => {
        if (localStorage.getItem("teacherAccess")) {
            setIsTeacher(true);
            const semesterData = JSON.parse(localStorage.getItem("semester"));
            const filterSemester = semesterData.filter(el => el.department === department)
            console.log(semesterData, department)
            // let department = semesterData.map(semester => { return semester.department });
            setSemester(filterSemester)
        }
        else {
            setIsTeacher(false);
        }
        // console.log(localStorage.getItem("semester"))
    }, [department])
    // console.log(isTeacher)
    const getSemesterData = (data) => {
        // console.log([data])
        localStorage.setItem("selectedSemester", JSON.stringify(data));
    }
    return (
        <div>
            {
                isTeacher === true ?
                    <section className=" container">
                        <Link to='/'>
                            <div className="d-flex justify-content-center ">
                                <img style={{ width: "200px", height: "200px" }} src={logo} alt="" />

                            </div>
                        </Link>
                        <h2 className="text-center">{department} <span className="text-yellow">Semester List</span> </h2>
                        <div className="department-underline mb-2"></div>
                        {
                            semester.length === 0 && <img className="rounded mx-auto d-block mt-4 pt-3" src="https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="" />
                        }
                        <div className="row justify-content-center">
                            {
                                semester.map(el => <Link to="/semesterDashboard" onClick={() => getSemesterData(el)} className="col-md-3 mx-3 department-card btn">
                                    <h3 className="text-center my-2">{el.semester}</h3>
                                    <h5 className="text-center my-2 text-dark">({el.session} Session)</h5>
                                </Link>)
                            }
                            {/* {
                                semester.map(department => <DepartmentCard key={department._id} department={department}></DepartmentCard>)
                            } */}
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

export default Semester;