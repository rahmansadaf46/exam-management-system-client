import React from 'react';

const McqCategory = ({ index, element, handleChangeMCQ, removeFormFields }) => {
    return (
        <div>
            <section className="mcq" key={index}>
                <h5 className="text-primary"><span className="text-warning">MCQ</span> Question Number {index + 1}</h5>
                <div className="form-group  ">
                    <div className="row mb-2">
                        <div className="col-8">
                            <label for=""><b>Enter MCQ Question Name</b></label>
                        </div>
                        <div className="col-4 text-right">

                            {
                                index ?
                                    <button type="button" className="button remove btn btn-sm btn-danger" onClick={() => removeFormFields(index)}>X</button>
                                    : null
                            }

                        </div>
                    </div>

                    <textarea type="text" name="questionName" placeholder="Enter Question Name" className="form-control" value={element.questionName || ""} onChange={e => handleChangeMCQ(index, e)} />
                </div>

                <div className="form-group row mb-1 d-flex justify-content-center">
                    <div className="form-group col-6  ">
                        <label for=""><b>Enter Answer 1</b></label>
                        <input type="text" onChange={e => handleChangeMCQ(index, e)} value={element.answer1 || ""}
                            placeholder="Enter Answer" name="answer1" className="form-control" />
                    </div>
                    <div className="form-group col-6  ">
                        <label for=""><b>Enter Answer 2</b></label>
                        <div> <input type="text" onChange={e => handleChangeMCQ(index, e)} value={element.answer2 || ""} name="answer2" placeholder="Enter Answer" className="form-control" />
                        </div>
                    </div>
                </div>

                <div className="form-group row mb-1 d-flex justify-content-center">
                    <div className="form-group col-6  ">
                        <label for=""><b>Enter Answer 3</b></label>
                        <input type="text" onChange={e => handleChangeMCQ(index, e)} value={element.answer3 || ""} name="answer3" placeholder="Enter Answer" className="form-control" />
                    </div>
                    <div className="form-group col-6  ">
                        <label for=""><b>Enter Answer 4</b></label>
                        <div>  <input type="text" onChange={e => handleChangeMCQ(index, e)} value={element.answer4 || ""} name="answer4" placeholder="Enter Answer" className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="form-group row mb-1 d-flex justify-content-center">

                    <div className="form-group col-10  ">
                        <label for=""><b>Enter Right Answer</b></label>
                        <div> <select
                            onChange={(event) => handleChangeMCQ(index, event)}
                            value={element.rightAnswer}
                            name="rightAnswer"
                            className="form-control form-select">
                            <option value="">Select Right Answer</option>
                            <option value="answer1">Answer 1</option>
                            <option value="answer2">Answer 2</option>
                            <option value="answer3">Answer 3</option>
                            <option value="answer4">Answer 4</option>
                        </select></div>
                    </div>
                </div>
                <div className="form-group row mb-1 d-flex justify-content-center">

                    <div className="form-group col-6  ">
                        <label for=""><b>Enter Mark</b></label>
                        <div>  <input type="text" onChange={e => handleChangeMCQ(index, e)} value={element.mark || ""} name="mark" placeholder="Enter Mark" className="form-control" />
                        </div>
                    </div>
                </div>
                <hr />
            </section>
        </div>
    );
};

export default McqCategory;