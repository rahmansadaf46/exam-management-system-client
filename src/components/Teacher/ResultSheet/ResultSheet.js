import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import TeacherHeader from '../TeacherHeader/TeacherHeader';
import TeacherSidebar from '../TeacherSidebar/TeacherSidebar';


const ResultSheet = () => {
    const [isTeacher, setIsTeacher] = useState(false);
    const [questionList, setQuestionList] = useState([])
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(true);
    document.title = "Result Sheet";

    useEffect(() => {
        // console.log();
        setIsTeacher(JSON.parse(localStorage.getItem("teacherAccess")) || {});
        // setSemester(JSON.parse(localStorage.getItem("selectedSemester")) || {});
        const email = JSON.parse(localStorage.getItem("teacherData"))[0]?.email;
        const semester = JSON.parse(localStorage.getItem("selectedSemester"))?.semester;
        const department = JSON.parse(localStorage.getItem("selectedSemester"))?.department;
        const session = JSON.parse(localStorage.getItem("selectedSemester"))?.session;
        fetch('http://localhost:5000/teacherQuestion', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email: email })
        })
            .then(res => res.json())
            .then(result => {
                setLoading(false)
                const filterResult = result.filter(data => data.department === department && data.semester === semester && data.session === session);
                console.log(filterResult)
                setQuestionList(filterResult.reverse());

            });
    }, [])


    // console.log(JSON.parse(localStorage.getItem("teacherData"))[0]?.email)
    const columns = [
        {
            name: 'Exam Name',
            selector: row => row.examName,
        },
        {
            name: 'Category',
            selector: row => <span >{row.category === 'mcq' ? <><span className='text-uppercase'>{row.category}</span> ({row.mcqCategory === 'mcqFillInTheBlanks'?<>MCQ and Fill in the Blanks</>:row.mcqCategory === 'onlyFillInTheBlanks'?<>Only Fill in the Blanks</>:<>Only MCQ</>})</> : <><span className='text-uppercase'>{row.category}</span></>}</span>,
        },
        {
            name: 'Action',
            cell: (data) => (
                <div>
                    <Link
                        className="btn btn-sm btn-info m-1"
                        to={`/resultPage/${data._id}`}
                        onClick={() => {
                            console.log(data._id);
                        }}
                    >
                        See Details
                    </Link>
                    {" "}

                </div>
            ),
        },
    ];

    // const data = [
    //     {
    //         id: 1,
    //         title: 'Beetlejuice',
    //         year: '1988',
    //     },
    //     {
    //         id: 2,
    //         title: 'Ghostbusters',
    //         year: '1984',
    //     },
    // ]
    const customStyles = {
        rows: {
            style: {
                minHeight: "32px",
            },
        },
        headCells: {
            style: {
                fontSize: "18px",
                color: '#fff',
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
                isTeacher === true ?
                    <div>
                        <TeacherHeader></TeacherHeader>
                        <div className="d-flex">
                            <div className="col-md-2">
                                <TeacherSidebar></TeacherSidebar>
                            </div>
                            <div style={{ backgroundColor: '#F4F7FC', minHeight: '87vh', height: 'auto', width: '100%' }} className=" pt-4">
                                <div className=" ">
                                    <div className="semester-header"><h2>Result Sheet</h2></div>
                                    <div className=" mx-5 px-5 mt-3 mb-5">
                                    <div className="container  form-inline  d-flex justify-content-end my-3">
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
                                        <DataTable
                                            columns={columns}
                                            data={search(questionList)}
                                            pagination
                                            striped
                                            highlightOnHover
                                            customStyles={customStyles}
                                            progressPending={loading}
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

export default ResultSheet;