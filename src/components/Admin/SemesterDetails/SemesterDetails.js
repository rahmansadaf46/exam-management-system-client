import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import UpdateSemester from '../UpdateSemester/UpdateSemester';
// import UpdateStudent from '../UpdateStudent/UpdateStudent';
// import './StudentProfile.css';
const BASE_URL = process.env.REACT_APP_API_URL;
const SemesterDetails = () => {
    const { id } = useParams();

    // let history = useHistory();
    const [isAdmin, setIsAdmin] = useState(false);
    const [semester, setSemester] = useState({});
    // const [loading, setLoading] = useState(true);
    const [modalIsOpen, setIsOpen] = useState(false);
    document.title = `${id} `;
    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
        window.location.reload();
    }
    useEffect(() => {
        fetch(BASE_URL + `/semester/${id}`)
            .then(res => res.json())
            .then(data => {
                window.scrollTo(0, 0);
                console.log(data)

                // setLoading(false);
                // const teacherData = data.teacher;
                // data.teacherListValue = teacherData;
                        setSemester(data);
                // fetch(`http://localhost:5000/teachers/`)
                //     .then(res => res.json())
                //     .then(result => {
                //         // const teacher = result;
                //         const filterTeacher = teacherData.map(el => {
                //             return result.filter(data => data.id === el)
                //         })
                //         const teacherList = Array.prototype.concat.apply([], filterTeacher);
                //         data.teacher = teacherList;
                //         const teacherListValue = teacherList.map(el => { return { value: el.id, label: el.name } })
                //         console.log(filterTeacher);
                //         data.teacherListValue = teacherData;
                //         setSemester(data);
                //     })
            })
    }, [id])
    // const handleDelete = (id) => {
    //     fetch(`http://localhost:5000/delete/${id}`, {
    //         method: 'DELETE'
    //     })
    //         .then(res => res.json())
    //         .then(result => {
    //             localStorage.removeItem("student");
    //             alert('Deleted')
    //             if (result) {
    //                 history.goBack()
    //             }

    //         })
    // }
    console.log(semester);
    useEffect(() => {
        setIsAdmin(JSON.parse(localStorage.getItem("admin")) || {});
    }, [])
    return (
        <>
            {
                isAdmin === true ?
                    <div>
                        <Header></Header>
                        <div className="d-flex">
                            <div className="col-md-2">
                                <Sidebar></Sidebar>
                            </div>
                            <div style={{ backgroundColor: '#F4F7FC', minHeight: '87vh', height: 'auto', width: '100%' }} className="col-md-10 pt-4 ">
                                <div className="col-md-12">

                                    <div className="">
                                        {
                                            semester.semester ? <div className="row container text-center pt-2 ">
                                                {/* <div className="col-md-5 pl-5 ml-5">
                                                    <img className=" mx-auto d-block" style={{ borderRadius: "50%" }} width="335" height="335" src={`http://localhost:5000/student/${student.image}`} alt="" />
                                                    <h2 style={{ color: '#111430' }} className="text-uppercase text-center mt-3">{semester.semester}</h2>
                                                </div> */}
                                                <div className="col-md-12 ">
                                                    <h2 style={{ color: '#FB9937' }} className="text-center">Semester Details</h2>
                                                    <div className="profile-underline"></div>
                                                    <h3 className="mt-4"><span style={{ color: '#7BB35A' }}>Semester Name:</span> {semester.semester
                                                    }</h3>
                                                    <br />
                                                    <h3><span style={{ color: '#7BB35A' }}>Session:</span> {semester.session
                                                    }</h3>
                                                    <br />
                                                    <h3><span style={{ color: '#7BB35A' }}>Department:</span> {semester.department}</h3>
                                                    <br />
                                                    {/* <h3><span style={{ color: '#7BB35A' }}>Status:</span> {semester.status}</h3> */}
                                                    <br />

                                                    <div className="d-flex justify-content-center">
                                                        <div className="w-75">
                                                            <h3 className="text-warning">Active Teacher List</h3>
                                                            <table className="table table-borderless mt-3">
                                                                <thead style={{ background: '#FB9937', }}>
                                                                    <tr>
                                                                        <th className="text-black text-left" scope="col">Sr No.</th>
                                                                        <th className="text-black" scope="col"></th>
                                                                        <th className="text-black" scope="col">Name</th>
                                                                        {/* <th className="text-black" scope="col">Roll Number</th> */}
                                                                        <th className="text-black" scope="col">Department</th>
                                                                        <th className="text-black" scope="col">Email</th>
                                                                        {/* <th className="text-black" scope="col">Session</th> */}
                                                                        {/* <th className="text-black" scope="col"></th> */}
                                                                    </tr>
                                                                </thead>


                                                                <tbody >

                                                                    {
                                                                        semester.teacher.map((teacher, index) =>

                                                                            <tr key={teacher.id} style={{ background: 'white' }}>
                                                                                <td >{index + 1}.</td>
                                                                                <td className="avatar-img"><img className="avatar" src={BASE_URL + `${teacher.image}`} alt="avatar" /> </td>
                                                                                <td className="text-uppercase"><span className="mt-5">{teacher.name}</span></td>
                                                                                {/* <td>{student.roll}</td> */}
                                                                                <td>{teacher.department}</td>
                                                                                <td>{teacher.email}</td>
                                                                                {/* <td>{student.session}</td> */}
                                                                                {/* <td className=""><Link to={`/admin/teacherProfile/${teacher.id}`} style={{ background: '#7AB259' }} className="btn text-white">See More</Link></td> */}
                                                                            </tr>
                                                                        )
                                                                    }

                                                                </tbody>

                                                            </table>
                                                        </div>
                                                    </div>
                                                    {/* <h3><span style={{ color: '#7BB35A' }}>Contact No:</span> {semester.mobile}</h3> */}
                                                    <div className="d-flex justify-content-center mt-4">
                                                        <button style={{ background: '#FB9937' }} onClick={openModal} className="m-3 btn text-white">Update Info</button>
                                                        <UpdateSemester modalIsOpen={modalIsOpen} semester={semester} closeModal={closeModal}></UpdateSemester>
                                                        {/* <button onClick={() => { if (window.confirm('Are You Sure?')) { handleDelete(semester.id) }; }} className="m-3 btn btn-danger">Delete</button> */}
                                                    </div>
                                                </div>
                                            </div>
                                                : <img className="rounded mx-auto d-block" style={{ width: '30%', height: '30%' }} src="https://cdn.lowgif.com/small/745b4d14b1057edd-ajax-loading-gif-11-gif-images-download.gif" alt="" />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> : <Unauthorized />
            }
        </>
    );
};

export default SemesterDetails;