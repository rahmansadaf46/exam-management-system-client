import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import UpdateStudent from '../UpdateStudent/UpdateStudent';
import './StudentProfile.css';

const StudentProfile = () => {
    const { id } = useParams();

    let history = useHistory();
    const [isAdmin, setIsAdmin] = useState(false);
    const [student, setStudent] = useState({});
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
        fetch(`http://localhost:5000/students/${id}`)
            .then(res => res.json())
            .then(data => {
                window.scrollTo(0, 0);
                setStudent(data);
                // setLoading(false);
            })
    }, [id])
    const handleDelete = (id) => {
        fetch(`http://localhost:5000/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                localStorage.removeItem("student");
                alert('Deleted')
                if (result) {
                    history.goBack()
                }

            })
    }
    console.log(student);
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
                                    <h2 style={{ color: '#FB9937' }} className="text-center">Student's Profile</h2>
                                    <div class="profile-underline"></div>
                                    <div className="mt-4">
                                        {
                                            student.name ? <div className="row pt-2 ">
                                                <div className="col-md-5 pl-5 ml-5">
                                                    <img className=" mx-auto d-block" style={{ borderRadius: "50%" }} width="335" height="335" src={`data:image/png;base64,${student.image.img}`} alt="" />
                                                    <h2 style={{ color: '#111430' }} className="text-uppercase text-center mt-3">{student.name}</h2>
                                                </div>
                                                <div className="col-md-6 mt-4">
                                                    <h3><span style={{ color: '#7BB35A' }}>Roll No:</span> {student.roll
                                                    }</h3>
                                                    <br />
                                                    <h3><span style={{ color: '#7BB35A' }}>Session:</span> {student.session
                                                    }</h3>
                                                    <br />
                                                    <h3><span style={{ color: '#7BB35A' }}>Department:</span> {student.department}</h3>
                                                    <br />
                                                    <h3><span style={{ color: '#7BB35A' }}>Email:</span> {student.email}</h3>
                                                    <br />
                                                    <h3><span style={{ color: '#7BB35A' }}>Contact No:</span> {student.mobile}</h3>
                                                    <div className="row mt-4">
                                                        <button style={{ background: '#FB9937' }} onClick={openModal} className="m-3 btn text-white">Update Info</button>
                                                        <UpdateStudent modalIsOpen={modalIsOpen} student={student} closeModal={closeModal}></UpdateStudent>
                                                        <button onClick={() => { if (window.confirm('Are You Sure?')) { handleDelete(student._id) }; }} className="m-3 btn btn-danger">Delete</button>
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

export default StudentProfile;