import React from 'react';
import { Link } from 'react-router-dom';
import './AllStudentsData.css';

const AllStudentsData = ({ students, department, dept }) => {
    return (
        <div>

            {
                students.length === 0 || department !== dept ? <img className="rounded mx-auto d-block " style={{ width: '30%', height: '30%' }} src="https://cdn.lowgif.com/small/745b4d14b1057edd-ajax-loading-gif-11-gif-images-download.gif" alt="" />
                    : <table className="table table-borderless">
                        <thead style={{ background: '#FB9937', }}>
                            <tr>
                                <th className="text-black text-left" scope="col">Sr No.</th>
                                <th className="text-black" scope="col"></th>
                                <th className="text-black" scope="col">Name</th>
                                <th className="text-black" scope="col">Roll Number</th>
                                <th className="text-black" scope="col">Department</th>
                                <th className="text-black" scope="col">Session</th>
                                <th className="text-black" scope="col"></th>
                            </tr>
                        </thead>


                        <tbody >

                            {
                                students.map((student, index) =>

                                    <tr key={student._id} style={{ background: 'white' }}>
                                        <td >{index + 1}.</td>
                                        <td className="avatar-img"><img className="avatar" src={`data:image/png;base64,${student.image.img}`} alt="avatar" /> </td>
                                        <td className="text-uppercase"><span className="mt-5">{student.name}</span></td>
                                        <td>{student.roll}</td>
                                        <td>{student.department}</td>
                                        <td>{student.session}</td>
                                        <td className=""><Link to={`/admin/profile/${student._id}`} style={{ background: '#7AB259' }} className="btn text-white">See More</Link></td>
                                    </tr>
                                )
                            }

                        </tbody>

                    </table>
            }



        </div>

    );
};

export default AllStudentsData;