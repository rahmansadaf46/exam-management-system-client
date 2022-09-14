import React, { useContext, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
// import AllStudentsData from '../AllStudentsData/AllStudentsData';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { UserContext } from '../../../App';
const BASE_URL = process.env.REACT_APP_API_URL;
const AdminList = () => {
    // const { register, handleSubmit, errors } = useForm();
    const [loggedInUser] = useContext(UserContext);
    const [admin, setAdmin] = useState([]);
    // const [teacherNF, setTeacherNF] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    document.title = "All Teacher";



    // const onSubmit = data => {
    //     setAdmin([]);
    //     // fetch('http://localhost:5000/studentsByRoll?roll=' + data.Roll)
    //     fetch('http://localhost:5000/studentsByRoll', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ roll: data.Roll })
    //     })
    //         .then(response => response.json())
    //         .then(roll => {
    //             if (roll.length === 0) {
    //                 setRollNF(true);
    //             }
    //             if (roll.length > 0) {
    //                 setRollNF(false);
    //             }
    //             setAdmin(roll);
    //         })
    //         .catch(error => {
    //             console.error(error)
    //         })

    // }


    useEffect(() => {
        fetch(BASE_URL + '/adminList')
            .then(res => res.json())
            .then(data => {
                // if (data) {
                //     localStorage.setItem('teacherList', JSON.stringify(data));

                // }
                console.log(data);
                setAdmin(data);
            })
    }, [])


    function MyComponent3() {
        useEffect(() => {
            setIsAdmin(JSON.parse(localStorage.getItem("admin")) || {});
        }, [])
    }
    function MyComponent4() {
        useEffect(() => {
            fetch(BASE_URL + '/isAdmin', {
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

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {

            fetch(BASE_URL + `/deleteAdmin/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(result => {
                    // localStorage.removeItem("student");
                    alert('Admin Deleted')
                    if (result) {
                        window.location.reload();
                        // history.goBack()
                    }

                })
        }

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
                                    {/* <div className="pr-5">
                                        <form style={{ width: '300px', position: 'absolute', right: '0' }} className=" d-flex" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form-group">
                                                <input type="text" ref={register({ required: true })} name="Roll" placeholder="Enter Roll" className="form-control" />
                                                {errors.name && <span className="text-danger">This field is required</span>}
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" style={{ background: '#111430' }} className="btn text-white ml-2 mr-3">Search</button>
                                            </div>
                                        </form>
                                    </div> */}
                                    <h3 className="text-center text-warning">Admin List</h3>
                                    <br />
                                    <br />

                                 
                                    {
                                                admin.length === 0 ? <img className="rounded mx-auto d-block " style={{ width: '30%', height: '30%' }} src="https://cdn.lowgif.com/small/745b4d14b1057edd-ajax-loading-gif-11-gif-images-download.gif" alt="" />
                                                    :    <div className="d-flex justify-content-center" >
                                                    <div className='w-50'>
                                                    <table className="table table-borderless">
                                                                    <thead style={{ background: '#FB9937', }}>
                                                                        <tr>
                                                                            <th className="text-black text-left" scope="col">Sr No.</th>
                                                                            <th className="text-black" scope="col">Email</th>
                                                                            <th className="text-black" scope="col"></th>
                                                                        </tr>
                                                                    </thead>
            
            
                                                                    <tbody >
            
                                                                        {
                                                                            admin.map((data, index) =>
            
                                                                                <tr key={data.id} style={{ background: 'white' }}>
                                                                                    <td >{index + 1}.</td>
            
                                                                                    <td className=""><span className="mt-5">{data.email}</span></td>
                                                                                    <td><button style={{ display: data.email === loggedInUser.email ? 'none' : '' }} onClick={() => handleDelete(data.id)} className="btn btn-danger btn-sm">Remove</button></td>
                                                                                </tr>
                                                                            )
                                                                        }
            
                                                                    </tbody>
            
                                                                </table>
                                                   
            
            
                                                    </div>
                                                    {/* <AlldepartmentData key={department.id} department={department}></AlldepartmentData> */}
                                                    {/* {teacherNF === true ? <h1 style={{ color: '#DC3545' }} className="text-center mt-5">Teacher's Data Not Found</h1> : <AlldepartmentData key={department.id} department={department}></AlldepartmentData>} */}
            
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

export default AdminList;