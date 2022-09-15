import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
const BASE_URL = process.env.REACT_APP_API_URL;
const AllSemester = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    document.title = "Semester List";
    const [semesterList, setSemesterList] = useState([])
    const [query, setQuery] = useState('')
    useEffect(() => {
        // console.log();
        // setIsTeacher(JSON.parse(localStorage.getItem("teacherAccess")) || {});
        // setSemester(JSON.parse(localStorage.getItem("selectedSemester")) || {});
        // const email = JSON.parse(localStorage.getItem("teacherData"))[0]?.email;
        // const semester = JSON.parse(localStorage.getItem("selectedSemester"))?.semester;
        // const department = JSON.parse(localStorage.getItem("selectedSemester"))?.department;
        // const session = JSON.parse(localStorage.getItem("selectedSemester"))?.session;
        fetch(BASE_URL + '/semesters')
            .then(res => res.json())
            .then(result => {

                // const filterResult = result.filter(data => data.department === department && data.semester === semester && data.session === session);
                console.log(result)
                setSemesterList(result);

            });
    }, [])
    const columns = [
        {
            name: 'Semester',
            selector: row => row.semester,
        },
        {
            name: 'Department',
            selector: row => row.department,
        },
        {
            name: 'Session',
            selector: row => row.session,
        },
        {
            name: 'Action',
            cell: (data) => (
                <div>
                    <Link
                        className="btn btn-sm btn-success m-1"
                        to={`/semesterProfile/${data.id}`}
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
    useEffect(() => {
        setIsAdmin(JSON.parse(localStorage.getItem("admin")) || {});
    }, [])
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
                        <div className="d-flex">
                            <div className="col-md-2">
                                <Sidebar></Sidebar>
                            </div>
                            <div style={{ backgroundColor: '#F4F7FC', minHeight: '87vh', height: 'auto', width: '100%' }} className=" pt-4">
                                <div className=" ">
                                    <div className="text-warning text-center"><h2>Semester List</h2></div>
                                    <div className=" mx-5 px-5 form-inline  d-flex justify-content-end">
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
                                    <div className=" mx-5 px-5 mt-3 mb-5">
                                        <DataTable
                                            columns={columns}
                                            data={search(semesterList)}
                                            pagination
                                            defaultSortAsc={true}
                                            striped
                                            highlightOnHover
                                            customStyles={customStyles}
                                            progressPending={semesterList.length === 0}
                                            paginationRowsPerPageOptions={[5, 10, 15]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> : <Unauthorized />
            }
        </>
    );
};

export default AllSemester;