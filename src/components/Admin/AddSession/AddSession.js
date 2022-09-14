import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import YearPicker from "react-single-year-picker";
const BASE_URL = process.env.REACT_APP_API_URL;
const AddSession = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentDepartment, setCurrentDepartment] = useState('CSE');

    const { handleSubmit, errors } = useForm();
    const [yearSelected, setYear] = useState();

    document.title = "Add Session";
    const changeDepartment = (newDepartment) => {
        setCurrentDepartment(newDepartment)
    }
    const onSubmit = data => {
        if (data) {
            // setLoading(true);
        }
        const session = yearSelected;
        data.department = currentDepartment;
        data.session = session;
        console.log(data)
        // https://demo-0523.herokuapp.com/admin/addAdmin
        fetch(BASE_URL + '/addSession', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(success => {
                console.log(success)
                if(success.statusCode === 400){
                    setLoading(false);
                    alert('Session session already exists under this department'); 
                }
                else{
                    setLoading(false);
                    alert("Session Added");
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
                                                    <div className="form-group">
                                                        <label for=""><b>Department</b></label>

                                                        <select
                                                            style={{ width: '250px' }}
                                                            onChange={(event) => changeDepartment(event.target.value)}
                                                            value={currentDepartment} className="form-control  form-select">
                                                            <option disabled={true} value="Not set">Select Department</option>
                                                            {
                                                                dept.length === 0 && <option>CSE</option>
                                                            }
                                                            {
                                                                dept.map(department => <option value={department.department}>{department.department}</option>)
                                                            }

                                                        </select>
                                                        {errors.age && <span className="text-danger">This field is required</span>}

                                                    </div>
                                                    <div className="form-group">
                                                        <label for=""><b>Enter Session</b></label>
                                                        <YearPicker
                                                            // yearArray={['2019', '2020']}
                                                            value={yearSelected}
                                                            onSelect={(e) => { setYear(`${e}-${e + 1}`) }}
                                                            hideInput={false}
                                                        //     activeIcon={src url}
                                                        // icon={src url}
                                                        // leftIcon={src url}
                                                        // rightIcon={src url}
                                                        // minRange={1000}
                                                        // maxRange={2018}
                                                        />

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

export default AddSession;