import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';
// import { useHistory } from 'react-router-dom';
import header from '../../../images/Photos/header.png'
const BASE_URL = process.env.REACT_APP_API_URL;
const HeaderMain = () => {
    // const history = useHistory();

    // const handleLoginRoute = () => {

    //     history.push("/student/allstudent");
    // };
    const [loggedInUser] = useContext(UserContext);
    // console.log(localStorage.getItem('admin'))
    const [adminButton, setAdminButton] = useState(false);
    const [studentButton, setStudentButton] = useState(false);
    const [teacherButton, setTeacherButton] = useState(false);
    // useEffect(() => {
    //     if (localStorage.getItem("admin")) {
    //         setAdminButton(localStorage.getItem("admin"));
    //     }

    // }, [])
    // const query =`  
    // {
    //     category {
    //           products{ 
    //       id
    //         name
    //         inStock
    //         gallery
    //         description
    //         category
    //         attributes{
    //           id
    //           name
    //           type
    //           items{
    //             displayValue
    //             value
    //             id
    //           }
    //         }
    //       }
    //     }
    //   }
    // `
    // useEffect(()=>{
    //     fetch('http://localhost:4000/', {
    //             method: 'POST',
    //             headers: { 'content-type': 'application/json' },
    //             body: JSON.stringify({ query: query })
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log(data);
    //             });
    // },[])
    function MyComponent1() {
        useEffect(() => {
            if (localStorage.getItem("studentAccess")) {
                setStudentButton(localStorage.getItem("studentAccess"));
            }

        }, [])
    }
    function MyComponent2() {
        useEffect(() => {
            fetch(BASE_URL + '/isStudent', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ email: loggedInUser.email })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.semester !== null) {
                        console.log(data);
                        // fetch(`http://localhost:5000/semester/${data}`)
                        // .then(res => res.json())
                        // .then(result => {
                        //    console.log(result);
                        // });
                        // if (data.semester !== null) {
                        //     console.log(data)
                        //     localStorage.setItem('studentAccess', true);
                        //     localStorage.setItem('studentData', JSON.stringify(data));
                        //     localStorage.setItem("semesterData", JSON.stringify(data.semester));
                        // }
                        setStudentButton(true);
                    }
                });
        }, [])
    }
    if (localStorage.getItem("studentAccess")) {
        MyComponent1();
    }
    else {
        MyComponent2();
    }
    function MyComponent3() {
        useEffect(() => {
            if (JSON.parse(localStorage.getItem("admin")) === true) {
                setAdminButton(true);
            }

        }, [])
    }
    function MyComponent4() {
        useEffect(() => {
            fetch(BASE_URL + '/isAdmin', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ email: loggedInUser.email })
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setAdminButton(true);
                    }
                });
        }, [])
    }
    if (localStorage.getItem("admin")) {
        MyComponent3();
    }
    else {
        MyComponent4();
    }
    function MyComponent5() {
        useEffect(() => {
            if (localStorage.getItem("teacherAccess")) {
                setTeacherButton(localStorage.getItem("teacherAccess"));
            }

        }, [])
    }
    function MyComponent6() {
        console.log(loggedInUser.email )
       
        useEffect(() => {
            fetch(BASE_URL + '/isTeacherValidation', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ email: loggedInUser.email  })
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data) {
                        setTeacherButton(true);

                    }
                });
        }, [])
    }
    if (localStorage.getItem("teacherAccess")) {
        MyComponent5();
    }
    else {
        MyComponent6();
    }
    // console.log(  );
    // useEffect(() => {
    //     const data = JSON.parse(localStorage.getItem('studentData'));
    //     // console.log(data[0]);
    //     fetch(`http://localhost:5000/semesterStudent/${data[0].session}/${data[0].department}`)
    //                     .then(res => res.json())
    //                     .then(result => {
    //                        console.log(result);
    //                     });
    // }, [])
    return (
        <div className="">
            <main style={{ height: 'auto' }} className="d-flex align-items-center">
                <div className="col-md-4 offset-md-1 ">
                    <div className="d-flex">

                        <div className="title-bar "></div>
                        <div className="app-title">
                            <div className="animated infinite pulse">
                                <h2 style={{ color: '#111430' }}><b>Online Exam  <br />Hall</b></h2>

                            </div>

                        </div>

                    </div>
                    <br />
                    <br />
                    <div style={{ display: teacherButton ? 'block' : 'none' }}>
                        <Link to='/department' style={{ background: '#111430', padding: '10px' }} className="btn text-white"><div className="button-yellow">Teacher Dashboard</div></Link>

                    </div>
                    <div style={{ display: studentButton ? 'block' : 'none' }}>
                        <Link to='/studentDashboard' style={{ background: '#111430', padding: '10px' }} className="btn text-white"><div className="button-yellow">Student Dashboard</div></Link>

                    </div>
                    <div style={{ display: adminButton === true ? 'block' : 'none' }}>
                        <Link to='/admin/allstudent' style={{ background: '#111430', padding: '10px' }} className="btn text-white"><div className="button-yellow">Admin Dashboard</div></Link>

                    </div>



                </div>
                <div className="col-md-6">
                    <img src={header} alt="" className="img-fluid " />
                </div>

            </main >
            <p style={{ marginTop: '9vh' }} className="text-center color-yellow"><small>Copyright Team Sadaf & Kamrul {(new Date()).getFullYear()} All Rights Reserved</small></p>
        </div>
    );
};

export default HeaderMain;