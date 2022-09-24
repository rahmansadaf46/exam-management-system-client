import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import StudentHeader from '../StudentHeader/StudentHeader';
import StudentSidebar from '../StudentSidebar/StudentSidebar';


const StudentResult = () => {
    // const [semester, setSemester] = useState({});
    const [isStudent, setIsStudent] = useState(false);
    // const [student, setStudent] = useState([]);
    // const [examList, setExamList] = useState([]);
    const [resultList, setResultList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataEmpty, setDataEmpty] = useState(false);
    const [query, setQuery] = useState('');
    // const { register, handleSubmit, errors } = useForm();
    document.title = "Exam Dashboard";
    // const onSubmit = data => {
    //     if (data) {
    //         setLoading(true);
    //     }
    //     // https://demo-0523.herokuapp.com/admin/addAdmin
    //     fetch('http://localhost:5000/addAdmin', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(data)
    //     })
    //         .then(res => res.json())
    //         .then(success => {
    //             if (success) {
    //                 setLoading(false);
    //                 alert("Admin Added");
    //                 window.location.reload();
    //             }
    //         })

    // }
    useEffect(() => {
        // setStudent(JSON.parse(localStorage.getItem("studentData")) || {});
        setIsStudent(JSON.parse(localStorage.getItem("studentAccess")) || {});
        // setSemester(JSON.parse(localStorage.getItem("semesterData"))[0] || {});


        const semesterData = JSON.parse(localStorage.getItem("semesterData"));
        console.log(semesterData);
        fetch('http://localhost:5000/resultStudent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentEmail: JSON.parse(localStorage.getItem("studentData")).email })
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);

                // let filterResult = [];
                // result?.forEach(data=> 
                // {
                //     const endTime = new Date(new Date(data.time).getTime() + data.duration * 60000);
                //     const validDate = new Date() < new Date(endTime);
                //     console.log(validDate,new Date(endTime));
                //     if(validDate){
                //         filterResult.push({...data, endTime});
                //     }


                // })
                // console.log();
                if (result.length > 0) {
                    setResultList(result.reverse())
                    // setExamList(filterResult.sort(function(a,b){
                    //     // Turn your strings into dates, and then subtract them
                    //     // to get a value that is either negative, positive, or zero.
                    //     return new Date(b.time) - new Date(a.time);
                    //   }).reverse());
                    // setDataEmpty(true);
                }
                else {
                    setDataEmpty(true);
                }

                setLoading(false);
                // let result = [];
                // data.forEach(element => {
                //     result.push({
                //         _id: element._id,
                //         examName: element.examName,
                //     })
                // });
                // setAdminName(data[0].name);
                // localStorage.setItem('adminName', JSON.stringify(data[0].name));
            })
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
    return (
        <>
            {
                isStudent === true ?
                    <div>
                        <StudentHeader></StudentHeader>
                        <div className="d-flex">
                            <div className="col-md-2">
                                <StudentSidebar></StudentSidebar>
                            </div>
                            <div style={{ backgroundColor: '#F4F7FC', minHeight: '87vh', height: 'auto', width: '100%' }} className=" pt-4">
                                <div className=" ">
                                    <div className="semester-header"><h2>Result Panel</h2></div>

                                    <div className="d-flex justify-content-center">
                                        <div className=' '>
                                            {loading && <h2 className='text-center mt-5'>Loading...</h2>}
                                            {dataEmpty && <h2 className='text-center mt-5 text-danger'>There is no result.</h2>}
                                            {
                                                resultList.length > 0 && <>
                                                    <div className="container  form-inline  d-flex justify-content-end mt-3">
                                                        <label  className=" ml-1 text-primary" htmlFor="filter">Filter</label>
                                                        <input
                                                            style={{ borderRadius: "100px", border: '2px solid orange' }}
                                                            className="form-control ml-2 p-1"
                                                            type="text"
                                                            value={query}
                                                            onChange={(e) => {
                                                                setQuery(e.target.value);
                                                            }}
                                                        />
                                                    </div>
                                                    {search(resultList).map(result =>
                                                        <div className=' text-center p-4' style={{ width: '520px', border: '1px solid white', boxShadow: '2px 2px 10px black', background: 'white', margin: '30px 0px 40px 0px', borderRadius: '10px' }}>
                                                            <h5 className="text-primary">Exam Name: <span className='text-success'>{result.examName}</span></h5>
                                                            {result.category !== 'mcq' ? <> <h5><span className="text-warning">Result Status:</span> <span className={result.status === 'Checked' ? 'text-success' : 'text-danger'}>{result.status}</span></h5></> : <></>}
                                                            <h5><span className="text-dark">Obtained Mark:</span> <span className={result.obtainedMark === 0 ? 'text-danger' : 'text-primary'}>{result.obtainedMark}</span>/<span className='text-success'>{result.totalMark}</span></h5>
                                                            {/* <h5><span className="text-warning">Date:</span> {exam?.time?.split('T')[0]}</h5>
                                                <h5><span className="text-warning">Start Time:</span> {exam?.time?.split('T')[1]?.split(':')[0] > 12 ? (`${exam?.time?.split('T')[1]?.split(':')[0] - 12}:${exam?.time?.split('T')[1]?.split(':')[1]}`) : (exam?.time?.split('T')[1])} {exam?.time?.split('T')[1]?.split(':')[0] > 12 ? 'PM' : 'AM'}</h5> */}
                                                            {result.category !== 'viva' && <><Link to={`/studentResultDetails/${result._id}`} className="btn btn-sm btn-warning mt-2">See Details</Link></>}
                                                        </div>
                                                    )}</>
                                            }

                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>

                    </div> : <Unauthorized />
            }
        </>
    );
};

export default StudentResult;