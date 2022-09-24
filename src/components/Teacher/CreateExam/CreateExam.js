import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import TeacherHeader from '../TeacherHeader/TeacherHeader';
import TeacherSidebar from '../TeacherSidebar/TeacherSidebar';
import FillInTheBlanks from './FillInTheBlanks';
import McqCategory from './McqCategory';
import WrittenExam from './WrittenExam';
const BASE_URL = process.env.REACT_APP_API_URL;

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
        rightAnswer: "",
        mark: ""
    }]);
    const [fillInTheGapsQuestion, setFillInTheGapsQuestion] = useState([{
        category: "fillInTheGaps",
        questionNumber: 1,
        questionName: "",
        rightAnswer: "",
        mark: ""
    }]);
    const [writtenExamQuestion, setWrittenExamQuestion] = useState([{
        category: "writtenExam",
        questionNumber: 1,
        questionName: "",
        mark: ""
    }]);
    const [assignmentData, setAssignmentData] = useState([{
        assignmentDetails: "",
        assignmentCategory: "",
        mark: "",
        fileCategory: ""
    }]);
    const [vivaData, setVivaData] = useState([{
        vivaDetails: "",
        attendanceLink: "",
        hostLink: "",
        mark: ""
    }]);
    const setQuestionEmpty = () => {
        setWrittenExamQuestion([{
            category: "writtenExam",
            questionNumber: 1,
            questionName: "",
            mark: ""
        }])
        setMcqQuestion([{
            category: "mcq",
            questionNumber: 1,
            questionName: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            rightAnswer: "",
            mark: ""
        }])
        setFillInTheGapsQuestion([{
            category: "fillInTheGaps",
            questionNumber: 1,
            questionName: "",
            rightAnswer: "",
            mark: ""
        }])
        setAssignmentData([{
            assignmentDetails: "",
            assignmentCategory: "",
            mark: "",
            fileCategory:""
        }])
        setVivaData([{
            vivaDetails: "",
            attendanceLink: "",
            hostLink: "",
            mark: ""
        }])
    }
    const [loading] = useState(false);

    const { register, handleSubmit, errors } = useForm();
    // const [question, setQuestion] = useState({})
    const [students, setStudents] = useState({})
    // useEffect(() => {
    //     fetch(`http://localhost:5000/question/${id}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             window.scrollTo(0, 0);
    //             console.log(data)
    //             setQuestion(data);
    //             setCategory(data.category)
    //            if(data.category === 'mcq'){
    //             setQuestionQuantity(parseInt(data.totalQuestion))
    //             setQuantityView(true)
    //             setMcqCategory(data.mcqCategory)
    //             if(data.mcqCategory === 'mcqFillInTheBlanks'){
    //                const filterMCQ = data.question.filter(el=>el.category==='mcq')
    //                setMcqQuestion(filterMCQ);
    //                const filterFillInTheBlanks = data.question.filter(el=>el.category!=='mcq')
    //                setFillInTheGapsQuestion(filterFillInTheBlanks);
    //             }
    //             else if(data.mcqCategory === "onlyMcq"){
    //                 setMcqQuestion(data?.question);
    //             }
    //             else{
    //                 setFillInTheGapsQuestion(data?.question);
    //             }
    //            } else if(data.category === "written"){
    //             setQuestionQuantity(data.totalQuestion)
    //             setQuantityView(true)
    //             setWrittenExamQuestion(data?.question);
    //            }
    //            else if(data.category === "assignment"){
    //             setAssignmentData(data?.question)
    //             // console.log(data?.question)
    //             setAssignmentCategory(data?.question[0].assignmentCategory)
    //            }
    //            else{
    //             setVivaData(data?.question)
    //            }
    //         })
    // }, [id])
    document.title = "Create Exam";
    
    useEffect(()=>{
        const semester = JSON.parse(localStorage.getItem("selectedSemester"));
        console.log(semester)

        fetch(BASE_URL +`/studentsForExam/${semester.department}/${semester.session}`)
            .then(response => response.json())
            .then(data => {
                
                // setStudents(data)
                // const studentData = data;
                let updateData = [];
                data.forEach(student=>{
                    updateData.push({id:student.id})
                })
                console.log(updateData)
                setStudents(updateData)
                // console.log(updateData)
                // if (roll.length === 0) {
                //     setRollNF(true);
                // }
                // if (roll.length > 0) {
                //     setRollNF(false);
                // }
                // setStudents(roll);
            })
            .catch(error => {
                console.error(error)
            })
    },[])
    const onSubmit = data => {
        let validation = true;
        let categoryValue = category;
        console.log(categoryValue);
        if (categoryValue === '') {
            validation = false;
            window.alert("Please enter Category");
        }

        else if (categoryValue === 'mcq') {
            if (mcqCategory === "") {
                validation = false;
                window.alert("Please enter MCQ Category");
            }
            else if (mcqCategory === 'mcqFillInTheBlanks') {

                const question = mcqQuestion.concat(fillInTheGapsQuestion)
                const found = question.map(data => Object.values(data));
                const questionValues = Array.prototype.concat.apply([], found)
                const valueChecking = questionValues.some(el => el === '');
                if (valueChecking) {
                    window.alert('Please insert all question answer');
                    validation = false;
                }
                else {

                    data.question = question;
                    data.mcqCategory = mcqCategory;
                }
            }
            else if (mcqCategory === 'onlyMcq') {

                const question = mcqQuestion.map(data => Object.values(data));
                const questionValues = Array.prototype.concat.apply([], question)
                const valueChecking = questionValues.some(el => el === '');
                if (valueChecking) {
                    window.alert('Please insert all question answer');
                    validation = false;
                }
                else {

                    data.question = mcqQuestion;
                    data.mcqCategory = mcqCategory;
                }
                // console.log(data.totalQuestion, data.questionQuantity)
            }
            else if (mcqCategory === 'onlyFillInTheBlanks') {

                // const question = mcqQuestion.concat(fillInTheGapsQuestion)
                const question = fillInTheGapsQuestion.map(data => Object.values(data));
                const questionValues = Array.prototype.concat.apply([], question)
                const valueChecking = questionValues.some(el => el === '');
                if (valueChecking) {
                    window.alert('Please insert all question answer');
                    validation = false;
                }
                else {

                    // console.log(fillInTheGapsQuestion, questionValues, valueChecking)
                    data.question = fillInTheGapsQuestion;
                    data.mcqCategory = mcqCategory;
                }
                // console.log(data.totalQuestion, data.questionQuantity)
            }
        }
        else if (categoryValue === 'written') {
            const question = writtenExamQuestion.map(data => Object.values(data));
            const questionValues = Array.prototype.concat.apply([], question)
            const valueChecking = questionValues.some(el => el === '');
            if (valueChecking) {
                window.alert('Please insert all question');
                validation = false;
            }
            else {
                data.mcqCategory = null;
                data.question = writtenExamQuestion;
            }
        }
        else if (categoryValue === 'assignment') {
            console.log(assignmentData)
            if(assignmentData[0].assignmentCategory === "Link Submission"){
                let filterData = [];
                assignmentData.forEach(data => {
                  filterData.push({
                    assignmentCategory: data.assignmentCategory,
                    assignmentDetails: data.assignmentDetails,
                    mark: data.mark
                  })
                });
                const question = filterData.map(data => Object.values(data));
                const questionValues = Array.prototype.concat.apply([], question)
                const valueChecking = questionValues.some(el => el === '');
                console.log(valueChecking)
                if (valueChecking) {
                    window.alert('Please insert all data');
                    validation = false;
                }
                else {
                    data.mcqCategory = null;
                    data.question = assignmentData;
                }
            }
            else{
                const question = assignmentData.map(data => Object.values(data));
                const questionValues = Array.prototype.concat.apply([], question)
                const valueChecking = questionValues.some(el => el === '');
                console.log(valueChecking)
                if (valueChecking) {
                    window.alert('Please insert all data');
                    validation = false;
                }
                else {
                    data.mcqCategory = null;
                    data.question = assignmentData;
                }
            }
           
        }
        else if (categoryValue === 'viva') {
            const question = vivaData.map(data => Object.values(data));
            const questionValues = Array.prototype.concat.apply([], question)
            const valueChecking = questionValues.some(el => el === '');
            console.log(vivaData)
            console.log(valueChecking)
            if (valueChecking) {
                window.alert('Please insert all data');
                validation = false;
            }
            else {
                data.mcqCategory = null;
                data.question = vivaData;
            }
        }
        data.teacherName = teacherData[0].name;
        // data.email = teacherData[0].email;
        data.category = categoryValue;

        console.log(validation)
        if (validation) {
            console.log(data);
            // students.map(student => student.fullMark = data.question.map((data, index) => parseInt(data.mark)).reduce((partialSum, a) => partialSum + a, 0))
            
            data.students = students
            console.log(students)
            fetch(BASE_URL +'/addQuestion', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(success => {
                    // console.log(success)
                    if (success) {
                        // setLoading(false);
                        alert("Exam Created Successfully");
                        window.location.reload();
                    }
                })
           

        }

        // if (data) {
        //     setLoading(true);
        // }
        // // https://demo-0523.herokuapp.com/admin/addAdmin

    }
    useEffect(() => {
        setIsTeacher(JSON.parse(localStorage.getItem("teacherAccess")) || {});
        setSemester(JSON.parse(localStorage.getItem("selectedSemester")) || {});
        setTeacherData(JSON.parse(localStorage.getItem("teacherData")) || []);

    }, [])
    let handleChangeAssignment = (e) => {
        // console.log(i)
        let newFormValues = [...assignmentData];
        newFormValues[0][e.target.name] = e.target.value;
        setAssignmentCategory(newFormValues[0].assignmentCategory)
        // newFormValues[0].assignmentCategory = newFormValues[i].rightAnswer.toLowerCase();
        setAssignmentData(newFormValues);
    }
    let handleChangeViva = (e) => {
        // console.log(i)
        let newFormValues = [...vivaData];
        newFormValues[0][e.target.name] = e.target.value;
        // newFormValues[i].rightAnswer = newFormValues[i].rightAnswer.toLowerCase();
        setVivaData(newFormValues);
    }
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
        setQuestionEmpty();
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
        setQuestionEmpty();
    }

    // let handleChangeAssignmentCategory = (e) => {
    //     // console.log(e)
    //     setAssignmentCategory(e);
    // }


    let handleChangeMCQ = (i, e) => {
        // console.log(e.target.name)
        let newFormValues = [...mcqQuestion];
        newFormValues[i][e.target.name] = e.target.value;

        setMcqQuestion(newFormValues);
    }

    let handleChangeFillInTheGaps = (i, e) => {
        // console.log(i)
        let newFormValues = [...fillInTheGapsQuestion];
        newFormValues[i][e.target.name] = e.target.value;
        // newFormValues[i].rightAnswer = newFormValues[i].rightAnswer.toLowerCase();
        setFillInTheGapsQuestion(newFormValues);
    }
    let addFormFieldsFillInTheBlanks = () => {
        setFillInTheGapsQuestion([...fillInTheGapsQuestion, {
            category: 'fillInTheGaps',
            questionNumber: fillInTheGapsQuestion.length + 1,
            questionName: "",
            rightAnswer: "",
            mark: ""
        }])
        setQuestionQuantity(questionQuantity + 1)
    }
    let removeFormFieldsFillInTheBlanks = (i) => {
        let newFormValues = [...fillInTheGapsQuestion];
        newFormValues.splice(i, 1);
        setFillInTheGapsQuestion(newFormValues)
        setQuestionQuantity(questionQuantity - 1)
    }



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
            mark: ""
        }])
        setQuestionQuantity(questionQuantity + 1)
    }
    let removeFormFieldsWrittenExam = (i) => {
        let newFormValues = [...writtenExamQuestion];
        newFormValues.splice(i, 1);
        setWrittenExamQuestion(newFormValues);
        setQuestionQuantity(questionQuantity - 1)
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
            rightAnswer: "",
            mark: ""
        }])
        setQuestionQuantity(questionQuantity + 1)
    }
    let removeFormFields = (i) => {
        let newFormValues = [...mcqQuestion];
        newFormValues.splice(i, 1);
        setMcqQuestion(newFormValues)
        setQuestionQuantity(questionQuantity - 1)
    }


    console.log(assignmentData, mcqQuestion,);
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
                                                                <label htmlFor=""><b>Exam Name</b></label>
                                                                <textarea type="text" ref={register({ required: true })}  name="examName" placeholder="Enter Exam Name" className="form-control" />
                                                                {errors.examName && <span className="text-danger">This field is required</span>}

                                                            </div>
                                                            <div>
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor=""><b>Department</b></label>
                                                                            <input type="text" value={semester.department} readOnly ref={register({ required: true })} name="department" placeholder="" className="form-control" />
                                                                            {errors.name && <span className="text-danger">This field is required</span>}

                                                                        </div>
                                                                    </div>
                                                                    <div className="col-6">
                                                                        <div className="form-group">
                                                                            <label htmlFor=""><b>Session</b></label>
                                                                            <input type="text" readOnly value={semester.session} ref={register({ required: true })} name="session" placeholder="" className="form-control" />
                                                                            {errors.name && <span className="text-danger">This field is required</span>}

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className=" row justify-content-center">
                                                                    <div className="form-group col-6">
                                                                        <label htmlFor=""><b>Semester</b></label>
                                                                        <input type="text" readOnly value={semester.semester} ref={register({ required: true })} name="semester" placeholder="" className="form-control" />
                                                                        {errors.name && <span className="text-danger">This field is required</span>}

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row justify-content-center">
                                                                <div className="form-group">
                                                                    <label htmlFor=""><b>Enter Start Time</b></label>
                                                                    <input style={{ width: '95%' }}  type="datetime-local" min={new Date().toISOString().slice(0, -8)} ref={register({ required: true })} name="time" className="form-control" />
                                                                    {errors.time && <span className="text-danger">This field is required</span>}

                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor=""><b>Enter Duration(In Minutes)</b></label>
                                                                    <input type="number" ref={register({ required: true })}  name="duration" placeholder="Enter Duration" className="form-control" />
                                                                    {errors.duration && <span className="text-danger">This field is required</span>}

                                                                </div>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor=""><b>Select Category</b></label>
                                                                <select
                                                                    onChange={(event) => handleChange(event.target.value)}
                                                                    value={category} 
                                                                    className="form-control form-select">
                                                                    <option value="">Select Category</option>
                                                                    <option value="mcq">MCQ/Fill in the Blanks</option>
                                                                    <option value="written">Written Exam</option>
                                                                    <option value="assignment">Assignment</option>
                                                                    <option value="viva">Online Viva</option>
                                                                </select>

                                                            </div>
                                                            {category === 'mcq' && <div className="form-group">
                                                                <label htmlFor=""><b>Select MCQ Category</b></label>
                                                                <select
                                                                    onChange={(event) => handleChangeMCQCategory(event.target.value)}
                                                                    value={mcqCategory} 
                                                                    className="form-control form-select">
                                                                    <option value="">Select MCQ Category</option>
                                                                    <option value="mcqFillInTheBlanks">MCQ and Fill in the Blanks</option>
                                                                    <option value="onlyMcq">Only MCQ</option>
                                                                    <option value="onlyFillInTheBlanks">Only Fill in the Blanks</option>

                                                                </select>

                                                            </div>}
                                                            {quantityView && <>   <div className="d-flex justify-content-center">

                                                                <div className="col-6 mt-2">
                                                                    <div className="form-group">
                                                                        <label htmlFor=""><b>Total Question</b></label>
                                                                        <input value={questionQuantity} type="text" ref={register({ required: true })} readOnly name="totalQuestion" placeholder="Total Question" className="form-control" />
                                                                        {errors.totalQuestion && <span className="text-danger">This field is required</span>}

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
                                                                    {category === 'assignment' && <><div className="form-group">
                                                                        <label htmlFor=""><b>Enter Assignment Details</b></label>
                                                                        <textarea type="text" value={assignmentData[0].assignmentDetails || ""} onChange={e => handleChangeAssignment(e)} name="assignmentDetails" placeholder="Enter Assignment Details" className="form-control" />
                                                                        {errors.name && <span className="text-danger">This field is required</span>}

                                                                    </div><div className="form-group">
                                                                            <label htmlFor="assignmentCategory"><b>Select Assignment Category</b></label>
                                                                            <select
                                                                                onChange={(event) => handleChangeAssignment(event)}
                                                                                value={assignmentData[0].assignmentCategory || ""}
                                                                                name="assignmentCategory"
                                                                                className="form-control form-select">
                                                                                <option value="">Select Assignment Category</option>
                                                                                <option value="File Submission">File Submission</option>
                                                                                <option value="Link Submission">Link Submission</option>
                                                                            </select>
                                                                        </div>
                                                                        {assignmentCategory === 'File Submission' && <><div className="form-group mx-5 px-5">
                                                                            <label htmlFor="assignmentCategory"><b>Select File Category</b></label>
                                                                            <select
                                                                                onChange={(event) => handleChangeAssignment(event)}
                                                                                value={assignmentData[0].fileCategory || ""}
                                                                                name="fileCategory"
                                                                                className="form-control form-select">
                                                                                <option value="">Select File Category</option>
                                                                                <option value="pdf">PDF</option>
                                                                                <option value="docx">Docx</option>
                                                                            </select>
                                                                        </div></>}
                                                                        <div className="form-group row mb-1 d-flex justify-content-center">

                                                                            <div className="form-group col-10  ">
                                                                                <label htmlFor=""><b>Enter Mark</b></label>
                                                                                <div>  <input type="text" onChange={e => handleChangeAssignment( e)} value={assignmentData[0].mark || ""} name="mark" placeholder="Enter Mark" className="form-control" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </>}
                                                                    {category === 'viva' && <div>
                                                                        <div style={{ fontSize: "20px" }} className="form-group text-center ">
                                                                            <a className="text-success" target="blank" href="https://online-exam-hall.vercel.app/create">Generate a link</a>
                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor=""><b>Enter Attendance Link</b></label>
                                                                            <input type="text" value={vivaData[0].attendanceLink || ""} onChange={e => handleChangeViva(e)} name="attendanceLink" placeholder="Attendance Link" className="form-control" />
                                                                            {errors.name && <span className="text-danger">This field is required</span>}

                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor=""><b>Enter Host Link</b></label>
                                                                            <input type="text" value={vivaData[0].hostLink || ""} onChange={e => handleChangeViva(e)} name="hostLink" placeholder="Viva Link" className="form-control" />
                                                                            {errors.name && <span className="text-danger">This field is required</span>}

                                                                        </div>
                                                                        <div className="form-group">
                                                                            <label htmlFor=""><b>Enter Viva Details</b></label>
                                                                            <textarea type="text" value={vivaData[0].vivaDetails || ""} onChange={e => handleChangeViva(e)} name="vivaDetails" placeholder="Enter Viva Details" className="form-control" />
                                                                            {errors.name && <span className="text-danger">This field is required</span>}

                                                                        </div>
                                                                        <div className="form-group row mb-1 d-flex justify-content-center">

                                                                            <div className="form-group col-10  ">
                                                                                <label htmlFor=""><b>Enter Mark</b></label>
                                                                                <div>  <input type="text" onChange={e => handleChangeViva(e)} value={vivaData[0].mark || ""} name="mark" placeholder="Enter Mark" className="form-control" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>}



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