import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import AllStudentsData from '../AllStudentsData/AllStudentsData';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { UserContext } from '../../../App';

const StudentsInfo = () => {
    const { register, handleSubmit, errors } = useForm();
    const [loggedInUser] = useContext(UserContext);
    const [students, setStudents] = useState([]);
    const [rollNF, setRollNF] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    document.title = "All Student";



    const onSubmit = data => {
        setStudents([]);
        // fetch('http://localhost:5000/studentsByRoll?roll=' + data.Roll)
        fetch('http://localhost:5000/studentsByRoll', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ roll: data.Roll })
        })
            .then(response => response.json())
            .then(roll => {
                if (roll.length === 0) {
                    setRollNF(true);
                }
                if (roll.length > 0) {
                    setRollNF(false);
                }
                setStudents(roll);
            })
            .catch(error => {
                console.error(error)
            })

    }


    function MyComponent() {
        useEffect(() => {
            setStudents(JSON.parse(localStorage.getItem("student")) || {});
        }, [])
    }

    function MyComponent2() {
        useEffect(() => {
            fetch('http://localhost:5000/students')
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        localStorage.setItem('student', JSON.stringify(data));

                    }
                    console.log(data);
                    setStudents(data);
                })
        }, [])
    }


    if (localStorage.getItem("student")) {
        MyComponent();
    }
    else {
        MyComponent2()
    }
    function MyComponent3() {
        useEffect(() => {
            setIsAdmin(JSON.parse(localStorage.getItem("admin")) || {});
        }, [])
    }
    function MyComponent4() {
        useEffect(() => {
            fetch('http://localhost:5000/isAdmin', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ email: loggedInUser.email })
            })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('admin', JSON.stringify(data));
                    setIsAdmin(data);
                });
        }, [])
    }
    if (localStorage.getItem("admin")) {
        MyComponent3();
    }
    else {
        MyComponent4();
    }
    return (
        <>
            {
                isAdmin === true ?
                    <div>
                        <Header></Header>
                        <div className="d-flex ">
                            <div className="col-md-2">
                                <Sidebar></Sidebar>
                            </div>
                            <div style={{ backgroundColor: '#F4F7FC' }} className="col-md-10 pt-4 min-vh-100 ">
                                <div className="col-md-12">
                                    <div className="pr-5">
                                        <form style={{ width: '300px', position: 'absolute', right: '0' }} className=" d-flex" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form-group">
                                                <input type="text" ref={register({ required: true })} name="Roll" placeholder="Enter Roll" className="form-control" />
                                                {errors.name && <span className="text-danger">This field is required</span>}
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" style={{ background: '#111430' }} className="btn text-white ml-2 mr-3">Search</button>
                                            </div>
                                        </form>
                                    </div>
                                    <br />
                                    <br />
                                    <div >
                                        {rollNF === true ? <h1 style={{ color: '#DC3545' }} className="text-center mt-5">Student's Data Not Found</h1> : <AllStudentsData key={students._id} students={students}></AllStudentsData>}

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> : <Unauthorized />
            }
        </>
    );
};

export default StudentsInfo;