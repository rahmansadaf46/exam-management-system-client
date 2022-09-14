import React, { useContext, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import AllStudentsData from '../AllStudentsData/AllStudentsData';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { UserContext } from '../../../App';
const BASE_URL = process.env.REACT_APP_API_URL;
const StudentsInfo = () => {
    // const { register, handleSubmit, errors } = useForm();
    const [loggedInUser] = useContext(UserContext);
    const [students, setStudents] = useState([]);
    // const [rollNF, setRollNF] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [query, setQuery] = useState('')
    document.title = "All Student";






    useEffect(() => {
        fetch(BASE_URL + '/students')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    localStorage.setItem('student', JSON.stringify(data));

                }
                console.log(data);
                setStudents(data);
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
    const search = (rows) => {
        if (rows) {
            const columns = rows[0] && Object?.keys(rows[0]);
            return rows?.filter((row) =>
                columns?.some(
                    (column) =>
                        row[column]
                            ?.toString()
                            .toLowerCase()
                            .indexOf(query?.toLowerCase()) > -1
                )
            )
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
                                <div className="container  form-inline  d-flex justify-content-end mt-3">
                                        <label style={{ color: '#7AB259' }} className=" ml-1" htmlFor="filter">Filter</label>
                                        <input
                                            style={{ borderRadius: "100px" }}
                                            className="form-control ml-2 p-1"
                                            type="text"
                                            value={query}
                                            onChange={(e) => {
                                                setQuery(e.target.value);
                                            }}
                                        />
                                    </div>
                                    <br />
                                    <div >
                                    <AllStudentsData key={students.id} students={search(students)}></AllStudentsData>

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