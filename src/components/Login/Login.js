import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import "./Login.css";
import logo from "../../images/ICON/istName.PNG"



firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const setData = (data) => {
        localStorage.setItem('user', JSON.stringify(data));
    }
    // useEffect(() => {
    //     setLoggedInUser(JSON.parse(localStorage.getItem("user")) || {});
    //     if (loggedInUser.email) {
    //         history.replace(from);
    //     }
    // }, []);


    const [currentUser, setCurrentUser] = useState({
        isSignedIn: false,
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
    });


    const handleFormToggle = () => {
        setNewUser(!newUser);
    };


    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    /* Form validation and give error */
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    let pass1, pass2;
    const handleFormValidation = (e) => {
        let isFieldValid = true;
        const newError = { ...errors };

        if (e.target.name === "name") {
            isFieldValid = e.target.value.length > 2;
            if (!isFieldValid) {
                newError[e.target.name] = "Name is not valid";
                setErrors(newError);
            } else {
                newError[e.target.name] = "";
                setErrors(newError);
            }
        }

        if (e.target.name === "email") {
            isFieldValid = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e.target.value);
            if (!isFieldValid) {
                newError[e.target.name] = "Email is not valid";
                setErrors(newError);
            } else {
                newError[e.target.name] = "";
                setErrors(newError);
            }
        }

        if (e.target.name === "password" || e.target.name === "confirmPassword") {
            const isPasswordLengthValid = e.target.value.length > 5;
            const passwordHasNumber = /\d{1}/.test(e.target.value);

            isFieldValid = isPasswordLengthValid && passwordHasNumber;

            if (e.target.name === "password") {
                pass1 = e.target.value;
                if (!isFieldValid) {
                    newError[e.target.name] = "Password is not valid";
                    setErrors(newError);
                } else {
                    newError[e.target.name] = "";
                    setErrors(newError);
                }
            }
            if (e.target.name === "confirmPassword") {
                pass2 = e.target.value;
                if (!isFieldValid && pass1 !== pass2) {
                    newError[e.target.name] = "Password is not matched";
                    setErrors(newError);
                } else {
                    newError[e.target.name] = "";
                    setErrors(newError);
                }
            }
        }

        if (isFieldValid) {
            const newUser = { ...currentUser };
            newUser[e.target.name] = e.target.value;
            setCurrentUser(newUser);
        }
    };

    /* CREATE NEW USER */
    const handleCreateNewUser = (e) => {
        e.preventDefault();

        if (!currentUser.email && !currentUser.password) {
            const newError = { ...errors };
            newError.name = "Please use valid name!";
            newError.email = "Please use valid email!";
            newError.password = "Please use valid password!";
            newError.confirmPassword = "Please is not matched!";
            setErrors(newError);
        } else {
            firebase
                .auth()
                .createUserWithEmailAndPassword(currentUser.email, currentUser.password)
                .then((result) => {
                    if (result) {
                        const user = firebase.auth().currentUser;

                        user.updateProfile({
                            displayName: currentUser.name,
                        }).then(function () {
                            const { displayName, email } = result.user;
                            const newUser = {
                                email: email,
                                name: displayName,
                                success: true,
                                error: "",
                            };


                            let admin = {};
                            admin.name = currentUser.name;
                            setCurrentUser(newUser);

                            setLoggedInUser(newUser);
                            setData(newUser);
                            console.log('user name updated successfully')
                        }).catch(function (error) {
                            console.log(error)
                        });

                    }
                })
                .catch((error) => {
                    const newUser = { ...currentUser };
                    newUser.error = error.message;
                    newUser.success = false;
                    setLoggedInUser(newUser);
                    console.log(error.message);
                });
        }
    };

    /* SIGN IN with email and password */
    const handleSignIn = (e) => {
        e.preventDefault();
        if (currentUser.email && currentUser.password) {
            setLoading(true);
        }
        if (!currentUser.email && !currentUser.password) {
            const newError = { ...errors };
            newError.email = "Please use valid email!";
            newError.password = "Please use valid password!";
            setErrors(newError);
            setLoading(false);
        } else {
            firebase
                .auth()
                .signInWithEmailAndPassword(currentUser.email, currentUser.password)
                .then((result) => {
                    if (result) {
                        setLoading(false);
                    }
                    const { displayName, email } = result.user;
                    const newUser = {
                        isSignedIn: true,
                        email: email,
                        name: displayName,
                        success: true,
                        error: "",
                    };
                    setCurrentUser(newUser);
                    setLoggedInUser(newUser);
                    setData(newUser);
                    console.log(newUser);
                    fetch('http://192.168.12.101:6060/isAdmin', {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ email: email })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data) {
                                console.log(data)
                                localStorage.setItem('admin', JSON.stringify(data));
                            }
                            // setIsAdmin(data);
                        });
                    fetch('http://localhost:5000/isTeacher', {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ email: email })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.length > 0) {
                                // console.log(data[0]._id)

                                fetch('http://localhost:5000/semesterById', {
                                    method: 'POST',
                                    headers: { 'content-type': 'application/json' },
                                    body: JSON.stringify({ id: data[0]._id })
                                })
                                    .then(res => res.json())
                                    .then(result => {
                                        if (result.length > 0) {
                                            localStorage.setItem('teacherAccess', true);
                                            localStorage.setItem('teacherData', JSON.stringify(data));
                                            localStorage.setItem('semester', JSON.stringify(result));
                                            // console.log(data)
                                        }

                                    });
                            }

                            // localStorage.setItem('admin', JSON.stringify(data));
                            // setIsAdmin(data);
                        });
                    fetch('http://localhost:5000/isStudent', {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({ email: email })
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.length > 0) {
                                console.log(data)
                                localStorage.setItem('studentAccess', true);
                                localStorage.setItem('studentData', JSON.stringify(data));
                            }
                            // localStorage.setItem('admin', JSON.stringify(data));
                            // setIsAdmin(data);
                        });
                    history.replace(from);
                })
                .catch((error) => {
                    if (error) {
                        setLoading(false);
                    }
                    const newUser = { ...currentUser };
                    newUser.email = "";
                    newUser.error = error.message;
                    newUser.success = false;
                    setLoggedInUser(newUser);
                });
        }
    };
    return (
        <>
            {
                loading === true ? <img style={{ width: "85vh", }} className="rounded mx-auto d-block " src="https://webstockreview.net/images/gear-clipart-setting-5.gif" alt="" />
                    : <section className="loginPage-signup-login text-center">
                        <Link to='/'>
                            <div className="d-flex justify-content-center mb-5">
                                <img style={{ width: '600px', marginTop: '-90px' }} src={logo} alt="" />

                            </div>
                        </Link>
                        {currentUser.success && (
                            <div className="alert alert-success" role="alert">
                                {!newUser ? "Please login first" : "User registered successfully... Now wait for admin Approval..."}
                            </div>
                        )}
                        {loggedInUser.error && (
                            <div className="alert alert-danger" role="alert">
                                {loggedInUser.error}
                            </div>
                        )}
                        <div className="container">
                            {newUser ? (
                                <SignUpForm
                                    toggleUser={handleFormToggle}
                                    validation={handleFormValidation}
                                    submit={handleCreateNewUser}
                                    errors={errors}
                                ></SignUpForm>
                            ) : (
                                <LoginForm
                                    toggleUser={handleFormToggle}
                                    validation={handleFormValidation}
                                    submit={handleSignIn}
                                    errors={errors}
                                ></LoginForm>
                            )}
                            <br />


                        </div>
                    </section>
            }
        </>
    );
};

export default Login;