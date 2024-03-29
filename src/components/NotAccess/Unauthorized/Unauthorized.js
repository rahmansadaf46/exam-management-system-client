import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
import Navbar from '../../Home/Navbar/Navbar';


const Unauthorized = () => {
    const [isAdmin, setIsAdmin] = useState(true);
    const [loggedInUser] = useContext(UserContext);


    function MyComponent3() {
        useEffect(() => {
            setIsAdmin(JSON.parse(localStorage.getItem("admin")) || {});
        }, [])
    }
    function MyComponent4() {
        useEffect(() => {
            fetch('http://localhost:5000/isAdmin', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ email: loggedInUser.email })
            })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('admin', JSON.stringify(data));
                    setIsAdmin(data);
                });
        }, [])
    }
    if (localStorage.getItem("admin")) {
        MyComponent3();
    }
    else {
        MyComponent4();
    }

    return (
        <div >

            {
                isAdmin === true ? <img style={{ width: '500px' }} className="rounded mx-auto d-block mt-4 pt-5" src="https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif" alt="" />

                    : <div >

                        <Navbar />
                        <h1 style={{ fontSize: '200px', marginTop: '70px', color: 'red' }} className="text-center " >Access Denied</h1>
                        <br />

                    </div>
            }
        </div>
    );
};

export default Unauthorized;