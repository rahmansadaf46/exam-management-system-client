import React from 'react';
import { Link } from 'react-router-dom';
import './DepartmentCard.css'

const DepartmentCard = (props) => {
    const { department } = props;
    return (
        <Link to={`/admin/allstudent/${department.department}`} className="col-md-4 department-card">
            <img className="display-center" src={`data:image/png;base64,${department.image.img}`} alt="" />
            <h4 className="text-center my-2">{department.department}</h4>
        </Link>
    );
};

export default DepartmentCard;