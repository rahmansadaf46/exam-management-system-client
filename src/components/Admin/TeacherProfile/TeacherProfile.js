import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import UpdateTeacher from '../UpdateTeacher/UpdateTeacher';
// import Updateteacher from '../Updateteacher/Updateteacher';
// import './teacherProfile.css';

const TeacherProfile = () => {
    const { id } = useParams();

    let history = useHistory();
    const [isAdmin, setIsAdmin] = useState(false);
    const [teacher, setTeacher] = useState({});
    const [semester, setSemester] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [modalIsOpen, setIsOpen] = useState(false);
    document.title = `${id} `;
    function openModal() {
        setIsOpen(true);
    }


    function closeModal() {
        setIsOpen(false);
    }
    useEffect(() => {
        fetch(`http://localhost:5000/teacherProfile/${id}`)
            .then(res => res.json())
            .then(data => {
                window.scrollTo(0, 0);
                setTeacher(data);
                fetch('http://localhost:5000/semesterById', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({ id: data._id })
                })
                    .then(res => res.json())
                    .then(result => {
                        if (result.length > 0) {
                            console.log(result)
                            // setTeacherButton(true);
                        }

                    });
                    fetch('http://localhost:5000/semesters')
                    .then(res => res.json())
                    .then(result => {
                        if (result.length > 0) {
                            setSemester(result)
                            console.log(result)
                            // setTeacherButton(true);
                        }

                    });
                // setLoading(false);
            })
    }, [id])
    const handleDelete = (id) => {
        console.log(id)
        const filterSemester = semester.filter(data=> data.teacher = data.teacher.filter(person => person !== id))
        console.log(filterSemester)
        // fetch(`http://localhost:5000/updateSemesterTeacher/${id}`, {
        //         method: 'PATCH',
        //         headers: { 'Content-Type': 'application/json' },
        //         // body: JSON.stringify(id)
        //     })
        //         .then(res => res.json())
        //         .then(data => {
        //             if (data) {
        //                 console.log(data    )
        //                 // closeModal();
        //                 // // localStorage.removeItem("student");
        //                 // window.location.reload();
        //                 // alert("Semester Updated Successfully");
        //             }
        //         })
        fetch(`http://localhost:5000/deleteTeacher/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                alert('Deleted')
                if (result) {
                    history.goBack()
                }

            })
    }
    console.log(teacher);
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
                            <div style={{ backgroundColor: '#F4F7FC' }} className="col-md-10 pt-4 vh-100">
                                <div className="col-md-12">
                                    <h2 style={{ color: '#FB9937' }} className="text-center">Teacher's Profile</h2>
                                    <div className="profile-underline"></div>
                                    <div className="mt-4">
                                        {
                                            teacher.name ? <div className="row pt-2 ">
                                                <div className="col-md-5 pl-5 ml-5">
                                                    <img className=" mx-auto d-block" style={{ borderRadius: "50%" }} width="335" height="335" src={`http://localhost:5000/teacher/${teacher.image}`} alt="" />
                                                    <h2 style={{ color: '#111430' }} className="text-uppercase text-center mt-3">{teacher.name}</h2>
                                                </div>
                                                <div className="col-md-6 mt-4">
                                                    {/* <h3><span style={{ color: '#7BB35A' }}>Roll No:</span> {teacher.roll
                                                    }</h3> */}
                                                    <br />
                                                    {/* <h3><span style={{ color: '#7BB35A' }}>Session:</span> {teacher.session
                                                    }</h3> */}
                                                    <br />
                                                    <h3><span style={{ color: '#7BB35A' }}>Designation:</span> {teacher.designation}</h3>
                                                   
                                                    <br />
                                                    <h3><span style={{ color: '#7BB35A' }}>Department:</span> {teacher.department}</h3>
                                                    <br />
                                                    <h3><span style={{ color: '#7BB35A' }}>Email:</span> {teacher.email}</h3>
                                                    <br />
                                                    <h3><span style={{ color: '#7BB35A' }}>Contact No:</span> {teacher.mobile}</h3>
                                                    <div className="d-flex  mt-4">
                                                        <button style={{ background: '#FB9937' }} onClick={openModal} className="m-3 btn text-white">Update Info</button>
                                                        <UpdateTeacher modalIsOpen={modalIsOpen} teacher={teacher} closeModal={closeModal}></UpdateTeacher>
                                                        <button onClick={() => { if (window.confirm('Are You Sure?')) { handleDelete(teacher._id) }; }} className="m-3 btn btn-danger">Delete</button>
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

export default TeacherProfile;