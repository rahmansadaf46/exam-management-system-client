import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import logo from '../../../images/ICON/ist.png';
import './Navbar.css'


const Navbar = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [adminName, setAdminName] = useState([]);
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const logout = () => {
        window.location.reload();
        localStorage.clear();
        setLoggedInUser({})
    }


    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
    if (loggedInUser.email) {
        fetch('http://localhost:5000/adminName', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: loggedInUser.email })
        })
            .then(res => res.json())
            .then(data => {
                setAdminName(data[0].name);
                localStorage.setItem('adminName', JSON.stringify(data[0].name));
            })
    }
    // useEffect(() => {
    //     setAdminName(JSON.parse(localStorage.getItem("adminName")))
    // }, [localStorage.getItem("adminName")])






    return (
        <div >

            <nav className="navbar navbar-expand-lg navbar-light">

                <div className="row">
                    <div className="col-md-2 pl-5">
                        <img style={{ width: "100px", height: "100px" }} src={logo} alt="" />

                    </div>
                    <div className="col-md-10 mt-3 pl-5">
                        <h4 style={{ color: '#FB9937' }} className="">Institute of Science and Technology</h4>
                        <small style={{ color: '#7AB259' }} className="">Since 1993</small>
                    </div>
                </div>

                <button onClick={handleNavCollapse} class="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className=" navbar-nav ml-auto mr-5">

                        <li className="nav-item ">
                            {loggedInUser.isSignedIn ? <Link to='/' style={{ background: '#111430', borderRadius: '5px' }} className="nav-link mr-4 text-white px-5" onClick={logout}>Log Out</Link> :
                                <Link to="/login" style={{ background: '#111430', borderRadius: '5px' }} className="nav-link mr-4 text-white px-4" ><div>Login</div></Link>
                            }



                        </li>

                        <li className="nav-item">
                            <div style={{ margin: '9px 10px 0px 10px' }}>



                                {
                                    loggedInUser.email && <p style={{ color: '#FB9937' }}>
                                        {
                                            adminName.length === 0 && <p>Loading...</p>

                                        }
                                        {
                                            adminName
                                        }

                                    </p>
                                }
                            </div>
                        </li>

                    </ul>

                </div>
            </nav>
        </div>
    );
};

export default Navbar;