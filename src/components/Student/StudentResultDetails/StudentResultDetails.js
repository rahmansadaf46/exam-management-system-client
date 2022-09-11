import React, { useEffect, useState } from 'react';
import {   useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import StudentHeader from '../StudentHeader/StudentHeader';
import StudentSidebar from '../StudentSidebar/StudentSidebar';
// import AddMarkModal from '../AddMarkModal/AddMarkModal';
// import UpdateQuestionDetails from '../UpdateQuestionDetails/UpdateQuestionDetails';


const StudentResultDetails = () => {
    const [isStudent, setIsStudent] = useState(false);
    // const [question, setQuestion] = useState([]);
    const { id } = useParams();
    // const history = useHistory();
    const [result, setResult] = useState([])
    // const [modalIsOpen, setIsOpen] = useState(false);
    // function openModal() {
    //     setIsOpen(true);
    // }
  
    useEffect(() => {
        fetch(`http://localhost:5000/resultDetails/${id}`)
            .then(res => res.json())
            .then(data => {
                window.scrollTo(0, 0);
                console.log(data)
                // let filterResult = data.answerData.answer.filter(ans=> ans.status === 'Not Checked')
                setResult(data)
            })
    }, [id])
    document.title = "Result";

    useEffect(() => {
        setIsStudent(JSON.parse(localStorage.getItem("studentAccess")) || {});
    }, [])

    // function closeModal() {
    //     setIsOpen(false);
    // }
    // function updateDetails(data) {
    //     console.log(data);
    // }
    // const handleDelete = (id) => {
    //     if (window.confirm('Are you sure you want to delete?')) {

    //         fetch(`http://localhost:5000/deleteQuestion/${id}`, {
    //             method: 'DELETE'
    //         })
    //             .then(res => res.json())
    //             .then(result => {
    //                 // localStorage.removeItem("student");
    //                 alert('Question Deleted')
    //                 if (result) {
    //                     // window.location.reload();
    //                     history.goBack()
    //                 }

    //             })
    //     }

    // }
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
                                    {result.length === 0 ? <><div>
                                        <h3 className='text-center'>Loading...</h3>
                                    </div></> : <div className=" ">
                                        <div className="semester-header"><h2>Result Details</h2></div>
                                        <div style={{ margin: '0px 250px' }}>
                                            <div style={{ border: '3px solid gray', backgroundColor: '#FFFEE2', textAlign: 'center', padding: '10px' }}>
                                                <div>
                                                    <h4><span className="text-primary">Exam Name:</span> {result.examName}</h4>
                                                    <h5><span className="text-warning">Exam Category:</span> {result.category} </h5>
                                                    <h5><span className="text-success">Teacher Name:</span> {result.teacherName} </h5>
                                                    <h5><span className="text-success">Student Name:</span> {result.studentName} </h5>
                                                    <h5><span className="text-success">Student Roll:</span> {result.studentRoll} </h5>
                                                    {result?.category === 'written' ? <>
                                                        <h5><span className="text-warning">Status:</span> <span style={{ color: result.status === 'Not Checked' ? 'red' : 'green' }}>{result.status} {result.status === 'Not Checked' ? <>({result.answerData.answer.filter(ans => ans.status === 'Not Checked').length} More Remaining)</> : <></>}</span>  </h5>
                                                    </> : <></>}

                                                    {result?.category === 'assignment' ? <>
                                                        <h5><span className="text-warning">Status:</span> <span style={{ color: result.status === 'Not Checked' ? 'red' : 'green' }}>{result.status}</span>  </h5>
                                                    </> : <></>}
                                                    <div className="row">
                                                        <div className='col-md-6'>
                                                            <h5><span className="text-warning">Department:</span> {result.department}</h5>
                                                            <h5><span className="text-warning">Session:</span> {result.session}</h5>
                                                            <h5><span className="text-warning">Semester:</span> {result.semester}</h5>
                                                            <h5><span className="text-warning">Date:</span> {result?.time?.split('T')[0]}</h5>
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <h5><span className="text-warning">Start Time:</span> {result?.time?.split('T')[1]?.split(':')[0] > 12 ? (`${result?.time?.split('T')[1]?.split(':')[0] - 12}:${result?.time?.split('T')[1]?.split(':')[1]}`) : (result?.time?.split('T')[1])} {result?.time?.split('T')[1]?.split(':')[0] > 12 ? 'PM' : 'AM'}</h5>
                                                            <h5><span className="text-warning">End Time:</span> {new Date(new Date(result.time).getTime() + result.duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h5>
                                                            <h5><span className="text-warning">Duration:</span> {result.duration} min</h5>
                                                            <h5><span className="text-primary">Obtained Mark:</span> <span className={`${result.obtainedMark === 0 ? 'text-danger' : 'text-warning'} `}>{result.obtainedMark}</span>/<span className="text-success">{result.totalMark}</span> </h5>

                                                            {/* <h5><span className="text-warning">Full Mark:</span> {result.totalMark}</h5> */}
                                                        </div>
                                                    </div>




                                                    <div>
                                                        {result?.category === 'mcq' || result?.category === 'written' ? <>
                                                            <h5><span className="text-warning">Total Question:</span> {result.totalQuestion} </h5>
                                                        </> : <></>}
                                                    </div>
                                                </div>

                                            </div>
                                            <div>
                                                {result?.category === 'mcq' ? <div className="mb-5">
                                                    {result?.answerData?.answer.map((data, index) => <div>
                                                        {data?.category === 'mcq' ? <div style={{ border: '3px solid gray', borderTop: 'none', backgroundColor: data.answer === 'Right' ? '#dcffd2' : '#fff5f5', textAlign: 'center', padding: '10px' }}>
                                                            <h5 className="text-primary">Question Number: <span>{index + 1}</span></h5>
                                                            <h5 className="text-warning">Question Name: <span>{data.questionName}</span></h5>
                                                            <h5 style={{ color: 'purple' }}>Answer 1: <span>{data.answer1}</span>{data.rightAnswer === 'answer1' && <span className="text-success"> (Right Answer)</span>}{data.givenAnswer === 'answer1' && <span className="text-danger"> (Given Answer)</span>}</h5>
                                                            <h5 style={{ color: 'purple' }}>Answer 2: <span>{data.answer2}</span>{data.rightAnswer === 'answer2' && <span className="text-success"> (Right Answer)</span>}{data.givenAnswer === 'answer2' && <span className="text-danger"> (Given Answer)</span>}</h5>
                                                            <h5 style={{ color: 'purple' }}>Answer 3: <span>{data.answer3}</span>{data.rightAnswer === 'answer3' && <span className="text-success"> (Right Answer)</span>}{data.givenAnswer === 'answer3' && <span className="text-danger"> (Given Answer)</span>}</h5>
                                                            <h5 style={{ color: 'purple' }}>Answer 4: <span>{data.answer4}</span>{data.rightAnswer === 'answer4' && <span className="text-success"> (Right Answer)</span>}{data.givenAnswer === 'answer4' && <span className="text-danger"> (Given Answer)</span>}</h5>
                                                            <h5 style={{ color: '#f70d1a' }}>Obtained Mark: <span><span className={`${data.obtainedMark === 0 ? 'text-danger' : 'text-warning'} `}>{data.obtainedMark}</span>/<span className="text-success">{data.mark}</span></span></h5>
                                                        </div> : <div style={{ border: '3px solid gray', borderTop: 'none', backgroundColor: data.answer === 'Right' ? '#dcffd2' : '#fff5f5', textAlign: 'center', padding: '10px' }}>
                                                            <h5 className="text-primary">Question Number: <span>{index + 1}</span></h5>
                                                            <h5 className="text-warning">Question Name: <span>{data.questionName}</span></h5>
                                                            <h5 className="text-success">Right Answer: <span>{data.rightAnswer}</span></h5>
                                                            <h5 className="text-danger">Given Answer: <span>{data.givenAnswer}</span></h5>
                                                            <h5 style={{ color: '#f70d1a' }}>Obtained Mark: <span><span className={`${data.obtainedMark === 0 ? 'text-danger' : 'text-warning'} `}>{data.obtainedMark}</span>/<span className="text-success">{data.mark}</span></span></h5>
                                                        </div>}

                                                    </div>)}
                                                    {result?.answerData?.notAnswer.length > 0 && <h2 className='text-center mt-3 text-danger'>Not Answer</h2>}
                                                    {result?.answerData?.notAnswer.length > 0 && result?.answerData?.notAnswer?.map((data, index) => <div>
                                                        {data?.category === 'mcq' ? <div style={{ border: '3px solid gray', backgroundColor: '#fff5f5', textAlign: 'center', padding: '10px' }}>
                                                            <h5 className="text-primary">Question Number: <span>{index + 1}</span></h5>
                                                            <h5 className="text-warning">Question Name: <span>{data.questionName}</span></h5>
                                                            <h5 style={{ color: 'purple' }}>Answer 1: <span>{data.answer1}</span>{data.rightAnswer === 'answer1' && <span className="text-success"> (Right Answer)</span>}</h5>
                                                            <h5 style={{ color: 'purple' }}>Answer 2: <span>{data.answer2}</span>{data.rightAnswer === 'answer2' && <span className="text-success"> (Right Answer)</span>}</h5>
                                                            <h5 style={{ color: 'purple' }}>Answer 3: <span>{data.answer3}</span>{data.rightAnswer === 'answer3' && <span className="text-success"> (Right Answer)</span>}</h5>
                                                            <h5 style={{ color: 'purple' }}>Answer 4: <span>{data.answer4}</span>{data.rightAnswer === 'answer4' && <span className="text-success"> (Right Answer)</span>}</h5>
                                                            <h5 style={{ color: '#f70d1a' }}>Obtained Mark: <span><span className="text-danger">0</span>/<span className="text-success">{data.mark}</span></span></h5>
                                                        </div> : <div style={{ border: '3px solid gray', backgroundColor: '#fff5f5', textAlign: 'center', padding: '10px' }}>
                                                            <h5 className="text-primary">Question Number: <span>{index + 1}</span></h5>
                                                            <h5 className="text-warning">Question Name: <span>{data.questionName}</span></h5>
                                                            <h5 className="text-success">Right Answer: <span>{data.rightAnswer}</span></h5>
                                                            <h5 style={{ color: '#f70d1a' }}>Obtained Mark: <span><span className="text-danger">0</span>/<span className="text-success">{data.mark}</span></span></h5>
                                                        </div>}

                                                    </div>)}
                                                </div> : result?.category === 'assignment' ? <><div style={{ border: '3px solid gray', borderTop: 'none', backgroundColor:  result?.status === 'Not Checked' ? '#fff5f5' : '#dcffd2', textAlign: 'center', padding: '10px' }}>
                                                { <div style={{  borderTop: 'none', textAlign: 'center', padding: '10px' }}>
                                                            {/* <h5 className="text-primary">Question Number: <span>{index + 1}</span></h5> */}
                                                            {result?.answerData?.answer[0]?.category === "Link Submission" ? <><h5 className="text-warning">Assignment Details: <span>{result?.answerData?.answer[0].questionName}</span></h5>

                                                            <h5 className="text-success">Link: <a target="blank" href={result?.answerData?.answer[0].answer}>{result?.answerData?.answer[0].answer}</a></h5>
                                                            {/* <button onClick={() => openModal({ questionName: result?.answerData?.answer[0].questionName, questionNumber: result?.answerData?.answer[0].questionNumber, mark: result.totalMark,  obtainedMark: result?.obtainedMark })} className="btn btn-success" type="submit">Check</button> */}
                                                            </> : <>
                                                            <h5 className="text-warning">Assignment Details: <span>{result?.answerData?.answer[0]?.assignmentDetails}</span></h5>

                                                            <h5 className="text-success">File: <a href={`http://localhost:5000/files/${result?.answerData?.answer[0].answer}`}>{result?.answerData?.answer[0].answer}</a></h5>
                                                            {/* <button onClick={() => openModal({ questionName: '', questionNumber: '1', mark: result.totalMark,  obtainedMark: result?.obtainedMark })} className="btn btn-success" type="submit">Check</button> */}
                                                            </>}
                                                            
                                                           
                                                        </div>}
                                                    
                                            
                                                </div> </> : result?.category === 'viva' ? <><div style={{ border: '3px solid gray', borderTop: 'none', backgroundColor: '#FFFEE2', textAlign: 'center', padding: '10px', marginBottom: '40px' }}>
                                                    {/* <h5 className="text-warning">Viva Details: <span>{result.question[0]?.vivaDetails}</span></h5>
                                                <br></br>
                                                <h5 className="text-success">Host Link: <a target="blank" href={`//${question.question[0]?.hostLink}`}>{question.question[0]?.hostLink}</a> </h5>
                                                <br></br>
                                                <h5 className="text-success">Attendance Link: <a target="blank" href={`//${question.question[0]?.attendanceLink}`}>{question.question[0]?.attendanceLink}</a> </h5> */}
                                                </div> </> : result?.category === "written" ? <div className="mb-5">
                                                    {result?.answerData?.answer.sort((a, b) => parseFloat(b.questionNumber) - parseFloat(a.questionNumber)).map((data, index) => <div>
                                                        {<div style={{ border: '3px solid gray', borderTop: 'none', backgroundColor: data.status === 'Not Checked' ? '#fff5f5' : '#dcffd2', textAlign: 'center', padding: '10px' }}>
                                                            <h5 className="text-primary">Question Number: <span>{index + 1}</span></h5>
                                                            <h5 className="text-warning">Question Name: <span>{data.questionName}</span></h5>
                                                            {/* <h5 className="text-success">Right Answer: <span>{data.rightAnswer}</span></h5> */}
                                                            <h5 className="text-danger">Given Answer: <span>{data.givenAnswer}</span></h5>
                                                            <h5 className="text-primary">Status: <span style={{ color: data.status === 'Not Checked' ? 'red' : 'green' }}>{data.status}</span></h5>
                                                            <h5 style={{ color: '#f70d1a' }}>Obtained Mark: <span><span className={`${data.obtainedMark === 0 ? 'text-danger' : 'text-warning'} `}>{data.obtainedMark}</span>/<span className="text-success">{data.mark}</span></span></h5>
                                                            {/* <button onClick={() => openModal({ questionName: data.questionName, questionNumber: data.questionNumber, mark: data.mark, index: index + 1, obtainedMark: data.obtainedMark })} className="btn btn-success" type="submit">Check</button> */}

                                                        </div>}

                                                    </div>)}
                                                    
                                                    {result?.answerData?.notAnswer.length > 0 && <h2 className='text-center mt-3 text-danger'>Not Answer</h2>}
                                                    {result?.answerData?.notAnswer.length > 0 && result?.answerData?.notAnswer?.map((data, index) => <div>
                                                        {<div style={{ border: '3px solid gray', backgroundColor: '#fff5f5', textAlign: 'center', padding: '10px' }}>
                                                            <h5 className="text-primary">Question Number: <span>{index + 1}</span></h5>
                                                            <h5 className="text-warning">Question Name: <span>{data.questionName}</span></h5>
                                                            {/* <h5 className="text-success">Right Answer: <span>{data.rightAnswer}</span></h5> */}
                                                            <h5 style={{ color: '#f70d1a' }}>Obtained Mark: <span><span className="text-danger">0</span>/<span className="text-success">{data.mark}</span></span></h5>
                                                        </div>}

                                                    </div>)}


                                                </div> : <></>}
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                            {/* <AddMarkModal setResult={setResult} modalIsOpen={modalIsOpen} result={result} answer={modalData} closeModal={closeModal}></AddMarkModal> */}
                        </div>

                    </div> : <Unauthorized />
            }
        </>
    );
};

export default StudentResultDetails;