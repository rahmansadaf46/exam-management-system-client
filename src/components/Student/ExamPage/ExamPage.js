import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import StudentHeader from '../StudentHeader/StudentHeader';
import StudentSidebar from '../StudentSidebar/StudentSidebar';
import timesUp from '../../../images/ICON/timesUp.png'
import Carousel from 'react-bootstrap/Carousel';
const Countdown = ({ time, duration }) => {
    // const [countdownDate] = useState((new Date(time).getTime() + duration * 60000));
    const [state, setState] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        // setNewTime()
        // setInterval(() => {
        //     setNewTime()
        //     // if(state.seconds === 0 ){
        //     //     window.location.assign('/')
        //     // }
        //     console.log(state.seconds)
        // }, 10);
        let timeData = new Date(new Date(time).getTime() + duration * 60000) - new Date().getTime();
        console.log(parseInt(timeData / 1000))
        let filterTime = (parseInt(timeData / 1000)) * 1000;
        console.log(!isNaN(filterTime))
        // function stop(){
        //     clearInterval(intervalID);
        // }
        var refreshIntervalId = setInterval(() => {
            setNewTime()
            // if(state.seconds === 0 ){
            //     window.location.assign('/')
            // }
            // console.log(state.seconds)
        }, 10)
        if (!isNaN(filterTime)) {

            setInterval(() => {
                clearInterval(refreshIntervalId)
                // window.location.reload('/exam')
            }, filterTime);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [time, duration]);

    const setNewTime = () => {
        if (new Date(time).getTime() + duration * 60000) {
            const currentTime = new Date().getTime();

            const distanceToDate = new Date(time).getTime() + duration * 60000 - currentTime;

            let days = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
            let hours = Math.floor(
                (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
            );
            let minutes = Math.floor(
                (distanceToDate % (1000 * 60 * 60)) / (1000 * 60),
            );
            let seconds = Math.floor((distanceToDate % (1000 * 60)) / 1000);

            const numbersToAddZeroTo = [1, 2, 3, 4, 5, 6, 7, 8, 9];

            days = `${days}`;
            if (numbersToAddZeroTo.includes(hours)) {
                hours = `0${hours}`;
            } else if (numbersToAddZeroTo.includes(minutes)) {
                minutes = `0${minutes}`;
            } else if (numbersToAddZeroTo.includes(seconds)) {
                seconds = `0${seconds}`;
            }

            setState({ days: days, hours: hours, minutes, seconds });
        }
    };
    return (<div className='countdown-wrapper'>

        <div className='time-section'>
            <div className='time'>{state.hours || '00'}</div>
            <small className="time-text">Hours</small>
        </div>
        <div className='time-section'>
            <div className='time'>:</div>
        </div>
        <div className='time-section'>
            <div className='time'>{state.minutes || '00'}</div>
            <small className="time-text">Minutes</small>
        </div>
        <div className='time-section'>
            <div className='time'>:</div>
        </div>
        <div className='time-section'>
            <div className='time'>{state.seconds || '00'}</div>
            <small className="time-text">Seconds</small>
        </div>
    </div>)
}
// drag drop file component
function DragDropFile({handleFunction,question}) {
    // drag state
    const [file, setFile] = useState([])
    function handleFile(files) {
        console.log(files[0])
        setFile([files[0]])
        console.log(files[0].name)
        // index,question, mark, number, category, ans
        handleFunction(0, question.assignmentDetails, question.mark, 1, "File Submission", files[0])
        // alert("Number of files: " + files);
    }
    
    console.log(file)
    useEffect(()=>{
        // 
    },[file])
    const [dragActive, setDragActive] = React.useState(false);
    // ref
    const inputRef = React.useRef(null);

    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files);
        }
    };

    // triggers when file is selected with click
    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files);
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = (e) => {
        inputRef.current.click();
        e.preventDefault()
    };

    return (
        <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
            <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
            <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                {file.length > 0 ? <>
                    <div>
                        <p>{file[0].name}</p>
                    </div>

                </> : <div>
                    <p>Drag and drop your file here or</p>
                    <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
                </div>}
            </label>
            {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
        </form>
    );
};

const ExamPage = () => {
    const [student, setStudent] = useState([]);
    const [answer, setAnswer] = useState([]);
    // const [semester, setSemester] = useState({});
    const [isStudent, setIsStudent] = useState(false);
    // const [student, setStudent] = useState([]);
    const [result, setResult] = useState(false);
    const [category, setCategory] = useState('')
    // const [resultCount, setResultCount] = useState("");
    const [question, setQuestion] = useState([]);
    const [questionData, setQuestionData] = useState({});
    // const [answer, setAnswer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [timeUp, setTimeUp] = useState(false);
    const { id } = useParams();
    console.log(id)

    document.title = "Exam Page";

    useEffect(() => {
        setStudent(JSON.parse(localStorage.getItem("studentData")) || {});
        setIsStudent(JSON.parse(localStorage.getItem("studentAccess")) || {});
        // setSemester(JSON.parse(localStorage.getItem("semesterData"))[0] || {});
        fetch(`http://localhost:5000/questionFind/${id}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)

                // setLoading(false)
                if (res.validation === true) {
                    setLoading(false)
                    setQuestionData(res.question);
                    setCategory(res.question.category);
                    setQuestion(shuffle(res.question.question));
                }
                else {
                    setLoading(false)
                    setTimeUp(true)
                }
                // const filterMcq = res.question.question.filter(data => data.category === 'mcq')
                // console.log(filterMcq)
                // let answer = [];
                // filterMcq.map(el=>{
                //     answer.push([el.answer1,])
                // })

            })



    }, [id])
    useEffect(() => {

        let time = new Date(new Date(questionData.time).getTime() + questionData.duration * 60000) - new Date().getTime();
        console.log(parseInt(time / 1000))
        let filterTime = (parseInt(time / 1000)) * 1000;
        console.log(!isNaN(filterTime))
        if (!isNaN(filterTime)) {
            setInterval(() => {
                window.location.assign(`/examPage/${questionData._id}`)
            }, filterTime);
        }


        // setInterval(() => {
        //     window.location.assign('/exam')
        //     // if(state.seconds === 0 ){
        //     //     window.location.assign('/')
        //     // }
        //     // console.log(state.seconds)
        // }, Math.round(new Date(new Date(questionData.time).getTime() + questionData.duration * 60000)- new Date().getTime() / 1000));
    }, [questionData.time, questionData.duration, questionData._id])

    const handleChange = (index,question, mark, number, category, ans) => {
        console.log({
            index: index,
            questionNumber: number,
            questionCategory: category,
            answer: ans
        })
        let data = {
            index: index + 1,
            questionName: question,
            mark: parseInt(mark),
            questionNumber: number,
            category: category,
            answer: ans
        }
        if (answer.find(ans => ans.index === index + 1) === undefined) {
            const previousAnswer = [...answer, data]
            setAnswer(previousAnswer)
        }
        else {
            let newAns = answer.filter(ans => ans.index !== index + 1)
            const previousAnswer = [...newAns, data]
            setAnswer(previousAnswer)
        }
        // const findQues = question.filter(question => question.data.question === ques)
        // // console.log(findQues)
        // let data = {}
        // if (findQues[0].data.rightAnswer === ans) {
        //     data.question = ques;
        //     data.answer = 'Right'
        // }
        // else if (findQues[0].data.rightAnswer !== ans) {
        //     data.question = ques;
        //     data.answer = 'Wrong'
        // }
        // //    console.log(sameQues)
        // if (answer.find(ans => ans.question === ques) === undefined) {
        //     const previousAnswer = [...answer, data]
        //     setAnswer(previousAnswer)
        // }
        // else {
        //     let newAns = answer.filter(ans => ans.question !== ques)
        //     const previousAnswer = [...newAns, data]
        //     setAnswer(previousAnswer)
        // }




    }

    const handleSubmit = () => {
        // console.log(answer)
        // const result = answer.filter(ans => ans.answer === 'Right')
        // alert(`Your result is ${result.length}/${question.length}`)
        // window.location.assign('/')
        // setResultCount(result.length)
        // setResult(true)
        console.log(answer,questionData,student)

    }
    function shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    console.log(category, question)
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <div >
            <>
                {
                    isStudent === true ?
                        <div>
                            <StudentHeader></StudentHeader>
                            <div className="d-flex">
                                <div className="col-md-2">
                                    <StudentSidebar></StudentSidebar>
                                </div>
                                <div style={{ backgroundColor: '#F4F7FC', minHeight: '87vh', height: 'auto', width: '100%' }} className=" pt-3">
                                    {loading && <h2 className='text-center mt-5 text-warning'>Loading...</h2>}

                                    {timeUp && <div className='text-center mt-5 '><img src={timesUp} alt="" /></div>}
                                    {
                                        question.length > 0 && <Countdown time={questionData?.time} duration={questionData?.duration} />}

                                    <div style={{ position: 'relative', top: '5px' }} className=" ">

                                        {/* <div className="semester-header"><h2>Exam Page</h2></div> */}
                                        {
                                            question.length > 0 && <div className='text-center mt-5'>
                                                <h3 className='text-success'>{questionData.examName}</h3>
                                                {/* <h5><span className="text-warning">Date:</span> {questionData?.time?.split('T')[0]}</h5> */}
                                                {/* <h5><span className="text-warning">Start Time:</span> {questionData?.time?.split('T')[1]?.split(':')[0] > 12 ? (`${questionData?.time?.split('T')[1]?.split(':')[0] - 12}:${questionData?.time?.split('T')[1]?.split(':')[1]}`) : (questionData?.time?.split('T')[1])} {questionData?.time?.split('T')[1]?.split(':')[0] > 12 ? 'PM' : 'AM'}</h5> */}

                                                <h5><span className="text-warning">End Time:</span>  {new Date(new Date(questionData?.time).getTime() + questionData?.duration * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h5>
                                                <h5><span className="text-warning">Duration:</span> {questionData?.duration} Min</h5>
                                                <h5><span className="text-warning">Total Mark:</span> {question?.map((data, index) => parseInt(data.mark)).reduce((partialSum, a) => partialSum + a, 0)}</h5>
                                                {questionData?.category === 'mcq' || questionData?.category === 'written' ? <>
                                                    <h5><span className="text-warning">Total Question:</span> {questionData.totalQuestion} </h5>
                                                </> : <></>}
                                            </div>
                                        }

                                        {
                                            category === 'mcq' && <div style={{ marginBottom: '100px', display: result ? 'none' : 'flex' }} className="container pb-3  justify-content-center">
                                                <div style={{ width: '800px' }} className="text-center ">
                                                    <Carousel style={{ marginBottom: '-20px', marginTop: '-10px' }} indicators={false} interval={null} variant="dark" fade={true} activeIndex={index} onSelect={handleSelect}>

                                                        {
                                                            question?.map((question, index) =>
                                                                <Carousel.Item style={{ padding: ' 40px 90px 10px 90px' }} >
                                                                    <div className=''>
                                                                        <form action="#" method="post" style={{ fontSize: '20px', border: '1px solid white', padding: '40px', width: '100%', borderRadius: '10px', boxShadow: '5px 5px 20px gray', marginBottom: '50px' }}>
                                                                            <fieldset >
                                                                                <p className="font-weight-bold text-primary">Ques no: <span>{index + 1}</span> <br /> <span style={{ userSelect: 'none' }} className="text-danger">{question.questionName}</span></p>
                                                                                <p style={{ marginTop: '-12px' }} className='text-success'>Mark: <span>{question.mark}</span></p>
                                                                                {question.category === 'mcq' ? <>{
                                                                                    [{ answer: question.answer1, value: 'answer1' }, { answer: question.answer2, value: 'answer2' }, { answer: question.answer3, value: 'answer3' }, { answer: question.answer4, value: 'answer4' }].map(answer => <>
                                                                                        <div style={{ lineHeight: '0.5' }}>
                                                                                            <label className="rad-label">
                                                                                                <input
                                                                                                    onBlur={() => handleChange(index, question.questionName, question.mark, question.questionNumber, question.category, answer.value)}
                                                                                                    type="radio" className="rad-input" name="rad" />
                                                                                                <div className="rad-design" />
                                                                                                <div style={{ userSelect: 'none' }} className="rad-text">{answer.answer}</div>
                                                                                            </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                                        </div></>)
                                                                                }

                                                                                </> : question.category === 'fillInTheGaps' ? <>
                                                                                    <label >
                                                                                        <textArea
                                                                                            onBlur={(e) => handleChange(index, question.questionName, question.mark, question.questionNumber, question.category, e.target.value)}
                                                                                            style={{ width: '400px' }}
                                                                                            type="text" className="form-control" />

                                                                                    </label>
                                                                                </> : <></>}


                                                                            </fieldset>
                                                                        </form>


                                                                    </div>
                                                                </Carousel.Item>
                                                            )

                                                        }




                                                    </Carousel>


                                                    {/* <input type="Submit" defaultValue="Proceed" /> */}
                                                    {
                                                        question.length === 0 ? <div className="text-center text-primary"><h2>Loading...</h2></div> : <button style={{ fontSize: '20px' }} onClick={() => handleSubmit()} className="btn btn-success font-weight-bold px-5">Submit</button>
                                                    }
                                                </div>
                                            </div>
                                        }
                                        {
                                            category === 'assignment' && question.length > 0 && <><div style={{ marginBottom: '100px', display: result ? 'none' : 'flex' }} className="container py-3  justify-content-center">
                                                <div className="text-center w-50">

                                                    <form action="#" method="post" style={{ fontSize: '20px', border: '1px solid white', padding: '40px', width: '100%', borderRadius: '10px', boxShadow: '5px 5px 20px gray', marginBottom: '50px' }}>
                                                        <fieldset >
                                                            <p className="font-weight-bold mb-4"><span style={{ userSelect: 'none' }} className="text-danger">{question[0].assignmentDetails}</span></p>

                                                            {
                                                                question[0].assignmentCategory === 'File Submission' ? <>
                                                                    <div className='d-flex justify-content-center'>
                                                                    <DragDropFile handleFunction={handleChange} question={question[0]}/>
                                                                    </div>
                                                                </> : <>

                                                                    <label >
                                                                        <textArea
                                                                            // onChange={(e) => handleChange(question.questionNumber,question.category, e.target.value)} 
                                                                            style={{ width: '400px' }}
                                                                            placeholder="Enter Link Here"
                                                                            type="text" className="form-control" />

                                                                    </label>
                                                                </>
                                                            }


                                                        </fieldset>
                                                    </form>


                                                    {/* <input type="Submit" defaultValue="Proceed" /> */}
                                                    {
                                                        question.length === 0 ? <div className="text-center text-primary"><h2>Loading...</h2></div> : <button style={{ fontSize: '20px' }} onClick={() => handleSubmit()} className="btn btn-success font-weight-bold px-5">Submit</button>
                                                    }
                                                </div>
                                            </div></>
                                        }


                                        {
                                            category === 'viva' && question.length > 0 && <><div style={{ marginBottom: '100px', display: result ? 'none' : 'flex' }} className="container py-3  justify-content-center">
                                                <div className="text-center w-50">
                                                    <form action="#" method="post" style={{ fontSize: '20px', border: '1px solid white', padding: '40px', width: '100%', borderRadius: '10px', boxShadow: '5px 5px 20px gray', marginBottom: '50px' }}>
                                                        <fieldset >
                                                            <p className="font-weight-bold mb-4"><span style={{ userSelect: 'none' }} className="text-danger">{question[0].vivaDetails}</span></p>
                                                            <p className="font-weight-bold mb-4">Attendance Link : <span style={{ userSelect: 'none' }} className="text-primary"><a target="blank" href={`//${question[0]?.attendanceLink}`}>{question[0]?.attendanceLink}</a></span></p>
                                                        </fieldset>
                                                    </form>
                                                    <br />
                                                </div>
                                            </div></>
                                        }
                                        {
                                            category === 'written' && <div style={{ marginBottom: '100px', display: result ? 'none' : 'flex' }} className="container pb-3  justify-content-center">
                                                <div style={{ width: '800px' }} className="text-center ">
                                                    <Carousel style={{ marginBottom: '-20px', marginTop: '-10px' }} indicators={false} interval={null} variant="dark" fade={true} activeIndex={index} onSelect={handleSelect}>
                                                        {
                                                            question?.map((question, index) =>
                                                                <Carousel.Item style={{ padding: ' 40px 90px 10px 90px' }} >
                                                                    <div className=''>
                                                                        <form action="#" method="post" style={{ fontSize: '20px', border: '1px solid white', padding: '40px', width: '100%', borderRadius: '10px', boxShadow: '5px 5px 20px gray', marginBottom: '50px' }}>
                                                                            <fieldset >
                                                                                <p style={{ marginTop: '-20px' }} className="font-weight-bold text-primary">Ques no: <span>{index + 1}</span> <br /> <span style={{ userSelect: 'none' }} className="text-danger">{question.questionName}</span></p>
                                                                                <p style={{ marginTop: '-12px' }} className='text-success'>Mark: <span>{question.mark}</span></p>
                                                                                <label >
                                                                                    <textArea
                                                                                        onBlur={(e) => handleChange(index, question.questionName, question.mark, question.questionNumber, question.category, e.target.value)}
                                                                                        style={{ width: '400px', marginBottom: '-15px', height: '200px' }}
                                                                                        type="text" className="form-control" />

                                                                                </label>



                                                                            </fieldset>
                                                                        </form>

                                                                    </div>
                                                                </Carousel.Item>
                                                            )

                                                        }
                                                    </Carousel>


                                                    {/* <input type="Submit" defaultValue="Proceed" /> */}
                                                    {
                                                        question.length === 0 ? <div className="text-center text-primary"><h2>Loading...</h2></div> : <button style={{ fontSize: '20px' }} onClick={() => handleSubmit()} className="btn btn-success font-weight-bold px-5">Submit</button>
                                                    }
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>

                        </div> : <Unauthorized />
                }
            </>
        </div>
    );
};

export default ExamPage;