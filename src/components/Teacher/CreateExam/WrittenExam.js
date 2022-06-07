import React from 'react';

const WrittenExam = ({ index, element, handleWrittenExam, removeFormFieldsWrittenExam }) => {
    return (
        <div>
            <div>
                <section className="mcq" key={index}>
                    <h5 className="text-success"><span className="text-primary">Written Exam</span> Question Number {index + 1}</h5>

                    <div className="form-group  ">
                        <div className="row mb-2">
                            <div className="col-10">
                                <label for=""><b>Enter Question Name</b></label>
                            </div>
                            <div className="col-2 text-right">

                                {
                                    index ?
                                        <button type="button" className="button remove btn btn-sm btn-danger" onClick={() => removeFormFieldsWrittenExam(index)}>X</button>
                                        : null
                                }

                            </div>
                        </div>

                        <textarea type="text" name="questionName" placeholder="Enter Question Name" className="form-control" value={element.questionName || ""} onChange={e => handleWrittenExam(index, e)} />
                    </div>
                    <hr />
                </section>
            </div>
        </div>
    );
};

export default WrittenExam;