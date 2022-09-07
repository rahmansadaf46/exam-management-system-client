import React from 'react';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
// import { useHistory } from 'react-router-dom';

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

const UpdateQuestionDetails = ({ modalIsOpen, closeModal, question, updateDetails }) => {
    const { register, handleSubmit, errors } = useForm();
    // let history = useHistory();
    // const [allSession, setAllSession] = useState('');
    // const [session, setSession] = useState([]);
    // const [selectedSession, setSelectedSession] = useState(student.session);
    // const changeDepartment = (newDepartment) => {
    //     setCurrentDepartment(newDepartment)
    //     setSelectedSession("")
    //     console.log(newDepartment, selectedSession, student.department)
    //     setSession(allSession.filter(data => data?.department === newDepartment))

    //     // if (newDepartment !== student.department) {

    //     // }
    // }
 

    const onSubmit = data => {
        // data.session = selectedSession;
        console.log(data)
        let validation = true;
       
        if (question.category === 'mcq' || question.category === 'written') {
            if (parseInt(data.questionQuantity) > parseInt(data.totalQuestion)) {
                window.alert("Please Enter Right Question Quantity");
                validation = false;
            }
        }
        if(validation){
            window.alert("Question Updated Successfully");
            let updateData = Object.assign(question, data)
            console.log(updateData)
        }
        
        // question.
        // updateDetails(data)
        // if (data.session === "") {
        //     window.alert("Please Enter Session")
        // }
        // else {
        //     fetch(`http://localhost:5000/updateStudent/${student._id}`, {
        //         method: 'PATCH',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify(data)
        //     })
        //         .then(res => res.json())
        //         .then(data => {
        //             if (data) {
        //                 closeModal();
        //                 localStorage.removeItem("student");
        //                 window.location.reload();
        //                 alert("Updated Successfully");
        //             }
        //         })
        // }

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

            <h4 style={{ color: '#7BB35A' }} className="text-center text-brand">Update Details </h4>
            <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label for="">Exam Name:</label>
                    <input type="text" ref={register({ required: true })} defaultValue={question.examName} name="examName"  className="form-control" />
                    {errors.examName && <span className="text-danger">This field is required</span>}

                </div>
               <div className='row'>
               <div className="form-group col-6">
                    <label for="">Exam time and date:</label>
                    <input type="datetime-local" ref={register({ required: true })} name="time" defaultValue={question.time}  className="form-control" />
                    {errors.time && <span className="text-danger">This field is required</span>}
                </div>
                <div className="form-group col-6">
                    
                    <div className="">
                        <label for="">Duration:</label>
                        <input ref={register({ required: true })} className="form-control" name="duration" defaultValue={question.duration}  type="number" />
                        {errors.duration && <span className="text-danger">This field is required</span>}
                    </div>
                </div>
               </div>
              <div className='row'>
              {question.category === 'mcq'? <><div className="form-group col-6">
                    <label for="">Question will be show:</label>
                    <input type="number" ref={register({ required: true })} name="questionQuantity" defaultValue={question.questionQuantity}  className="form-control" />
                    {errors.questionQuantity && <span className="text-danger">This field is required</span>}
                </div><div className="form-group col-6">
                    <label for="">Total Question:</label>
                    <input type="number" readOnly ref={register({ required: true })} name="totalQuestion" defaultValue={question.totalQuestion}  className="form-control" />
                    {errors.totalQuestion && <span className="text-danger">This field is required</span>}
                </div></>:question.category === 'written'? <><div className="form-group col-6">
                    <label for="">Question will be show:</label>
                    <input type="number" ref={register({ required: true })} name="questionQuantity" defaultValue={question.questionQuantity}  className="form-control" />
                    {errors.questionQuantity && <span className="text-danger">This field is required</span>}
                </div><div className="form-group col-6">
                    <label for="">Total Question:</label>
                    <input type="number" readOnly ref={register({ required: true })} name="totalQuestion" defaultValue={question.totalQuestion}  className="form-control" />
                    {errors.totalQuestion && <span className="text-danger">This field is required</span>}
                </div></>:<></>}
              </div>
                <div className="form-group text-right">
                    <button type="submit" style={{ background: "#FB9937" }} className="btn  text-white px-5">Update</button>
                </div>
            </form>
        </Modal>
    );
};

export default UpdateQuestionDetails;



