import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
// import YearPicker from "react-single-year-picker";
import Select from "react-select";
const BASE_URL = process.env.REACT_APP_API_URL;
const AddSemester = () => {
    const { register, handleSubmit, errors } = useForm();
    const [listLoading, setListLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [teacher, setTeacher] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState([])
    const [allSession, setAllSession] = useState('');
    const [session, setSession] = useState([]);
    const [selectedSession, setSelectedSession] = useState('');
    const [currentDepartment, setCurrentDepartment] = useState('');

    // const { handleSubmit, errors } = useForm();
    // const [yearSelected, setYear] = useState();

    document.title = "Add Semester";
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
            // setLoading(true);
        }
        // const session = yearSelected;
        data.department = currentDepartment;
        data.session = selectedSession;
        data.teacher = selectedTeacher.map(teacher => teacher.value);
        data.status = "Active"
        console.log(data)
        // https://demo-0523.herokuapp.com/admin/addAdmin
        fetch(BASE_URL + '/addSemester', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(success => {
                if (success) {
                    setLoading(false);
                    alert("Semester Added");
                    window.location.reload();
                }
            })

    }
    useEffect(() => {
        setIsAdmin(JSON.parse(localStorage.getItem("admin")) || {});
    }, [])
    const [dept, setDept] = useState([]);
    function MyComponent() {
        useEffect(() => {
            setDept(JSON.parse(localStorage.getItem("dept")) || {});
        }, [])
    }

    function MyComponent2() {
        useEffect(() => {
            fetch(BASE_URL + '/departments')
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
    // const handleChange = (date) => {
    //     console.log(date);
    // }
    // console.log(yearSelected)
    const handleTeacher = (e) => {
        setSelectedTeacher(e)
    }

    useEffect(() => {
        fetch(BASE_URL + '/teachers')
            .then(res => res.json())
            .then(data => {

                const teacherList = data.map(el => { return { value: el._id, label: el.name } })
                // console.log(teacherList)
                setTeacher(teacherList)
                setListLoading(false)

                // if (data) {
                //     localStorage.setItem('dept', JSON.stringify(data));
                // }
                // setDept(data)
            })
        fetch(BASE_URL + '/sessions')
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setAllSession(data)
                // if (data) {
                //     localStorage.setItem('dept', JSON.stringify(data));
                // }
                // setDept(data)
            })
        // fetch('http://localhost:5000/semesterById', {
        //     method: 'POST',
        //     headers: { 'content-type': 'application/json' },
        //     body: JSON.stringify({ id: "62853a74a4e3964754f770f1" })
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         if (data.length > 0) {
        //             console.log(data)
        //         }

        //     });
        // fetch('http://localhost:5000/isTeacher', {
        //     method: 'POST',
        //     headers: { 'content-type': 'application/json' },
        //     body: JSON.stringify({ email: "darklordvampz@gmail.com" })
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         // console.log(data)
        //         // localStorage.setItem('admin', JSON.stringify(data));
        //         // setIsAdmin(data);
        //     });
        // fetch('http://localhost:5000/isStudent', {
        //     method: 'POST',
        //     headers: { 'content-type': 'application/json' },
        //     body: JSON.stringify({ email: "rahmansadaf46@gmail.com" })
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //         // localStorage.setItem('admin', JSON.stringify(data));
        //         // setIsAdmin(data);
        //     });

    }, [])
    const customStyles = {
        // control: (provided, state) => ({
        //     ...provided,
        //     marginTop: "2px",
        //     borderRadius: "4px",
        //     minHeight: "36px",
        //     height: "30px",
        //     boxShadow: state.isFocused ? null : null,
        // }),
        // valueContainer: (provided, state) => ({
        //     ...provided,
        //     height: "30px",
        //     padding: "0 6px",
        //     marginTop: "-6px",
        // }),

        // input: (provided, state) => ({
        //     ...provided,
        //     margin: "-20px -2px",
        // }),
        // indicatorSeparator: (state) => ({
        //     display: "none",
        // }),
        // indicatorsContainer: (provided, state) => ({
        //     ...provided,
        // }),
    };
console.log(teacher)
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
                            <div style={{ backgroundColor: '#F4F7FC', height: '87vh' }} className="col-md-10 pt-4">
                                <div className="col-md-12 row">
                                    {
                                        loading === true ? <img className="rounded mx-auto mt-5 d-block " style={{ width: '40%', height: '40%' }} src="https://i.gifer.com/YCZH.gif" alt="" />
                                            : <div className="col-md-6">
                                                <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="form-group mt-4">
                                                        <div className="form-group">
                                                            <label for=""><b>Semester Name</b></label>
                                                            <input type="text" ref={register({ required: true })} name="semester" placeholder="Enter Semester Name" className="form-control" />
                                                            {errors.name && <span className="text-danger">This field is required</span>}
                                                        </div>
                                                    </div>
                                                    <div className="form-group row mb-1">
                                                        <div className="col-5">
                                                            <label for=""><b>Department</b></label>

                                                            <select
                                                                onChange={(event) => changeDepartment(event.target.value)}
                                                                value={currentDepartment} className="form-control  form-select">
                                                                <option value="">Select Department</option>

                                                                {
                                                                    dept.map(department => <option value={department.department}>{department.department}</option>)
                                                                }

                                                            </select>
                                                            {errors.age && <span className="text-danger">This field is required</span>}

                                                        </div>
                                                        <div className="form-group col-6">
                                                            <label for=""><b>Active Session</b></label>
                                                            <select
                                                                disabled={currentDepartment === ""}
                                                                onChange={(event) => setSelectedSession(event.target.value)}
                                                                value={selectedSession}
                                                                className="form-control  form-select">
                                                                <option value="">Select Session</option>

                                                                {
                                                                    session.map(el => <option value={el.session}>{el.session}</option>)
                                                                }

                                                            </select>
                                                            {errors.session && <span className="text-danger">Invalid Session</span>}
                                                        </div>
                                                    </div>
                                                    <div className="form-group mt-4">
                                                        <div className="form-group">
                                                            <label for=""><b>Active Teacher</b></label>
                                                            <Select isMulti
                                                                styles={customStyles}
                                                                required
                                                                options={teacher}
                                                                onChange={(e) => {
                                                                    handleTeacher(e);
                                                                }}
                                                                isLoading={listLoading}
                                                                isSearchable={true}
                                                                isClearable={true}
                                                            />
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

                    </div> : <Unauthorized />
            }
        </>
    );
};

export default AddSemester;