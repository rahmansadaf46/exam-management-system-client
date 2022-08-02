import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import logo from '../../../images/ICON/ist.png';

const StudentHeader = () => {
    const [loggedInUser] = useContext(UserContext);
    // const [adminName, setAdminName] = useState([]);
    // useEffect(() => {
    //     fetch('http://localhost:5000/adminName', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ email: loggedInUser.email })
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             setAdminName(data[0]);
    //         })
    // }, [loggedInUser.email])
    return (
        <div style={{ position: 'sticky', top: '0', background: 'white', zIndex: '1' }}>
            <section className='d-flex'>
                <div className="col-md-2 mt-3">
                    <Link className="d-flex justify-content-center align-items-center" to="/">
                        <img style={{ width: "", height: "90px" }} src={logo} alt="" />
                    </Link>
                </div>
                <div className="col-md-7 mt-3 pl-1 pt-4">
                    <h1 style={{ color: "#7AB259" }}>IST <span style={{ color: "#FB9937" }}>Online Exam Hall</span> </h1>
                </div>
                <div className="col-md-3 mt-2">
                    <div className="mt-5   " style={{ color: '#7AB259' }}>
                        {loggedInUser.email && <div className="d-flex justify-content-end "><p className="mt-1">{JSON.parse(localStorage.getItem("user")).name}</p> <img className="avatar mx-4" src={`http://localhost:5000/student/${JSON.parse(localStorage.getItem("studentData"))[0]?.image}`} alt="avatar" /></div>}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default StudentHeader;