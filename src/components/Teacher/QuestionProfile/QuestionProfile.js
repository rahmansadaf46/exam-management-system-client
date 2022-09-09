import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import TeacherHeader from '../TeacherHeader/TeacherHeader';
import TeacherSidebar from '../TeacherSidebar/TeacherSidebar';
// import UpdateQuestionDetails from '../UpdateQuestionDetails/UpdateQuestionDetails';


const QuestionProfile = () => {
    const [isTeacher, setIsTeacher] = useState(false);
    const [question, setQuestion] = useState([]);
    const { id } = useParams();
    const history = useHistory();
    // const [modalIsOpen, setIsOpen] = useState(false);
    // function openModal() {
    //     setIsOpen(true);
    // }
    useEffect(() => {
        fetch(`http://localhost:5000/question/${id}`)
            .then(res => res.json())
            .then(data => {
                window.scrollTo(0, 0);
                data.endTime = new Date(new Date(data.time).getTime() + data.duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                setQuestion(data);
                console.log(data);
                console.log(new Date(data.time));
                // setLoading(false);
                function monthDiff(d1, d2) {
                    var months;
                    months = (d2.getFullYear() - d1.getFullYear()) * 12;
                    months -= d1.getMonth();
                    months += d2.getMonth();
                    return months <= 0 ? 0 : months;
                }

                function test(d1, d2) {
                    var diff = monthDiff(d1, d2);
                    console.log(
                        d1.toISOString().substring(0, 10),
                        "to",
                        d2.toISOString().substring(0, 10),
                        ":",
                        diff
                    );
                }
                test(
                    new Date(), // November 4th, 2008
                    new Date(data.time)  // March 12th, 2010
                );

                const date1 = new Date();
                const date2 = new Date(data.time);
                const diffTime = Math.abs(date2 - date1);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                console.log(diffTime + " milliseconds");
                console.log(diffDays + " days");

                console.log(new Date(date2.getTime() + data.duration * 60000).toLocaleTimeString())
            })
    }, [id])
    document.title = "Question";

    useEffect(() => {
        setIsTeacher(JSON.parse(localStorage.getItem("teacherAccess")) || {});
    }, [])

    // function closeModal() {
    //     setIsOpen(false);
    // }
    // function updateDetails(data) {
    //     console.log(data);
    // }
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {

            fetch(`http://localhost:5000/deleteQuestion/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(result => {
                    // localStorage.removeItem("student");
                    alert('Question Deleted')
                    if (result) {
                        // window.location.reload();
                        history.goBack()
                    }

                })
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
                                    {question.length===0?<><div>
                                        <h3  className='text-center'>Loading...</h3>
                                    </div></>: <div className=" ">
                                    <div className="semester-header"><h2>Question</h2></div>
                                    <div style={{margin:'0px 250px'}}>
                                        <div style={{ border: '3px solid gray', textAlign: 'center', padding: '10px' }}>
                                            <div>
                                                <h4><span className="text-primary">Exam Name:</span> {question.examName}</h4>
                                                <h5><span className="text-warning">Exam Category:</span> {question.category === 'mcq' ? <><span className='text-uppercase'>{question.category}</span> ({question.mcqCategory === 'mcqFillInTheBlanks'?<>MCQ and Fill in the Blanks</>:question.mcqCategory === 'onlyFillInTheBlanks'?<>Only Fill in the Blanks</>:<>Only MCQ</>})</> : <><span className='text-uppercase'>{question.category}</span></>}</h5>
                                                <h5><span className="text-warning">Department:</span> {question.department}</h5>
                                                <h5><span className="text-warning">Session:</span> {question.session}</h5>
                                                <h5><span className="text-warning">Semester:</span> {question.semester}</h5>
                                                <h5><span className="text-warning">Date:</span> {question?.time?.split('T')[0]}</h5>
                                                <h5><span className="text-warning">Start Time:</span> {question?.time?.split('T')[1]?.split(':')[0] > 12 ? (`${question?.time?.split('T')[1]?.split(':')[0] - 12}:${question?.time?.split('T')[1]?.split(':')[1]}`) : (question?.time?.split('T')[1])} {question?.time?.split('T')[1]?.split(':')[0] > 12 ? 'PM' : 'AM'}</h5>
                                                <h5><span className="text-warning">End Time:</span> {question.endTime}</h5>
                                                <h5><span className="text-warning">Duration:</span> {question.duration} min</h5>
                                                <h5><span className="text-warning">Full Mark:</span> {question?.question.map((data, index) => parseInt(data.mark)).reduce((partialSum, a) => partialSum + a, 0)}</h5>
                                                <div>
                                                    {question?.category === 'mcq' || question?.category === 'written' ? <>
                                                        <h5><span className="text-warning">Total Question:</span> {question.totalQuestion} </h5>
                                                        </> : <></>}
                                                </div>
                                            </div>
                                            <div>
                                                
                                            <Link className="btn btn-warning mr-3" to={`/updateQuestion/${question._id}`} type="submit">Update Question</Link>
                                            {/* <UpdateQuestionDetails modalIsOpen={modalIsOpen} question={question} updateDetails={updateDetails(question)} closeModal={closeModal}></UpdateQuestionDetails> */}
                                                <button onClick={() => handleDelete(question._id)} className="btn btn-danger" type="submit">Delete Question</button>
                                                
                                            </div>
                                        </div>
                                        <div>
                                            {question?.category === 'mcq' ? <div className="mb-5">
                                                {question?.question.map((data, index) => <div>
                                                    {data?.category === 'mcq' ? <div style={{ border: '3px solid gray', borderTop: 'none', backgroundColor: '#FFFEE2', textAlign: 'center', padding: '10px' }}>
                                                        <h5 className="text-primary">Question Number: <span>{index + 1}</span></h5>
                                                        <h5  className="text-warning">Question Name: <span>{data.questionName}</span></h5>
                                                        <h5 style={{color:'purple'}}>Answer 1: <span>{data.answer1}</span>{data.rightAnswer === 'answer1' && <span className="text-success"> (Right Answer)</span>}</h5>
                                                        <h5 style={{color:'purple'}}>Answer 2: <span>{data.answer2}</span>{data.rightAnswer === 'answer2' && <span className="text-success"> (Right Answer)</span>}</h5>
                                                        <h5 style={{color:'purple'}}>Answer 3: <span>{data.answer3}</span>{data.rightAnswer === 'answer3' && <span className="text-success"> (Right Answer)</span>}</h5>
                                                        <h5 style={{color:'purple'}}>Answer 4: <span>{data.answer4}</span>{data.rightAnswer === 'answer4' && <span className="text-success"> (Right Answer)</span>}</h5>
                                                        <h5  className="text-success">Mark: <span>{data.mark}</span></h5>
                                                    </div> : <div style={{ border: '3px solid gray', borderTop: 'none', backgroundColor: '#FFFEE2', textAlign: 'center', padding: '10px' }}>
                                                        <h5 className="text-primary">Question Number: <span>{index + 1}</span></h5>
                                                        <h5 className="text-warning">Question Name: <span>{data.questionName}</span></h5>
                                                        <h5 className="text-success">Right Answer: <span>{data.rightAnswer}</span></h5>
                                                        <h5  className="text-success">Mark: <span>{data.mark}</span></h5>
                                                        </div>}

                                                </div>)}

                                            </div> : question?.category === 'assignment' ? <><div style={{ border: '3px solid gray', borderTop: 'none', backgroundColor: '#FFFEE2', textAlign: 'center', padding: '10px' }}>
                                                {/* <h5 className="text-primary">Question Number: <span>{index+1}</span></h5> */}
                                                <h5 className="text-warning">Assignment Name: <span>{question.question[0]?.assignmentDetails}</span></h5>
                                                <h5 className="text-success">Assignment Category: <span>{question.question[0]?.assignmentCategory}</span> </h5>
                                                <h5 className="text-info">File Category: <span>{question.question[0]?.fileCategory}</span> </h5>
                                            </div> </> : question?.category === 'viva' ? <><div style={{ border: '3px solid gray', borderTop: 'none', backgroundColor: '#FFFEE2', textAlign: 'center', padding: '10px', marginBottom:'40px' }}>
                                                {/* <h5 className="text-primary">Question Number: <span>{index+1}</span></h5> */}
                                                <h5 className="text-warning">Viva Details: <span>{question.question[0]?.vivaDetails}</span></h5>
                                                <br></br>
                                                <h5 className="text-success">Host Link: <a target="blank" href={`//${question.question[0]?.hostLink}`}>{question.question[0]?.hostLink}</a> </h5>
                                                <br></br>
                                                <h5 className="text-success">Attendance Link: <a target="blank" href={`//${question.question[0]?.attendanceLink}`}>{question.question[0]?.attendanceLink}</a> </h5>
                                            </div> </> : question?.category === "written" ? <div className="mb-5">
                                                {question?.question.map((data, index) => <div>
                                                    <div style={{ border: '3px solid gray', borderTop: 'none', backgroundColor: '#FFFEE2', textAlign: 'center', padding: '10px' }}>
                                                        <h5 className="text-primary">Question Number: <span>{index + 1}</span></h5>
                                                        <h5 className="text-warning">Question Name: <span>{data.questionName}</span></h5></div>

                                                </div>)}


                                            </div> : <></>}
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

export default QuestionProfile;