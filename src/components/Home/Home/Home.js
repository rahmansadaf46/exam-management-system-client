import React from 'react';
import HeaderMain from '../HeaderMain/HeaderMain';
import Navbar from '../Navbar/Navbar';
import './Home.css'

const Home = () => {
    document.title = "IST Online Exam Hall";
    return (
        <div className="header-container min-vh-100">
            <Navbar></Navbar>
            <HeaderMain></HeaderMain>

        </div>
    );
};

export default Home;