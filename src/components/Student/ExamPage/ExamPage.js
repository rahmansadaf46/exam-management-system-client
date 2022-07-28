import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import StudentHeader from '../StudentHeader/StudentHeader';
import StudentSidebar from '../StudentSidebar/StudentSidebar';

  
  
  // drag drop file component
  function DragDropFile() {
    // drag state
    const [file, setFile] = useState('')
    function handleFile(files) {
        console.log(files[0].name)
        // alert("Number of files: " + files);
      }
    const [dragActive, setDragActive] = React.useState(false);
    // ref
    const inputRef = React.useRef(null);
    
    // handle drag events
    const handleDrag = function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };
    
    // triggers when file is dropped
    const handleDrop = function(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files);
      }
    };
    
    // triggers when file is selected with click
    const handleChange = function(e) {
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
        <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
          <div>
            <p>Drag and drop your file here or</p>
            <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
          </div> 
        </label>
        { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
      </form>
    );
  };

const ExamPage = () => {
    const [semester, setSemester] = useState({});
    const [isStudent, setIsStudent] = useState(false);
    const [student, setStudent] = useState([]);
    const [result, setResult] = useState(false);
    const [category, setCategory] = useState('')
    const [resultCount, setResultCount] = useState("");
    const [question, setQuestion] = useState([]);
    const [answer, setAnswer] = useState([]);
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
                setCategory(res.question.category)
                setQuestion(res.question.question)
                // const filterMcq = res.question.question.filter(data => data.category === 'mcq')
                // console.log(filterMcq)
                // let answer = [];
                // filterMcq.map(el=>{
                //     answer.push([el.answer1,])
                // })

            })



    }, [id])


    const handleChange = (number,category, ans) => {
        console.log(number,category, ans)
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
        const result = answer.filter(ans => ans.answer === 'Right')
        // alert(`Your result is ${result.length}/${question.length}`)
        // window.location.assign('/')
        setResultCount(result.length)
        setResult(true)

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
                                    <div className="semester-header"><h2>Exam Page</h2></div>
                                    {
                                        category === 'mcq' && <div style={{ marginTop: '100px', marginBottom: '100px', display: result ? 'none' : 'flex' }} className="container py-5  justify-content-center">
                                        <div style={{}} className="text-center">

                                            { 
                                                shuffle(question)?.map((question, index) =>
                                                    
                                                    <form action="#" method="post" style={{ fontSize: '20px', border: '1px solid white', padding: '40px', width: '100%', borderRadius: '50px', boxShadow: '5px 5px 20px gray', marginBottom: '50px' }}>
                                                        <fieldset >
                                                            <p className="font-weight-bold mb-4">Ques no : {index + 1} <br /> <span style={{userSelect: 'none'}} className="text-primary">{question.questionName}</span></p>
                                                        
                                                            {question.category === 'mcq' ? <>{
                                                                shuffle([{answer:question.answer1, value:'answer1'},{answer:question.answer2, value:'answer2'},{answer:question.answer3, value:'answer3'},{answer:question.answer4, value:'answer4'}]).map(answer => <>     
                                                                <label className="rad-label">
                                                                <input 
                                                                onClick={() => handleChange(question.questionNumber,question.category, answer.value)} 
                                                                type="radio" className="rad-input" name="rad" />
                                                                <div className="rad-design" />
                                                                <div style={{userSelect: 'none'}} className="rad-text">{answer.answer}</div>
                                                            </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>) 
                                                            }
                                                          
                                                            </>:question.category === 'fillInTheGaps' ?<>
                                                            <label >
                                                                <textArea 
                                                                onChange={(e) => handleChange(question.questionNumber,question.category, e.target.value)} 
                                                                style={{width:'400px'}}
                                                                type="text" className="form-control"  />
                                                            
                                                            </label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </>:<></>}


                                                        </fieldset>
                                                    </form>)

                                            }

                                            <br />


                                            {/* <input type="Submit" defaultValue="Proceed" /> */}
                                            {
                                                question.length === 0 ? <div className="text-center text-primary"><h2>Loading...</h2></div> : <button onClick={() => handleSubmit()} className="btn btn-primary font-weight-bold">Submit</button>
                                            }
                                        </div>
                                    </div>
                                    }
                                    {
                                        category === 'assignment' && question.length > 0 && <><div style={{ marginTop: '100px', marginBottom: '100px', display: result ? 'none' : 'flex' }} className="container py-5  justify-content-center">
                                        <div style={{}} className="text-center">

                                        <form action="#" method="post" style={{ fontSize: '20px', border: '1px solid white', padding: '40px', width: '100%', borderRadius: '50px', boxShadow: '5px 5px 20px gray', marginBottom: '50px' }}>
                                                        <fieldset >
                                                            <p className="font-weight-bold mb-4"><span style={{userSelect: 'none'}} className="text-primary">{question[0].assignmentDetails}</span></p>
                                                        
                                                            {
                                                                question[0].assignmentCategory === 'File Submission' ?<>
                                                                <DragDropFile />
                                                                </>:<></>
                                                            }


                                                        </fieldset>
                                                    </form>

                                            <br />


                                            {/* <input type="Submit" defaultValue="Proceed" /> */}
                                            {
                                                question.length === 0 ? <div className="text-center text-primary"><h2>Loading...</h2></div> : <button onClick={() => handleSubmit()} className="btn btn-primary font-weight-bold">Submit</button>
                                            }
                                        </div>
                                    </div></>
                                    }

                                </div>
                            </div>
                        </div>

                    </div> : <Unauthorized />
            }
        </>
    );
};

export default ExamPage;