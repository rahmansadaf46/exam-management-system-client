import React, { useContext, useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
// import AllStudentsData from '../AllStudentsData/AllStudentsData';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import { UserContext } from '../../../App';
// import AllTeachersData from '../AllTeachersData/AllTeachersData';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_API_URL;
const TeacherList = () => {
    // const { register, handleSubmit, errors } = useForm();
    const [loggedInUser] = useContext(UserContext);
    const [teachers, setTeachers] = useState([]);
    // const [teacherNF, setTeacherNF] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [query, setQuery] = useState('')
    document.title = "All Teacher";



    // const onSubmit = data => {
    //     setTeachers([]);
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
    //             setTeachers(roll);
    //         })
    //         .catch(error => {
    //             console.error(error)
    //         })

    // }


    useEffect(() => {
        fetch(BASE_URL + '/teachers')
            .then(res => res.json())
            .then(data => {
                // if (data) {
                //     localStorage.setItem('teacherList', JSON.stringify(data));

                // }
                console.log(data);
                setTeachers(data);
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

    const columns = [
        {
            name: 'Sr No.',
            cell: (data, index) => (
               <span>{index+1}.</span>
            ),
        },
        {
            name: '',
            width:'50px',
            cell: (data, index) => (
                <><td className="avatar-img mr-4"><img className="avatar" src={BASE_URL + `${data.image}`} alt="avatar" /> </td>
                 </>
               
             ),
        },
        {
            name: 'Name',
            cell: (data, index) => (
                <>
                 <td >{data.name}</td></>
               
             ),
        },
        {
            name: 'Department',
            selector: row => row.department,
        },
        {
            name: 'Email',
            width:'350px',
            selector: row => row.email,
        },
        {
            name: '',
            cell: (data) => (
                <div>
                    <Link
                        className="btn btn-sm btn-success m-1"
                        to={`/admin/teacher/${data.id}`}
                        onClick={() => {
                            console.log(data.id);
                        }}
                    >
                        See Details
                    </Link>
                    {" "}

                </div>
            ),
        },
    ];
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

    const customStyles = {
        rows: {
            style: {
                minHeight: "32px",
            },
        },
        headCells: {
            style: {
                fontSize: "18px",
                color: 'black',
                // fontWeight: "bold",
                backgroundColor: '#FB9937',
            },
        },
        cells: {
            style: {
                fontSize: "15px",
                padding: "15px 20px",
            },
        },
    };
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
                                    <br />
                                    <div  className='container'>
                                    <DataTable
                                            columns={columns}
                                            data={search(teachers)}
                                            pagination
                                            defaultSortAsc={true}
                                            striped
                                            highlightOnHover
                                            customStyles={customStyles}
                                            progressPending={teachers.length === 0}
                                            paginationRowsPerPageOptions={[5, 10, 15]}
                                        />
                                        {/* <AllTeachersData key={teachers._id} teachers={teachers}></AllTeachersData> */}
                                        {/* {teacherNF === true ? <h1 style={{ color: '#DC3545' }} className="text-center mt-5">Teacher's Data Not Found</h1> : <AllTeachersData key={teachers._id} teachers={teachers}></AllTeachersData>} */}

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> : <Unauthorized />
            }
        </>
    );
};

export default TeacherList;