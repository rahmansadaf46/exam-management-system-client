import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import TeacherHeader from '../TeacherHeader/TeacherHeader';
import TeacherSidebar from '../TeacherSidebar/TeacherSidebar';


const QuestionList = () => {
    const [isTeacher, setIsTeacher] = useState(false);
    const [questionList, setQuestionList] = useState([])

    document.title = "Question List";

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
                        to={`/question/${data._id}`}
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
                                    <div className="semester-header"><h2>Question List</h2></div>
                                    <div className="container mx-5 px-5 mt-5 mb-5">
                                        <DataTable
                                            columns={columns}
                                            data={questionList}
                                            pagination
                                            striped
                                            highlightOnHover
                                            customStyles={customStyles}
                                            progressPending={questionList.length === 0}
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

export default QuestionList;