import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import logo from '../../../images/ICON/home.png';

const Header = () => {
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
                        <img style={{ width: "", height: "90px", borderRadius: '50%' }} src={logo} alt="" />
                    </Link>
                </div>
                <div className="col-md-8 mt-3 pl-1 pt-4">
                    <h1 style={{ color: "#7AB259" }}> Online<span style={{ color: "#FB9937" }}> Exam Hall</span> </h1>
                </div>
                <div className="col-md-2 mt-2">
                    <div className="mt-5 text-right pr-4" style={{ margin: '', color: '#7AB259' }}>
                        <h6>{loggedInUser.email && <p>{JSON.parse(localStorage.getItem("user")).name}</p>}{" "}</h6>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Header;