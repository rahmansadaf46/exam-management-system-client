import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
import Unauthorized from '../../NotAccess/Unauthorized/Unauthorized';
import TeacherHeader from '../TeacherHeader/TeacherHeader';
import TeacherSidebar from '../TeacherSidebar/TeacherSidebar';


const Practice = () => {
    // const [semester, setSemester] = useState({});
    // const [category, setCategory] = useState('')
    const [isTeacher, setIsTeacher] = useState(false);
    // const [mcqQuestion, setMcqQuestion] = useState([{
    //     questionNumber: "",
    //     questionName: "",
    //     answer1: "",
    //     answer2: "",
    //     answer3: "",
    //     answer4: "",
    //     rightAnswer: ""
    // }]);

    const [loading] = useState(false);

    // const { register, errors } = useForm();
    document.title = "Create Exam";
    // const onSubmit = data => {
    //     console.log(data);
    //     // if (data) {
    //     //     setLoading(true);
    //     // }
    //     // // https://demo-0523.herokuapp.com/admin/addAdmin
    //     // fetch('http://localhost:5000/addAdmin', {
    //     //     method: 'POST',
    //     //     headers: { 'Content-Type': 'application/json' },
    //     //     body: JSON.stringify(data)
    //     // })
    //     //     .then(res => res.json())
    //     //     .then(success => {
    //     //         if (success) {
    //     //             setLoading(false);
    //     //             alert("Admin Added");
    //     //             window.location.reload();
    //     //         }
    //     //     })

    // }
    useEffect(() => {
        setIsTeacher(JSON.parse(localStorage.getItem("teacherAccess")) || {});
        // setSemester(JSON.parse(localStorage.getItem("selectedSemester")) || {});
    }, [])


    // const handleChange = (e) => {
    //     console.log(e)
    //     setCategory(e)
    //     // console.log(e.target.name,e.target.value)
    //     // const data = [...rightAnswer]
    //     // if (data[e.target.name].value === 'false') {
    //     //     data[e.target.name].value = 'true';
    //     // }
    //     // else {
    //     //     data[e.target.name].value = 'false';
    //     // }

    //     // setRightAnswer(data)

    // }

    // let handleChangeMCQ = (i, e) => {

    //     let newFormValues = [...mcqQuestion];
    //     newFormValues[i][e.target.name] = e.target.value;
    //     setMcqQuestion(newFormValues);
    // }




    // function MCQ(element, index) {
    //     return <section className="mcq">
    //         <div className="form-group  ">
    //             <label for=""><b>Enter MCQ Question Name</b></label>
    //             <input onChange={e => handleChangeMCQ(index, e)} value={element.questionName || ""} type="text" name="questionName" placeholder="Enter Question Name" className="form-control" />
    //             {errors.name && <span className="">This field is required</span>}
    //         </div>

    //         <div className="form-group row mb-1 d-flex justify-content-center">
    //             <div className="form-group col-6  ">
    //                 <label for=""><b>Enter Answer 1</b></label>
    //                 <input type="text" onChange={e => handleChangeMCQ(index, e)} value={element.answer1 || ""}
    //                     placeholder="Enter Answer" name="answer1" className="form-control" />
    //                 {errors.name && <span className="">This field is required</span>}
    //             </div>
    //             <div className="form-group col-6  ">
    //                 <label for=""><b>Enter Answer 2</b></label>
    //                 <div> <input type="text" onChange={e => handleChangeMCQ(index, e)} value={element.answer2 || ""} name="answer2" placeholder="Enter Answer" className="form-control" />
    //                     {errors.name && <span className="">This field is required</span>}</div>
    //             </div>
    //         </div>

    //         <div className="form-group row mb-1 d-flex justify-content-center">
    //             <div className="form-group col-6  ">
    //                 <label for=""><b>Enter Answer 3</b></label>
    //                 <input type="text" onChange={e => handleChangeMCQ(index, e)} value={element.answer3 || ""} name="answer3" placeholder="Enter Answer" className="form-control" />
    //                 {errors.name && <span className="">This field is required</span>}
    //             </div>
    //             <div className="form-group col-6  ">
    //                 <label for=""><b>Enter Answer 4</b></label>
    //                 <div>  <input type="text" onChange={e => handleChangeMCQ(index, e)} value={element.answer4 || ""} name="answer4" placeholder="Enter Answer" className="form-control" />
    //                     {errors.name && <span className="">This field is required</span>}</div>
    //             </div>
    //         </div>
    //         <div className="form-group row mb-1 d-flex justify-content-center">

    //             <div className="form-group col-10  ">
    //                 <label for=""><b>Enter Answer Right Answer</b></label>
    //                 <div>  <input type="text" onChange={e => handleChangeMCQ(index, e)} value={element.rightAnswer || ""} name="rightAnswer" placeholder="Enter Answer" className="form-control" />
    //                     {errors.name && <span className="">This field is required</span>}</div>
    //             </div>
    //         </div>
    //     </section>;
    // }


    // function FillInTheBlank() {
    //     return <section className="fill-in-the-blank">
    //         <div className="form-group  ">
    //             <label for=""><b>Enter Fill in the Blank Question Name</b></label>
    //             <input type="text" ref={register({ required: true })} name="question" placeholder="Enter Fill in the Blank Question Name" className="form-control" />
    //             {errors.name && <span className="">This field is required</span>}
    //         </div>

    //         <div className="form-group  ">
    //             <label for=""><b>Enter Blank Word</b></label>
    //             <input type="text" ref={register({ required: true })} name="question" placeholder="Enter Blank Word" className="form-control" />
    //             {errors.name && <span className="">This field is required</span>}
    //         </div>
    //     </section>;
    // }

    // function McqCategory() {
    //     return <div>
    //         {mcqQuestion.map((element, index) => <MCQ element={element} index={index}></MCQ>)}

    //         <FillInTheBlank></FillInTheBlank>
    //     </div>
    // }



    // function WrittenQuestion() {
    //     return <div className="form-group">
    //         <label for=""><b>Enter Question Name</b></label>
    //         <input type="text" ref={register({ required: true })} name="question" placeholder="Enter Question Name" className="form-control" />
    //         {errors.name && <span className="text-danger">This field is required</span>}

    //     </div>
    // }

    // function AssignmentQuestion() {
    //     return <div className="form-group">
    //         <label for=""><b>Enter Assignment Name</b></label>
    //         <input type="text" ref={register({ required: true })} name="assignment" placeholder="Enter Assignment Name" className="form-control" />
    //         {errors.name && <span className="text-danger">This field is required</span>}

    //     </div>
    // }

    // const handleMCQ = (e) => {
    //     const mcqQuestionList = {};
    //     for (let x = 0; x < e.target.value; x++) {
    //         mcqQuestionList[x] = {
    //             questionNumber: x + 1,
    //             questionName: "",
    //             answer1: "",
    //             answer2: "",
    //             answer3: "",
    //             answer4: "",
    //             rightAnswer: ""
    //         };
    //     }
    //     setMcqQuestion([mcqQuestionList])
    //     console.log(mcqQuestionList);
    // }

    // const handleFillInTheBlank = (e) => {
    //     console.log(e.target.value);
    // }

    const [formValues, setFormValues] = useState([{ name: "", email: "" }])

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
        console.log(i)
    }

    let addFormFields = () => {
        setFormValues([...formValues, { name: "", email: "" }])
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(formValues));
    }
    console.log(formValues)
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
                                                <form onSubmit={handleSubmit}>
                                                    {formValues.map((element, index) => (
                                                        <div className="form-inline" key={index}>
                                                            <label>Name</label>
                                                            <input type="text" name="name" value={element.name || ""} onChange={e => handleChange(index, e)} />
                                                            <label>Email</label>
                                                            <input type="text" name="email" value={element.email || ""} onChange={e => handleChange(index, e)} />
                                                            {
                                                                index ?
                                                                    <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                                                                    : null
                                                            }
                                                        </div>
                                                    ))}
                                                    <div className="button-section">
                                                        <button className="button add" type="button" onClick={() => addFormFields()}>Add</button>
                                                        <button className="button submit" type="submit">Submit</button>
                                                    </div>
                                                </form>
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

export default Practice;