import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import TeacherHeader from '../TeacherHeader/TeacherHeader';
import TeacherSidebar from '../TeacherSidebar/TeacherSidebar';


const SemesterDashboard = () => {
    const [semester, setSemester] = useState({});
    const [isTeacher, setIsTeacher] = useState(false);
    // const [loading, setLoading] = useState(false);

    // const { register, handleSubmit, errors } = useForm();
    document.title = "Semester Dashboard";
    // const onSubmit = data => {
    //     if (data) {
    //         setLoading(true);
    //     }
    //     // https://demo-0523.herokuapp.com/admin/addAdmin
    //     fetch('http://localhost:5000/addAdmin', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(data)
    //     })
    //         .then(res => res.json())
    //         .then(success => {
    //             if (success) {
    //                 setLoading(false);
    //                 alert("Admin Added");
    //                 window.location.reload();
    //             }
    //         })

    // }
    useEffect(() => {
        setIsTeacher(JSON.parse(localStorage.getItem("teacherAccess")) || {});
        setSemester(JSON.parse(localStorage.getItem("selectedSemester")) || {});
    }, [])
    // console.log(semester)
    return (
        <>
            {
                isTeacher === true ?
                    <div>
                        <TeacherHeader></TeacherHeader>
                        <div className="d-flex">
                            <div className="col-md-2">
                                <TeacherSidebar></TeacherSidebar>
                            </div>
                            <div style={{ backgroundColor: '#F4F7FC', minHeight: '87vh', height: 'auto', width: '100%' }} className=" pt-4">
                                <div className=" ">
                                    <div className="semester-header"><h2>Semester Dashboard</h2></div>
                                    <div className="d-flex justify-content-center">
                                        <div style={{ lineHeight: '0.6', border: '3px solid orange', width: '50%', padding: '10px' }} className="text-center">
                                            <h5 className="text-success">{semester.semester}</h5>
                                            <p style={{ fontSize: '20px' }} className="text-danger">{semester.department} Department</p>
                                            <p>{semester.session} Session</p>
                                        </div>
                                    </div>
                                    {/* {
                                        loading === true ? <img className="rounded mx-auto mt-5 d-block " style={{ width: '40%', height: '40%' }} src="https://i.gifer.com/YCZH.gif" alt="" />
                                            : <div className="col-md-6">
                                                <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="form-group">
                                                        <label for=""><b>Email</b></label>
                                                        <input type="text" ref={register({ required: true })} name="email" placeholder="jon@gmail.com" className="form-control" />
                                                        {errors.name && <span className="text-danger">This field is required</span>}

                                                    </div>
                                                    <div className="form-group">
                                                        <button type="submit" style={{ padding: '10px 40px', background: '#111430' }} className="btn text-white">Submit</button>
                                                    </div>
                                                </form>
                                            </div>
                                    } */}
                                </div>
                            </div>
                        </div>

                    </div> : <Unauthorized />
            }
        </>
    );
};

export default SemesterDashboard;