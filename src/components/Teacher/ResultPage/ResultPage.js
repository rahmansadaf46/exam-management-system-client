import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link, useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import AddMarkViva from '../AddMarkViva/AddMarkViva';
import TeacherHeader from '../TeacherHeader/TeacherHeader';
import TeacherSidebar from '../TeacherSidebar/TeacherSidebar';
// import UpdateQuestionDetails from '../UpdateQuestionDetails/UpdateQuestionDetails';


const ResultPage = () => {
    const [isTeacher, setIsTeacher] = useState(false);
    const [question, setQuestion] = useState([]);
    const [query, setQuery] = useState('')
    const { id } = useParams();
    // const history = useHistory();
    const [resultSheet, setResultSheet] = useState([])
    // const [modalIsOpen, setIsOpen] = useState(false);
    // function openModal() {
    //     setIsOpen(true);
    // }
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalData, setModalData] = useState([])
    function openModal() {
        setIsOpen(true);
        // console.log(data);
        // setModalData(data);
    }


    function closeModal() {
        setIsOpen(false);
    }
    useEffect(() => {
        fetch(`http://localhost:5000/question/${id}`)
            .then(res => res.json())
            .then(ques => {
                window.scrollTo(0, 0);
                ques.endTime = new Date(new Date(ques.time).getTime() + ques.duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                setQuestion(ques);
                console.log(ques)
                const semester = JSON.parse(localStorage.getItem("selectedSemester"));
                let studentData = {
                    department: semester.department,
                    session: semester.session
                }
                // setInterval(() => {
                //     this.getCardData(this.dataConfigCard);
                //     this.getBillingInfoData(this.dataConfig);
                //     this.getTopTenDiagnosis(this.dataConfig);
                //   }, 30 * 60 * 1000);
                fetch('http://localhost:5000/studentsForExam', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ data: studentData })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        fetch('http://localhost:5000/resultFind', {
                            method: 'POST',
                            headers: { 'content-type': 'application/json' },
                            body: JSON.stringify({ questionId: id })
                        })
                            .then(res => res.json())
                            .then(result => {
                                console.log(result)
                                if (ques.category === 'mcq') {
                                    let filterData = [];
                                    if (result.length > 0) {
                                        result.forEach(resultStudent => {
                                            data.forEach(student => {
                                                if (resultStudent.studentEmail === student.email) {
                                                    filterData.push({
                                                        name: student.name,
                                                        roll: student.roll,
                                                        email: student.email,
                                                        obtainedMark: resultStudent.obtainedMark,
                                                        resultId: resultStudent._id,
                                                        attendance: 'Present'
                                                    })
                                                }
                                                else {
                                                    filterData.push({
                                                        name: student.name,
                                                        roll: student.roll,
                                                        email: student.email,
                                                        obtainedMark: 0,

                                                        attendance: 'Absence'
                                                    })
                                                }
                                            })
                                        })
                                        setResultSheet(filterData);
                                    }
                                    else {
                                        data.forEach(student => {
                                            filterData.push({
                                                name: student.name,
                                                roll: student.roll,
                                                email: student.email,
                                                obtainedMark: 0,

                                                attendance: 'Absence'
                                            })
                                        })
                                        setResultSheet(filterData);
                                    }
                                }
                                else if (ques.category === 'written') {
                                    let filterData = [];
                                    if (result.length > 0) {
                                        result.forEach(resultStudent => {
                                            data.forEach(student => {
                                                if (resultStudent.studentEmail === student.email) {
                                                    filterData.push({
                                                        name: student.name,
                                                        roll: student.roll,
                                                        email: student.email,
                                                        obtainedMark: resultStudent.obtainedMark,
                                                        resultId: resultStudent._id,
                                                        status: resultStudent.status,
                                                        attendance: 'Present'
                                                    })
                                                }
                                                else {
                                                    filterData.push({
                                                        name: student.name,
                                                        roll: student.roll,
                                                        email: student.email,
                                                        obtainedMark: 0,

                                                        attendance: 'Absence'
                                                    })
                                                }
                                            })
                                        })
                                        setResultSheet(filterData);
                                    }
                                    else {
                                        data.forEach(student => {
                                            filterData.push({
                                                name: student.name,
                                                roll: student.roll,
                                                email: student.email,
                                                obtainedMark: 0,

                                                attendance: 'Absence'
                                            })
                                        })
                                        setResultSheet(filterData);
                                    }
                                }
                                else if (ques.category === 'viva') {
                                    let filterData = [];
                                    if (result.length > 0) {
                                        result.forEach(resultStudent => {
                                            data.forEach(student => {
                                                if (resultStudent.studentEmail === student.email) {
                                                    filterData.push({
                                                        resultData: resultStudent,
                                                        name: student.name,
                                                        roll: student.roll,
                                                        email: student.email,
                                                        obtainedMark: resultStudent.obtainedMark,
                                                        status: resultStudent.status,
                                                        fullMark: result[0]?.totalMark,
                                                        attendance: 'Present'
                                                    })
                                                }
                                                else {
                                                    filterData.push({
                                                        name: student.name,
                                                        roll: student.roll,
                                                        email: student.email,
                                                        obtainedMark: 0,

                                                        attendance: 'Absence'
                                                    })
                                                }
                                            })
                                        })
                                        setResultSheet(filterData);
                                    }
                                    else {
                                        data.forEach(student => {
                                            filterData.push({
                                                name: student.name,
                                                roll: student.roll,
                                                email: student.email,
                                                obtainedMark: 0,

                                                attendance: 'Absence'
                                            })
                                        })
                                        setResultSheet(filterData);
                                    }
                                }
                            })

                    })
                    .catch(error => {
                        console.error(error)
                    })

            })


    }, [id])
    document.title = "Question";
    const refresh = () =>{
        setResultSheet([])
        fetch(`http://localhost:5000/question/${id}`)
        .then(res => res.json())
        .then(ques => {
            window.scrollTo(0, 0);
            ques.endTime = new Date(new Date(ques.time).getTime() + ques.duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setQuestion(ques);
            console.log(ques)
            const semester = JSON.parse(localStorage.getItem("selectedSemester"));
            let studentData = {
                department: semester.department,
                session: semester.session
            }
            // setInterval(() => {
            //     this.getCardData(this.dataConfigCard);
            //     this.getBillingInfoData(this.dataConfig);
            //     this.getTopTenDiagnosis(this.dataConfig);
            //   }, 30 * 60 * 1000);
            fetch('http://localhost:5000/studentsForExam', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: studentData })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    fetch('http://localhost:5000/resultFind', {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ questionId: id })
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result)
                            if (ques.category === 'mcq') {
                                let filterData = [];
                                if (result.length > 0) {
                                    result.forEach(resultStudent => {
                                        data.forEach(student => {
                                            if (resultStudent.studentEmail === student.email) {
                                                filterData.push({
                                                    name: student.name,
                                                    roll: student.roll,
                                                    email: student.email,
                                                    obtainedMark: resultStudent.obtainedMark,
                                                    resultId: resultStudent._id,
                                                    attendance: 'Present'
                                                })
                                            }
                                            else {
                                                filterData.push({
                                                    name: student.name,
                                                    roll: student.roll,
                                                    email: student.email,
                                                    obtainedMark: 0,

                                                    attendance: 'Absence'
                                                })
                                            }
                                        })
                                    })
                                    setResultSheet(filterData);
                                }
                                else {
                                    data.forEach(student => {
                                        filterData.push({
                                            name: student.name,
                                            roll: student.roll,
                                            email: student.email,
                                            obtainedMark: 0,

                                            attendance: 'Absence'
                                        })
                                    })
                                    setResultSheet(filterData);
                                }
                            }
                            else if (ques.category === 'written') {
                                let filterData = [];
                                if (result.length > 0) {
                                    result.forEach(resultStudent => {
                                        data.forEach(student => {
                                            if (resultStudent.studentEmail === student.email) {
                                                filterData.push({
                                                    name: student.name,
                                                    roll: student.roll,
                                                    email: student.email,
                                                    obtainedMark: resultStudent.obtainedMark,
                                                    resultId: resultStudent._id,
                                                    status: resultStudent.status,
                                                    attendance: 'Present'
                                                })
                                            }
                                            else {
                                                filterData.push({
                                                    name: student.name,
                                                    roll: student.roll,
                                                    email: student.email,
                                                    obtainedMark: 0,

                                                    attendance: 'Absence'
                                                })
                                            }
                                        })
                                    })
                                    setResultSheet(filterData);
                                }
                                else {
                                    data.forEach(student => {
                                        filterData.push({
                                            name: student.name,
                                            roll: student.roll,
                                            email: student.email,
                                            obtainedMark: 0,

                                            attendance: 'Absence'
                                        })
                                    })
                                    setResultSheet(filterData);
                                }
                            }
                            else if (ques.category === 'viva') {
                                let filterData = [];
                                if (result.length > 0) {
                                    result.forEach(resultStudent => {
                                        data.forEach(student => {
                                            if (resultStudent.studentEmail === student.email) {
                                                filterData.push({
                                                    resultData: resultStudent,
                                                    name: student.name,
                                                    roll: student.roll,
                                                    email: student.email,
                                                    obtainedMark: resultStudent.obtainedMark,
                                                    status: resultStudent.status,
                                                    fullMark: result[0]?.totalMark,
                                                    attendance: 'Present'
                                                })
                                            }
                                            else {
                                                filterData.push({
                                                    name: student.name,
                                                    roll: student.roll,
                                                    email: student.email,
                                                    obtainedMark: 0,

                                                    attendance: 'Absence'
                                                })
                                            }
                                        })
                                    })
                                    setResultSheet(filterData);
                                }
                                else {
                                    data.forEach(student => {
                                        filterData.push({
                                            name: student.name,
                                            roll: student.roll,
                                            email: student.email,
                                            obtainedMark: 0,

                                            attendance: 'Absence'
                                        })
                                    })
                                    setResultSheet(filterData);
                                }
                            }
                        })

                })
                .catch(error => {
                    console.error(error)
                })

        })

    }
    useEffect(() => {
        setIsTeacher(JSON.parse(localStorage.getItem("teacherAccess")) || {});
    }, [])

    // function closeModal() {
    //     setIsOpen(false);
    // }
    // function updateDetails(data) {
    //     console.log(data);
    // }
    const columnsViva = [
        {
            name: '#',
            sortable: true,
            cell: (data, index) => (
                <span>{index + 1}.</span>
            ),
            width: '70px'
        },
        {
            name: 'Student Name',
            sortable: true,
            wrap: true,
            selector: row => row.name,
            width: '180px'
        },
        {
            name: 'Roll',
            selector: row => row.roll,
            sortable: true,
            width: '90px'
        },
        {
            name: 'Obtained Mark',
            sortable: true,
            width: '180px',
            selector: row => row.obtainedMark,
            cell: (data) => (
                <span style={{ color: data.obtainedMark === 0 ? 'red' : 'green' }}><b>{data.obtainedMark}</b></span>
            ),
        },
        {
            name: 'Attendance',
            sortable: true,
            width: '155px',
            selector: row => row.attendance,
            cell: (data) => (
                <span style={{ color: data.attendance === 'Present' ? 'green' : 'red' }}>{data.attendance}</span>
            ),
        },
        {
            name: 'Status',
            selector: row => row.status,
            cell: (data) => (
                <span style={{ color: data.status === 'Not Checked' ? 'red' : 'green' }}>{data.status}</span>
            ),
            sortable: true,
            width: '150px'
        },

        {
            name: 'Action',
            cell: (data) => (
                <div>
                    <button
                        className="btn btn-sm btn-info m-1"
                        style={{ display: data.attendance === 'Present' ? 'block' : 'none' }}
                        // to={`/resultDetails/${data.resultId}`}
                        onClick={() => {
                            setModalData(data);
                            openModal();
                            console.log(data);
                        }}
                    >
                        Add Mark
                    </button>
                    {" "}

                </div>
            ),
        },
    ];
    const columnsWritten = [
        {
            name: '#',
            sortable: true,
            cell: (data, index) => (
                <span>{index + 1}.</span>
            ),
            width: '70px'
        },
        {
            name: 'Student Name',
            sortable: true,
            wrap: true,
            selector: row => row.name,
            width: '180px'
        },
        {
            name: 'Roll',
            selector: row => row.roll,
            sortable: true,
            width: '90px'
        },
        {
            name: 'Obtained Mark',
            sortable: true,
            width: '180px',
            selector: row => row.obtainedMark,
            cell: (data) => (
                <span style={{ color: data.obtainedMark === 0 ? 'red' : 'green' }}><b>{data.obtainedMark}</b></span>
            ),
        },
        {
            name: 'Attendance',
            sortable: true,
            width: '155px',
            selector: row => row.attendance,
            cell: (data) => (
                <span style={{ color: data.attendance === 'Present' ? 'green' : 'red' }}>{data.attendance}</span>
            ),
        },
        {
            name: 'Status',
            selector: row => row.status,
            cell: (data) => (
                <span style={{ color: data.status === 'Not Checked' ? 'red' : 'green' }}>{data.status}</span>
            ),
            sortable: true,
            width: '150px'
        },

        {
            name: 'Action',
            cell: (data) => (
                <div>
                    <Link
                        className="btn btn-sm btn-info m-1"
                        style={{ display: data.attendance === 'Present' ? 'block' : 'none' }}
                        to={`/resultDetails/${data.resultId}`}
                        onClick={() => {
                            console.log(data.resultId);
                        }}
                    >
                        See Details
                    </Link>
                    {" "}

                </div>
            ),
        },
    ];
    const columnsMCQ = [
        {
            name: '#',
            sortable: true,
            cell: (data, index) => (
                <span>{index + 1}.</span>
            ),
            width: '90px'
        },
        {
            name: 'Student Name',
            sortable: true,
            selector: row => row.name,
            width: '200px'
        },
        {
            name: 'Roll',
            selector: row => row.roll,
            sortable: true,
            width: '100px'
        },
        {
            name: 'Obtained Mark',
            sortable: true,
            width: '200px',
            selector: row => row.obtainedMark,
            cell: (data) => (
                <span style={{ color: data.obtainedMark === 0 ? 'red' : 'green' }}><b>{data.obtainedMark}</b></span>
            ),
        },
        {
            name: 'Attendance',
            sortable: true,
            selector: row => row.attendance,
            cell: (data) => (
                <span style={{ color: data.attendance === 'Present' ? 'green' : 'red' }}>{data.attendance}</span>
            ),
        },

        // {
        //     name: 'Category',
        //     selector: row => <span >{row.category === 'mcq' ? <><span className='text-uppercase'>{row.category}</span> ({row.mcqCategory === 'mcqFillInTheBlanks'?<>MCQ and Fill in the Blanks</>:row.mcqCategory === 'onlyFillInTheBlanks'?<>Only Fill in the Blanks</>:<>Only MCQ</>})</> : <><span className='text-uppercase'>{row.category}</span></>}</span>,
        // },
        {
            name: 'Action',
            cell: (data) => (
                <div>
                    <Link
                        className="btn btn-sm btn-info m-1"
                        style={{ display: data.attendance === 'Present' ? 'block' : 'none' }}
                        to={`/resultDetails/${data.resultId}`}
                        onClick={() => {
                            console.log(data.resultId);
                        }}
                    >
                        See Details
                    </Link>
                    {" "}

                </div>
            ),
        },
    ];
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
                                    {question.length === 0 ? <><div>
                                        <h3 className='text-center'>Loading...</h3>
                                    </div></> : <div className=" ">
                                        <div className="semester-header"><h2>Result Page</h2></div>
                                        <div style={{ margin: '0px 150px' }}>
                                            <div style={{ border: '3px solid gray', textAlign: 'center', padding: '10px' }}>
                                                <div>
                                                    <h4><span className="text-primary">Exam Name:</span> {question.examName}</h4>
                                                    <h5><span className="text-warning">Exam Category:</span> {question.category === 'mcq' ? <><span className='text-uppercase'>{question.category}</span> ({question.mcqCategory === 'mcqFillInTheBlanks' ? <>MCQ and Fill in the Blanks</> : question.mcqCategory === 'onlyFillInTheBlanks' ? <>Only Fill in the Blanks</> : <>Only MCQ</>})</> : <><span className='text-uppercase'>{question.category}</span></>}</h5>
                                                    <div className="row">
                                                        <div className='col-md-6'>
                                                            <h5><span className="text-warning">Department:</span> {question.department}</h5>
                                                            <h5><span className="text-warning">Session:</span> {question.session}</h5>
                                                            <h5><span className="text-warning">Semester:</span> {question.semester}</h5>
                                                            <h5><span className="text-warning">Date:</span> {question?.time?.split('T')[0]}</h5>
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <h5><span className="text-warning">Start Time:</span> {question?.time?.split('T')[1]?.split(':')[0] > 12 ? (`${question?.time?.split('T')[1]?.split(':')[0] - 12}:${question?.time?.split('T')[1]?.split(':')[1]}`) : (question?.time?.split('T')[1])} {question?.time?.split('T')[1]?.split(':')[0] > 12 ? 'PM' : 'AM'}</h5>
                                                            <h5><span className="text-warning">End Time:</span> {question.endTime}</h5>
                                                            <h5><span className="text-warning">Duration:</span> {question.duration} min</h5>
                                                            <h5><span className="text-warning">Full Mark:</span> {question?.question.map((data, index) => parseInt(data.mark)).reduce((partialSum, a) => partialSum + a, 0)}</h5>
                                                        </div>
                                                    </div>




                                                    <div>
                                                        {question?.category === 'mcq' || question?.category === 'written' ? <>
                                                            <h5><span className="text-warning">Total Question:</span> {question.totalQuestion} </h5>
                                                        </> : <></>}
                                                    </div>
                                                </div>

                                            </div>
                                            {question.category === 'viva' &&  <div style={{display:'absolute', marginBottom:'-50px'}} className=" container d-flex justify-content-start mt-3">
                                                {/* <label style={{ color: '#7AB259' }} className=" ml-1" htmlFor="filter">Filter</label> */}
                                                <button onClick={()=> refresh()} className="btn btn-dark btn-sm" type="submit">Refresh Result</button>

                                            </div>}
                                           
                                            <div>
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
                                                <div className="  mt-1 mb-5">
                                                    {question.category === 'mcq' &&
                                                        <DataTable
                                                            columns={columnsMCQ}
                                                            data={search(resultSheet)}
                                                            pagination
                                                            striped
                                                            highlightOnHover
                                                            customStyles={customStyles}
                                                            progressPending={resultSheet.length === 0}
                                                            paginationRowsPerPageOptions={[5, 10, 15]}
                                                        />}

                                                    {question.category === 'written' &&
                                                        <DataTable
                                                            columns={columnsWritten}
                                                            data={search(resultSheet)}
                                                            pagination
                                                            striped
                                                            highlightOnHover
                                                            customStyles={customStyles}
                                                            progressPending={resultSheet.length === 0}
                                                            paginationRowsPerPageOptions={[5, 10, 15]}
                                                        />}

                                                    {question.category === 'viva' &&


                                                        <>
                                                            <DataTable
                                                                columns={columnsViva}
                                                                data={search(resultSheet)}
                                                                pagination
                                                                striped
                                                                highlightOnHover
                                                                customStyles={customStyles}
                                                                progressPending={resultSheet.length === 0}
                                                                paginationRowsPerPageOptions={[5, 10, 15]}
                                                            /></>
                                                    }
                                                    <AddMarkViva setResultSheet={setResultSheet} modalIsOpen={modalIsOpen} resultSheet={resultSheet} modalData={modalData} closeModal={closeModal}></AddMarkViva>
                                                </div>
                                            </div>

                                        </div>
                                    </div>}
                                </div>
                            </div>
                        </div>

                    </div> : <Unauthorized />
            }
        </>
    );
};

export default ResultPage;