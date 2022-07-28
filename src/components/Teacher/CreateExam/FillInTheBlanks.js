import React from 'react';

const FillInTheBlanks = ({ index, element, handleChangeFillInTheGaps, removeFormFieldsFillInTheBlanks }) => {
    return (
        <div>
            <div>
                <section className="mcq" key={index}>
                    <h5 className="text-primary"><span className="text-success">Fill In The Blanks</span> Question Number {index + 1}</h5>

                    <div className="form-group  ">
                        <div className="row mb-2">
                            <div className="col-10">
                                <label for=""><b>Enter Fill In The Blanks Question Name</b></label>
                            </div>
                            <div className="col-2 text-right">

                                {
                                    index ?
                                        <button type="button" className="button remove btn btn-sm btn-danger" onClick={() => removeFormFieldsFillInTheBlanks(index)}>X</button>
                                        : null
                                }

                            </div>
                        </div>

                        <textarea type="text" name="questionName" placeholder="Enter Question Name" className="form-control" value={element.questionName || ""} onChange={e => handleChangeFillInTheGaps(index, e)} />
                    </div>

                    <div className="form-group row mb-1 d-flex justify-content-center">

                        <div className="form-group col-10  ">
                            <label for=""><b>Enter Right Answer</b></label>
                            <div>  <input type="text" onChange={e => handleChangeFillInTheGaps(index, e)} value={element.rightAnswer || ""} name="rightAnswer" placeholder="Enter Answer" className="form-control" />
                            </div>
                        </div>
                    </div>
                    <div className="form-group row mb-1 d-flex justify-content-center">

                    <div className="form-group col-6  ">
                        <label for=""><b>Enter Mark</b></label>
                        <div>  <input type="text" onChange={e => handleChangeFillInTheGaps(index, e)} value={element.mark || ""} name="mark" placeholder="Enter Mark" className="form-control" />
                        </div>
                    </div>
                </div>
                    <hr />
                </section>
            </div>
        </div>
    );
};

export default FillInTheBlanks;