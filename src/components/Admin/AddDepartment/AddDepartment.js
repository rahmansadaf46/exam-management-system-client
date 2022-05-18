import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

const AddDepartment = () => {
    const { register, handleSubmit, errors } = useForm();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    document.title = "Add Department";



    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }


    const onSubmit = data => {
        if (data) {
            setLoading(true);
        }
        const formData = new FormData()
        formData.append('file', file);
        formData.append('department', data.department);

        fetch('http://localhost:5000/addDepartment', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data) {
                    setLoading(false);
                    localStorage.removeItem("dept");
                    alert('Department added successfully');
                    window.location.reload();
                }
            })
            .catch(error => {
                console.error(error)
            })
    }
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
                            <div style={{ backgroundColor: '#F4F7FC' }} className="col-md-10 pt-4 min-vh-100">
                                <div className="col-md-12 row">
                                    {
                                        loading === true ? <img className="rounded mx-auto mt-5 d-block " style={{ width: '40%', height: '40%' }} src="https://i.gifer.com/YCZH.gif" alt="" />
                                            : <div className="ml-4 col-md-6">
                                                <form onSubmit={handleSubmit(onSubmit)}>

                                                    <div className="form-group mt-4">
                                                        <div className="form-group">
                                                            <label for=""><b>Department</b></label>
                                                            <input type="text" ref={register({ required: true })} name="department" placeholder="Enter title" className="form-control" />
                                                            {errors.name && <span className="text-danger">This field is required</span>}
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label for=""><b>Upload Image</b></label>
                                                        <br />
                                                        <input onChange={handleFileChange} type="file" id="exampleInputPassword1" placeholder="Picture" />
                                                    </div>
                                                    <button style={{ padding: '10px 40px', background: '#111430' }} type="submit" className="btn text-white">Submit</button>
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

export default AddDepartment;