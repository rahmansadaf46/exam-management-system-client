import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import StudentHeader from '../StudentHeader/StudentHeader';
import StudentSidebar from '../StudentSidebar/StudentSidebar';


const Exam = () => {
    // const [semester, setSemester] = useState({});
    const [isStudent, setIsStudent] = useState(false);
    const [student, setStudent] = useState([]);
    const [examList, setExamList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dataEmpty, setDataEmpty] = useState(false);
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
        setStudent(JSON.parse(localStorage.getItem("studentData")) || {});
        setIsStudent(JSON.parse(localStorage.getItem("studentAccess")) || {});
        // setSemester(JSON.parse(localStorage.getItem("semesterData"))[0] || {});


        const semesterData = JSON.parse(localStorage.getItem("semesterData"))[0];
        console.log(semesterData);
        fetch('http://localhost:5000/questionStudent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ department: semesterData.department, semester: semesterData.semester,session: semesterData.session})
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
              
                let filterResult = [];
                result?.forEach(data=> 
                {
                    const endTime = new Date(new Date(data.time).getTime() + data.duration * 60000);
                    const validDate = new Date() < new Date(endTime);
                    console.log(validDate,new Date(endTime));
                    if(validDate){
                        filterResult.push({...data, endTime});
                    }
                    
                
                })
                console.log();
                if(filterResult.length>0){
                    setExamList(filterResult);
                    // setDataEmpty(true);
                }
                else{
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
    console.log(student)
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
                                    <div className="semester-header"><h2>Exam Panel</h2></div>
                                 
                                   <div className="d-flex justify-content-center">
                                   <div className=' '>
                                    {loading && <h2 className='text-center mt-5'>Loading...</h2>}
                                    {dataEmpty && <h2 className='text-center mt-5 text-danger'>There is no upcoming exam.</h2>}
                                        {
                                            examList.length>0 && examList.map(exam =>
                                                <div className=' text-center p-4' style={{width:'520px', border:'1px solid white', boxShadow:'2px 2px 10px black',background:'#FFFFCC', margin:'40px 0px', borderRadius:'20px'}}>
                                                <h5 className="text-info">{exam.examName}</h5>
                                                <h5><span className="text-warning">Teacher:</span> {exam.teacherName}</h5>
                                                <h5><span className="text-warning">Date:</span> {exam?.time?.split('T')[0]}</h5>
                                                <h5><span className="text-warning">Start Time:</span> {exam?.time?.split('T')[1]?.split(':')[0] > 12 ? (`${exam?.time?.split('T')[1]?.split(':')[0] - 12}:${exam?.time?.split('T')[1]?.split(':')[1]}`) : (exam?.time?.split('T')[1])} {exam?.time?.split('T')[1]?.split(':')[0] > 12 ? 'PM' : 'AM'}</h5>
                                                <Link to={`examPage/${exam._id}`}className="text-success">Start Exam</Link>
                                            </div>
                                            )  
                                        }
                                      
                                    </div>
                                   </div>
                                   
                                    {/* <div className="d-flex justify-content-center">
                                        <div style={{ lineHeight: '0.6', border: '3px solid orange', width: '50%', padding: '10px' }} className="text-center">
                                            <h5 className="text-success">{semester.semester}</h5>
                                            <p style={{ fontSize: '20px' }} className="text-danger">{semester.department} Department</p>
                                            <p>{semester.session} Session</p>
                                        </div>
                                    </div> */}
                                   
                                </div>
                            </div>
                        </div>

                    </div> : <Unauthorized />
            }
        </>
    );
};

export default Exam;