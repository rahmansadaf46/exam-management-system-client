import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import TeacherHeader from '../TeacherHeader/TeacherHeader';
import TeacherSidebar from '../TeacherSidebar/TeacherSidebar';
import FillInTheBlanks from './FillInTheBlanks';
import McqCategory from './McqCategory';
import WrittenExam from './WrittenExam';


const CreateExam = () => {
    const [semester, setSemester] = useState({});
    const [category, setCategory] = useState('');
    const [mcqCategory, setMcqCategory] = useState('');
    const [assignmentCategory, setAssignmentCategory] = useState('');
    const [quantityView, setQuantityView] = useState(false);
    const [questionQuantity, setQuestionQuantity] = useState(0);
    const [isTeacher, setIsTeacher] = useState(false);
    const [teacherData, setTeacherData] = useState([]);
    const [mcqQuestion, setMcqQuestion] = useState([{
        category: "mcq",
        questionNumber: 1,
        questionName: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        rightAnswer: ""
    }]);
    const [fillInTheGapsQuestion, setFillInTheGapsQuestion] = useState([{
        category: "fillInTheGaps",
        questionNumber: 1,
        questionName: "",
        rightAnswer: ""
    }]);
    const [writtenExamQuestion, setWrittenExamQuestion] = useState([{
        category: "writtenExam",
        questionNumber: 1,
        questionName: "",
    }]);

    const [loading] = useState(false);

    const { register, handleSubmit, errors } = useForm();

    document.title = "Create Exam";
    const onSubmit = data => {
        let validation = true;
        let categoryValue = category;
        if (categoryValue === 'mcq') {

            // let mcqCategoryValue = mcqCategory;
            if (mcqCategory === "") {
                validation = false;
                window.alert("Please enter MCQ Category");
            }
            else if (mcqCategory === 'mcqFillInTheBlanks') {

                if (data.questionQuantity > data.totalQuestion) {
                    window.alert("Please Enter Right Question Quantity");
                    validation = false;
                }
                else {
                    const question = mcqQuestion.concat(fillInTheGapsQuestion)
                    const found = question.map(data => Object.values(data));
                    const questionValues = Array.prototype.concat.apply([], found)
                    const valueChecking = questionValues.some(el => el === '');
                    if (valueChecking) {
                        window.alert('Please insert all question answer');
                        validation = false;
                    }
                    else {
                        window.alert(' All question inserted')
                        console.log(question, questionValues, valueChecking)
                        data.question = question;
                    }

                }
                // console.log(data.totalQuestion, data.questionQuantity)
            }
            else if (mcqCategory === 'onlyMcq') {

                if (data.questionQuantity > data.totalQuestion) {
                    window.alert("Please Enter Right Question Quantity");
                    validation = false;
                }
                else {
                    // const question = mcqQuestion.concat(fillInTheGapsQuestion)
                    const question = mcqQuestion.map(data => Object.values(data));
                    const questionValues = Array.prototype.concat.apply([], question)
                    const valueChecking = questionValues.some(el => el === '');
                    if (valueChecking) {
                        window.alert('Please insert all question answer');
                        validation = false;
                    }
                    else {
                        window.alert(' All question inserted')
                        console.log(mcqQuestion, questionValues, valueChecking);
                        data.question = mcqQuestion;
                    }

                }
                console.log(data.totalQuestion, data.questionQuantity)
            }
            else if (mcqCategory === 'onlyFillInTheBlanks') {

                if (data.questionQuantity > data.totalQuestion) {
                    window.alert("Please Enter Right Question Quantity");
                    validation = false;
                }
                else {
                    // const question = mcqQuestion.concat(fillInTheGapsQuestion)
                    const question = fillInTheGapsQuestion.map(data => Object.values(data));
                    const questionValues = Array.prototype.concat.apply([], question)
                    const valueChecking = questionValues.some(el => el === '');
                    if (valueChecking) {
                        window.alert('Please insert all question answer');
                        validation = false;
                    }
                    else {
                        window.alert(' All question inserted')
                        console.log(fillInTheGapsQuestion, questionValues, valueChecking)
                        data.question = fillInTheGapsQuestion;
                    }

                }
                console.log(data.totalQuestion, data.questionQuantity)
            }
            else {
                if (data.questionQuantity > data.totalQuestion) {
                    window.alert("Please Enter Right Question Quantity");
                    validation = false;
                }
                else {

                }
                // console.log(data.totalQuestion, data.questionQuantity)
            }
            // console.log(mcqCategoryValue)
        }
        data.teacherName = teacherData[0].name;
        data.email = teacherData[0].email;
        data.category = categoryValue;
        console.log(validation)
        if (validation) {
            console.log(data);
        }

        // if (data) {
        //     setLoading(true);
        // }
        // // https://demo-0523.herokuapp.com/admin/addAdmin
        // fetch('http://localhost:5000/addAdmin', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        //     .then(res => res.json())
        //     .then(success => {
        //         if (success) {
        //             setLoading(false);
        //             alert("Admin Added");
        //             window.location.reload();
        //         }
        //     })

    }
    useEffect(() => {
        setIsTeacher(JSON.parse(localStorage.getItem("teacherAccess")) || {});
        setSemester(JSON.parse(localStorage.getItem("selectedSemester")) || {});
        setTeacherData(JSON.parse(localStorage.getItem("teacherData")) || []);

    }, [])


    let handleChange = (e) => {
        // console.log(e)
        setCategory(e)
        if (e !== "mcq") {
            setMcqCategory("")
        }
        if (e === 'written') {
            setWrittenExamQuestion([{
                category: "writtenExam",
                questionNumber: 1,
                questionName: "",
            }])
            setQuantityView(true)
            setQuestionQuantity(1);
        } else {
            setQuantityView(false);
            setQuestionQuantity(0);
        }

    }
    let handleChangeMCQCategory = (e) => {
        // console.log(e)
        setMcqCategory(e);
        if (e !== '') {
            setQuantityView(true)
        }
        else {
            setQuantityView(false)
        }

        if (e === 'mcqFillInTheBlanks') {
            setQuestionQuantity(2);
        }
        else if (e === 'onlyMcq') {
            setQuestionQuantity(1);
        } else if (e === 'onlyFillInTheBlanks') {
            setQuestionQuantity(1);
        }
        else {
            setQuestionQuantity(0);
        }
        setMcqQuestion([{
            category: "mcq",
            questionNumber: 1,
            questionName: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            rightAnswer: ""
        }])
        setFillInTheGapsQuestion([{
            category: "fillInTheGaps",
            questionNumber: 1,
            questionName: "",
            rightAnswer: ""
        }])
    }
    let handleChangeAssignmentCategory = (e) => {
        // console.log(e)
        setAssignmentCategory(e);
    }


    let handleChangeMCQ = (i, e) => {
        // console.log(i)
        let newFormValues = [...mcqQuestion];
        newFormValues[i][e.target.name] = e.target.value;
        setMcqQuestion(newFormValues);
    }

    let handleChangeFillInTheGaps = (i, e) => {
        // console.log(i)
        let newFormValues = [...fillInTheGapsQuestion];
        newFormValues[i][e.target.name] = e.target.value;
        setFillInTheGapsQuestion(newFormValues);
    }
    let addFormFieldsFillInTheBlanks = () => {
        setFillInTheGapsQuestion([...fillInTheGapsQuestion, {
            category: 'fillInTheGaps',
            questionNumber: fillInTheGapsQuestion.length + 1,
            questionName: "",
            rightAnswer: ""
        }])
        setQuestionQuantity(questionQuantity + 1)
    }
    let removeFormFieldsFillInTheBlanks = (i) => {
        let newFormValues = [...fillInTheGapsQuestion];
        newFormValues.splice(i, 1);
        setFillInTheGapsQuestion(newFormValues)
        setQuestionQuantity(questionQuantity - 1)
    }

    // function FillInTheBlank({ index, element, handleChangeFillInTheGaps, removeFormFieldsFillInTheBlanks }) {
    //     return <div>
    //         <section className="mcq" key={index}>
    //             <h5 className="text-primary"><span className="text-success">Fill In The Blanks</span> Question Number {index + 1}</h5>

    //             <div className="form-group  ">
    //                 <div className="row mb-2">
    //                     <div className="col-10">
    //                         <label for=""><b>Enter Fill In The Blanks Question Name</b></label>
    //                     </div>
    //                     <div className="col-2 text-right">

    //                         {
    //                             index ?
    //                                 <button type="button" className="button remove btn btn-sm btn-danger" onClick={() => removeFormFieldsFillInTheBlanks(index)}>Remove</button>
    //                                 : null
    //                         }

    //                     </div>
    //                 </div>

    //                 <input type="text" name="questionName" placeholder="Enter Question Name" className="form-control" value={element.questionName || ""} onChange={e => handleChangeFillInTheGaps(index, e)} />
    //             </div>

    //             <div className="form-group row mb-1 d-flex justify-content-center">

    //                 <div className="form-group col-10  ">
    //                     <label for=""><b>Enter Right Answer</b></label>
    //                     <div>  <input type="text" onChange={e => handleChangeFillInTheGaps(index, e)} value={element.rightAnswer || ""} name="rightAnswer" placeholder="Enter Answer" className="form-control" />
    //                     </div>
    //                 </div>
    //             </div>
    //             <hr />
    //         </section>
    //     </div>

    //         // <section className="fill-in-the-blank">
    //         //     <div className="form-group  ">
    //         //         <label for=""><b>Enter Fill in the Blank Question Name</b></label>
    //         //         <input type="text" ref={register({ required: true })} name="question" placeholder="Enter Fill in the Blank Question Name" className="form-control" />
    //         //         {errors.name && <span className="">This field is required</span>}
    //         //     </div>

    //         //     <div className="form-group  ">
    //         //         <label for=""><b>Enter Blank Word</b></label>
    //         //         <input type="text" ref={register({ required: true })} name="question" placeholder="Enter Blank Word" className="form-control" />
    //         //         {errors.name && <span className="">This field is required</span>}
    //         //     </div>
    //         // </section>
    //         ;
    // }


    let handleWrittenExam = (i, e) => {
        // console.log(i)
        let newFormValues = [...writtenExamQuestion];
        newFormValues[i][e.target.name] = e.target.value;
        setWrittenExamQuestion(newFormValues);
    }
    let addFormFieldsWrittenExam = () => {
        setWrittenExamQuestion([...writtenExamQuestion, {
            category: 'writtenExam',
            questionNumber: writtenExamQuestion.length + 1,
            questionName: "",
        }])
        setQuestionQuantity(questionQuantity + 1)
    }
    let removeFormFieldsWrittenExam = (i) => {
        let newFormValues = [...writtenExamQuestion];
        newFormValues.splice(i, 1);
        setWrittenExamQuestion(newFormValues);
        setQuestionQuantity(questionQuantity - 1)
    }




    function AssignmentQuestion() {
        return <div className="form-group">
            <label for=""><b>Enter Assignment Details</b></label>
            <textarea type="text" ref={register({ required: true })} name="assignment" placeholder="Enter Assignment Details" className="form-control" />
            {errors.name && <span className="text-danger">This field is required</span>}

        </div>
    }


    function VivaQuestion(props) {
        return <div>
            <div style={{ fontSize: "20px" }} className="form-group text-center ">
                <a className="text-success" target="blank" href="https://ist-online-viva.netlify.app/create">Generate a link</a>
            </div>
            <div className="form-group">
                <label for=""><b>Enter Attendance Link</b></label>
                <input type="text" ref={props.register({ required: true })} name="attendanceLink" placeholder="Enter Viva Details" className="form-control" />
                {errors.name && <span className="text-danger">This field is required</span>}

            </div>
            <div className="form-group">
                <label for=""><b>Enter Host Link</b></label>
                <input type="text" ref={props.register({ required: true })} name="hostLink" placeholder="Enter Viva Details" className="form-control" />
                {errors.name && <span className="text-danger">This field is required</span>}

            </div>
            <div className="form-group">
                <label for=""><b>Enter Viva Details</b></label>
                <textarea type="text" ref={props.register({ required: true })} name="vivaExam" placeholder="Enter Viva Details" className="form-control" />
                {errors.name && <span className="text-danger">This field is required</span>}

            </div>
        </div>
    }

    let addFormFields = () => {
        setMcqQuestion([...mcqQuestion, {
            category: 'mcq',
            questionNumber: mcqQuestion.length + 1,
            questionName: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            rightAnswer: ""
        }])
        setQuestionQuantity(questionQuantity + 1)
    }
    let removeFormFields = (i) => {
        let newFormValues = [...mcqQuestion];
        newFormValues.splice(i, 1);
        setMcqQuestion(newFormValues)
        setQuestionQuantity(questionQuantity - 1)
    }


    console.log(semester, teacherData);
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
                                    <div className="semester-header"><h2>Create Exam</h2></div>
                                    {
                                        loading === true ? <img className="rounded mx-auto mt-5 d-block " style={{ width: '40%', height: '40%' }} src="https://i.gifer.com/YCZH.gif" alt="" />
                                            : <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <div style={{ width: '40%' }} className="row">
                                                    <div className="col-md-12">
                                                        <form className="p-4" onSubmit={handleSubmit(onSubmit)}>
                                                            <div className="form-group">
                                                                <label for=""><b>Exam Name</b></label>
                                                                <textarea type="text" ref={register({ required: true })} name="examName" placeholder="Enter Exam Name" className="form-control" />
                                                                {errors.name && <span className="text-danger">This field is required</span>}

                                                            </div>
                                                            <div>
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <div className="form-group">
                                                                            <label for=""><b>Department</b></label>
                                                                            <input type="text" value={semester.department} readOnly ref={register({ required: true })} name="department" placeholder="" className="form-control" />
                                                                            {errors.name && <span className="text-danger">This field is required</span>}

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="form-group">
                                                                            <label for=""><b>Session</b></label>
                                                                            <input type="text" readOnly value={semester.session} ref={register({ required: true })} name="session" placeholder="" className="form-control" />
                                                                            {errors.name && <span className="text-danger">This field is required</span>}

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className=" row justify-content-center">
                                                                    <div className="form-group col-6">
                                                                        <label for=""><b>Semester</b></label>
                                                                        <input type="text" readOnly value={semester.semester} ref={register({ required: true })} name="semester" placeholder="" className="form-control" />
                                                                        {errors.name && <span className="text-danger">This field is required</span>}

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row justify-content-center">
                                                                <div className="form-group">
                                                                    <label for=""><b>Enter Start Time</b></label>
                                                                    <input style={{ width: '95%' }} type="datetime-local" ref={register({ required: true })} name="time" className="form-control" />
                                                                    {errors.name && <span className="text-danger">This field is required</span>}

                                                                </div>
                                                                <div className="form-group">
                                                                    <label for=""><b>Enter Duration(In Minutes)</b></label>
                                                                    <input type="number" ref={register({ required: true })} name="duration" placeholder="Enter Duration" className="form-control" />
                                                                    {errors.name && <span className="text-danger">This field is required</span>}

                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label for=""><b>Select Category</b></label>
                                                                <select
                                                                    onChange={(event) => handleChange(event.target.value)}
                                                                    // value={currentDepartment} 
                                                                    className="form-control">
                                                                    <option value="">Select Category</option>
                                                                    <option value="mcq">MCQ/Fill in the Blanks</option>
                                                                    <option value="written">Written Exam</option>
                                                                    <option value="assignment">Assignment</option>
                                                                    <option value="viva">Online Viva</option>
                                                                </select>

                                                            </div>
                                                            {category === 'mcq' && <div className="form-group">
                                                                <label for=""><b>Select MCQ Category</b></label>
                                                                <select
                                                                    onChange={(event) => handleChangeMCQCategory(event.target.value)}
                                                                    // value={currentDepartment} 
                                                                    className="form-control">
                                                                    <option value="">Select MCQ Category</option>
                                                                    <option value="mcqFillInTheBlanks">MCQ and Fill in the Blanks</option>
                                                                    <option value="onlyMcq">Only MCQ</option>
                                                                    <option value="onlyFillInTheBlanks">Only Fill in the Blanks</option>

                                                                </select>

                                                            </div>}
                                                            {quantityView && <>   <div className="row">
                                                                <div className="col-6">
                                                                    <div className="form-group">
                                                                        <label for=""><b>Enter The Quantity of Questions</b></label>
                                                                        <input type="text" ref={register({ required: true })} name="questionQuantity" placeholder="Enter Quantity" className="form-control" />
                                                                        {errors.name && <span className="text-danger">This field is required</span>}

                                                                    </div>
                                                                </div>
                                                                <div className="col-6 mt-4">
                                                                    <div className="form-group">
                                                                        <label for=""><b>Total Question</b></label>
                                                                        <input value={questionQuantity} type="text" ref={register({ required: true })} readOnly name="totalQuestion" placeholder="Total Question" className="form-control" />
                                                                        {errors.name && <span className="text-danger">This field is required</span>}

                                                                    </div>
                                                                </div>
                                                            </div></>}

                                                            <div className="">
                                                                <div>

                                                                    {mcqCategory === 'onlyMcq' ? <div>
                                                                        <hr />
                                                                        {mcqQuestion.map((element, index) => <McqCategory index={index} element={element} handleChangeMCQ={handleChangeMCQ} removeFormFields={removeFormFields}></McqCategory>)}
                                                                        <div className="text-right">
                                                                            <button className="button add btn btn-dark btn-sm " type="button" onClick={() => addFormFields()}>Add Question</button>
                                                                        </div>

                                                                    </div> : <></>}

                                                                    {mcqCategory === 'onlyFillInTheBlanks' ? <div>
                                                                        <hr />
                                                                        {fillInTheGapsQuestion.map((element, index) => <FillInTheBlanks index={index} element={element} handleChangeFillInTheGaps={handleChangeFillInTheGaps} removeFormFieldsFillInTheBlanks={removeFormFieldsFillInTheBlanks}></FillInTheBlanks>)}
                                                                        <div className="text-right">
                                                                            <button className="button add btn btn-dark btn-sm " type="button" onClick={() => addFormFieldsFillInTheBlanks()}>Add Question</button>
                                                                        </div>

                                                                    </div> : <></>}
                                                                    {mcqCategory === 'mcqFillInTheBlanks' ? <div>
                                                                        <hr />
                                                                        <div>
                                                                            {mcqQuestion.map((element, index) => <McqCategory index={index} element={element} handleChangeMCQ={handleChangeMCQ} removeFormFields={removeFormFields}></McqCategory>)}
                                                                            <div className="text-right">
                                                                                <button className="button add btn btn-dark btn-sm " type="button" onClick={() => addFormFields()}>Add Question</button>
                                                                            </div>

                                                                        </div>
                                                                        <div>
                                                                            <div style={{ borderTop: '5px solid #FB9937', margin: '50px 0px' }}></div>
                                                                            {fillInTheGapsQuestion.map((element, index) => <FillInTheBlanks index={index} element={element} handleChangeFillInTheGaps={handleChangeFillInTheGaps} removeFormFieldsFillInTheBlanks={removeFormFieldsFillInTheBlanks}></FillInTheBlanks>)}
                                                                            <div className="text-right">
                                                                                <button className="button add btn btn-dark btn-sm " type="button" onClick={() => addFormFieldsFillInTheBlanks()}>Add Question</button>
                                                                            </div>

                                                                        </div>
                                                                    </div> : <></>}

                                                                    {/* {category === 'mcq' && <div>  {mcqQuestion.map((element, index) => <div className="form-group" key={index}>
                                                                        <label for=""><b>Enter MCQ Question Name</b></label>
                                                                        <input onChange={e => handleChangeMCQ(index, e)} value={element.questionName || ""} type="text" name="questionName" placeholder="Enter Question Name" className="form-control" />
                                                                        {errors.name && <span className="">This field is required</span>}
                                                                    </div>
                                                                    )}</div>} */}
                                                                    {category === 'written' && <>
                                                                        <hr />
                                                                        {writtenExamQuestion.map((element, index) => <WrittenExam index={index} element={element} handleWrittenExam={handleWrittenExam} removeFormFieldsWrittenExam={removeFormFieldsWrittenExam}></WrittenExam>)}
                                                                        <div className="text-right">
                                                                            <button className="button add btn btn-dark btn-sm " type="button" onClick={() => addFormFieldsWrittenExam()}>Add Question</button>
                                                                        </div></>}
                                                                    {category === 'assignment' && <AssignmentQuestion></AssignmentQuestion>}
                                                                    {category === 'assignment' && <div className="form-group">
                                                                        <label for=""><b>Select Assignment Category</b></label>
                                                                        <select
                                                                            onChange={(event) => handleChangeAssignmentCategory(event.target.value)}
                                                                            // value={currentDepartment} 
                                                                            className="form-control">
                                                                            <option value="">Select Assignment Category</option>
                                                                            <option value="file">File Submission</option>
                                                                            <option value="link">Link Submission</option>
                                                                        </select>
                                                                    </div>}
                                                                    {category === 'viva' && <VivaQuestion register={register}></VivaQuestion>}



                                                                </div>
                                                            </div>

                                                            <div className="form-group">
                                                                <button type="submit" style={{ padding: '10px 40px', background: '#111430' }} className="btn text-white">Submit</button>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>

                    </div> : <Unauthorized />
            }
        </>
    );
};

export default CreateExam;