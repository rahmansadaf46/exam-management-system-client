import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import TeacherHeader from '../TeacherHeader/TeacherHeader';
import TeacherSidebar from '../TeacherSidebar/TeacherSidebar';


const QuestionProfile = () => {
    const [isTeacher, setIsTeacher] = useState(false);
    const [question, setQuestion] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:5000/question/${id}`)
            .then(res => res.json())
            .then(data => {
                window.scrollTo(0, 0);
                data.endTime = new Date(new Date(data.time).getTime() + data.duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                setQuestion(data);
                console.log(data);
                // var date1 = new Date();
                // var date2 = new Date(data.time);
                // var diff = new Date(date2.getTime() - date1.getTime());

                // var years = diff.getUTCFullYear() - 1970; // Gives difference as year
                // var months = diff.getUTCMonth(); // Gives month count of difference
                // var days = diff.getUTCDate() - 1; // Gives day count of difference

                // console.log("remaining time = " + years + " years, " + months + " months, " + days + " days.", diff);
                // function diff_minutes(dt2, dt1) {

                //     var diff = (dt2.getTime() - dt1.getTime()) / 1000;
                //     diff /= 60;
                //     return Math.abs(Math.round(diff));

                // }
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
                                    <div className="semester-header"><h2>Question</h2></div>
                                    <div className="container">
                                        <div style={{ border: '3px solid gray', textAlign: 'center', padding: '10px' }}>
                                            <h4><span className="text-primary">Exam Name:</span> {question.examName}</h4>
                                            <h5><span className="text-warning">Exam Category:</span> {question.category}</h5>
                                            <h5><span className="text-warning">Department:</span> {question.department}</h5>
                                            <h5><span className="text-warning">Session:</span> {question.session}</h5>
                                            <h5><span className="text-warning">Semester:</span> {question.semester}</h5>
                                            <h5><span className="text-warning">Date:</span> {question?.time?.split('T')[0]}</h5>
                                            <h5><span className="text-warning">Start Time:</span> {question?.time?.split('T')[1]?.split(':')[0] > 12 ? (`${question?.time?.split('T')[1]?.split(':')[0] - 12}:${question?.time?.split('T')[1]?.split(':')[1]}`) : (question?.time?.split('T')[1])} {question?.time?.split('T')[1]?.split(':')[0] > 12 ? 'PM' : 'AM'}</h5>
                                            <h5><span className="text-warning">End Time:</span> {question.endTime}</h5>
                                            <h5><span className="text-warning">Duration:</span> {question.duration} min</h5>
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

export default QuestionProfile;