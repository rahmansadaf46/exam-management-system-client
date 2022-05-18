import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const EnrollStudent = () => {
    const { register, handleSubmit, errors } = useForm();
    const [allSession, setAllSession] = useState('');
    const [session, setSession] = useState([]);
    const [selectedSession, setSelectedSession] = useState('');
    const [currentDepartment, setCurrentDepartment] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    document.title = "Enroll A Student";


    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }
    const changeDepartment = (newDepartment) => {
        setCurrentDepartment(newDepartment)
        if (newDepartment !== "") {
            setSession(allSession.filter(data => data?.department === newDepartment))
        }
        else {
            setSession([])
        }
    }

    const onSubmit = data => {
        if (data) {
            setLoading(true);
        }
        data.department = currentDepartment;
        data.session = selectedSession;
        data.category = "Student";
        data.pic = file;
        const formData = new FormData()
        formData.append('file', file);
        formData.append('name', data.name);
        formData.append('roll', data.roll);
        formData.append('session', data.session);
        formData.append('email', data.email);
        formData.append('mobile', data.mobile);
        formData.append('department', data.department);
        formData.append('category', data.category);
        fetch('http://localhost:5000/addStudent', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setLoading(false);
                    localStorage.removeItem("student");
                    window.location.reload();
                }
                window.alert('Student added successfully');
            })

            .catch(error => {
                console.error(error)
            })

    }
    const [dept, setDept] = useState([]);
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

    useEffect(() => {
        setIsAdmin(JSON.parse(localStorage.getItem("admin")) || {});
    }, [])
    useEffect(() => {
        fetch('http://localhost:5000/sessions')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setAllSession(data)
                // if (data) {
                //     localStorage.setItem('dept', JSON.stringify(data));
                // }
                // setDept(data)
            })
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
                            <div style={{ backgroundColor: '#F4F7FC' }} className="col-md-10 pt-4 min-vh-100">
                                <div className="col-md-12 row">

                                    {
                                        loading === true ? <img className="rounded mx-auto mt-5 d-block " style={{ width: '40%', height: '40%' }} src="https://i.gifer.com/YCZH.gif" alt="" />
                                            : <div className="col-md-6">
                                                <form className="p-3" onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="form-group">
                                                        <label for=""><b>Enter Name</b></label>
                                                        <input type="text" ref={register({
                                                            required: "Required",
                                                            pattern: {
                                                                value: /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/,
                                                                message: true
                                                            }
                                                        })} name="name" placeholder="Student's Name" className="form-control" />
                                                        {errors.name && <span className="text-danger">Invalid Name</span>}
                                                    </div>
                                                    <div className="form-group row mb-1">
                                                        <div className="col-5">
                                                            <label for=""><b>Department</b></label>

                                                            <select
                                                                onChange={(event) => changeDepartment(event.target.value)}
                                                                value={currentDepartment} className="form-control">
                                                                <option value="">Select Department</option>

                                                                {
                                                                    dept.map(department => <option value={department.department}>{department.department}</option>)
                                                                }

                                                            </select>
                                                            {errors.age && <span className="text-danger">This field is required</span>}

                                                        </div>
                                                        <div className="form-group col-6">
                                                            <label for=""><b>Enter Session</b></label>
                                                            <select
                                                                disabled={currentDepartment === ""}
                                                                onChange={(event) => setSelectedSession(event.target.value)}
                                                                value={selectedSession}
                                                                className="form-control">
                                                                <option value="">Select Session</option>

                                                                {
                                                                    session.map(el => <option value={el.session}>{el.session}</option>)
                                                                }

                                                            </select>
                                                            {errors.session && <span className="text-danger">Invalid Session</span>}
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for=""><b>Enter Email</b></label>
                                                        <input type="text" ref={register({
                                                            required: "Required",
                                                            pattern: {
                                                                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                                                message: true
                                                            }
                                                        })} name="email" placeholder="Email Id" className="form-control" />
                                                        {errors.email && <span className="text-danger">Invalid Email</span>}

                                                    </div>
                                                    <div className="form-group">
                                                        <label for=""><b>Enter Mobile No.</b></label>
                                                        <input type="number" ref={register({
                                                            required: "Required",
                                                            pattern: {
                                                                value: /\d{11}/,
                                                                message: true
                                                            }
                                                        })} name="mobile" placeholder="Mobile No." className="form-control" />
                                                        {errors.mobile && <span className="text-danger">Invalid Number</span>}
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="form-group col-6">
                                                            <label for=""><b>Enter Roll</b></label>
                                                            <input type="number" ref={register({
                                                                required: "Required",
                                                                pattern: {
                                                                    value: /\d{4}/,
                                                                    message: true
                                                                }
                                                            })} name="roll" placeholder="Student's Roll" className="form-control" />
                                                            {errors.roll && <span className="text-danger">Invalid Roll</span>}
                                                        </div>

                                                        <div className="col-6">
                                                            <label for=""><b>Upload Image</b></label>

                                                            <input ref={register({ required: true })} onChange={handleFileChange} className="form" name="image" type="file" />
                                                            {errors.file && <span className="text-danger">This field is required</span>}
                                                            <small style={{ color: 'red' }}>file size not more than 100 KB</small>
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <button type="submit" style={{ padding: '10px 40px', background: '#111430' }} className="btn text-white">Submit</button>
                                                    </div>
                                                </form>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>
                    : <Unauthorized />
            }
        </>
    );
};

export default EnrollStudent;