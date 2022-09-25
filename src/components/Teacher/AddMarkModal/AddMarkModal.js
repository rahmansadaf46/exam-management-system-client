import React from 'react';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
const BASE_URL = process.env.REACT_APP_API_URL;
const customStyles = {
    content: {
        top: '51%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

const AddMarkModal = ({ modalIsOpen, closeModal, result,  answer, setResult }) => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        let quesId = Object.keys(data)[0];
        let mark = Object.values(data)[0];
        if (mark > answer.mark) {
            window.alert(`Mark is bigger than ${answer.mark}`)
        }
        else {
            if(result.category === 'assignment'){
                console.log(data)
                if(result.answerData.answer[0].assignmentCategory === 'Link Submission'){
                    result.obtainedMark = parseInt(mark);
                    result.status = "Checked";
                    result.answerData.answer[0].obtainedMark = parseInt(mark);
                    result.answerData.answer[0].status = "Checked";
                    // closeModal();
                    let dataBody = {id:result.id, student: {id: result.studentId}, answer: result.answerData.answer, question: {id: result.questionId} }
                    console.log(dataBody)
                    fetch(BASE_URL+'/submitResult', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(dataBody)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data) {
                                setResult(result);
                                closeModal();
                            }
                        })
                }
                else{
                    result.obtainedMark = parseInt(mark);
                    result.status = "Checked";
                    result.answerData.answer[0].obtainedMark = parseInt(mark);
                    result.answerData.answer[0].status = "Checked";
                    // closeModal();
                    let dataBody = { student: result.studentId,question: result.questionId, answer: result.answerData.answer[0].id,obtainedMark: parseInt(mark),status: "Checked" }
                    console.log(dataBody)
                    const formData = new FormData()
                    formData.append('file', null)
                    formData.append('resultId', result.id)
                    formData.append('student', result.studentId)
                    formData.append('question', result.questionId)
                    formData.append('answer', result.answerData.answer[0].id)
                    formData.append('obtainedMark', parseInt(mark))
                    formData.append('status', "Checked")
                    console.log(formData);
                    fetch(BASE_URL + '/updateSubmittedFile', {
                        method: 'POST',
                        body: formData
                    })
                        .then(response => response.json())
                        .then(data => {
                            if (data) {
                                setResult(result);
                                closeModal();
                            }
                        })
        
                        .catch(error => {
                            console.error(error)
                        })
                
                }
               
            }
            else{
                let answerData = result.answerData.answer;
                let filterAnotherAnswer = answerData.filter(ans => ans.questionNumber !== parseInt(quesId))
                let filterAnswer = answerData.filter(ans => ans.questionNumber === parseInt(quesId))
    
                filterAnswer[0].obtainedMark = parseInt(mark);
                filterAnswer[0].status = 'Checked';
                let allAnswer = [...filterAnswer, ...filterAnotherAnswer];
                let allCheck = allAnswer.filter(ans => ans.status === 'Not Checked')
                if (allCheck.length === 0) {
                    result.status = "Checked";
                }
                let totalObtainMark = allAnswer.map(ans => ans.obtainedMark).filter(data => data !== undefined).reduce((a, b) => a + b, 0);
                result.answerData.answer = allAnswer;
                result.obtainedMark = parseInt(totalObtainMark);
                // console.log(allAnswer.map(ans => ans.obtainedMark).filter(data => data !== undefined))
                let dataBody = {id:result.id, student: {id: result.studentId}, answer: result.answerData.answer, question: {id: result.questionId} }
                console.log(dataBody)
                setResult(result);
                closeModal();
                fetch(BASE_URL+'/submitResult', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dataBody)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data) {
                            setResult(result);
                            closeModal();;
                        }
                    })
            }
          
           
            
        }

    }
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <div className="d-flex justify-content-end">
                <button type="button" onClick={() => closeModal()} className="close" aria-label="Close">
                    <span style={{ color: 'gray' }} aria-hidden="true">&times;</span>
                </button>


            </div>

            <h4 style={{ color: '#7BB35A' }} className="text-center text-brand">Add Mark </h4>
            <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
                {result.category === 'assignment' ? <></> : <>  <div className="form-group text-center">
                    <span className='text-warning'>Question No: </span> <span className='text-success'>{answer.index}</span>
                </div>
                <div className="form-group text-center">
                    <span className='text-warning'>Question Name: </span> <span className='text-success'>{answer.questionName}</span>
                </div></>}
              
                <div className="form-group">
                    <label for="">Enter Mark:</label>
                    <input type="text" ref={register({ required: true })} defaultValue={answer.obtainedMark} name={answer.questionNumber} className="form-control" />
                    {errors.examName && <span className="text-danger">This field is required</span>}

                </div>
                <div className="form-group text-center">
                    <span className='text-primary'>Total Mark: </span> <span className='text-danger'>{answer.mark}</span>
                </div>
                <div className="form-group text-center">
                    <button type="submit" style={{ background: "#FB9937" }} className="btn  text-white px-5">Update Mark</button>
                </div>
            </form>
        </Modal>
    );
};

export default AddMarkModal;



