// import {react} from 'react';
import React, { Component } from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About';
import First from './First';
// import Showstudentfees from './showstudentfees';



function Homeside() {
    const closesidebar = () => {
        // console.log('button clicked');
        // $('.sidebar-toggler').click(function () {
        //     $('.sidebar, .content').toggleClass("open");
        //     return false;
        // });
    // document.getElementById("close").style.width=0;
    // document.querySelector('.sidebar, .content').classList.toggle("open");
    // document.querySelector('.sidebar, .content').classList.toggle("open");
    document.querySelector('.content').classList.toggle("open");
document.querySelector('.sidebar').classList.toggle("open");

    
    
      };
    
     
    return (
        <div>
            <div className="container-fluid position-relative d-flex p-0">
                {/* Spinner Start */}

                {/* Spinner En

{/* Sidebar Start */}
                <div id="close" className="sidebar pe-4 pb-3">
                    <nav className="navbar bg-secondary navbar-dark">
                        <a href="index.html" className="navbar-brand mx-4 mb-3">
                            <h3 className="text-primary"><i className="fa fa-user-edit me-2"></i>CPC Education</h3>
                        </a>
                        <div className="d-flex align-items-center ms-4 mb-4">
                            <div className="position-relative">
                                <img className="rounded-circle" src="img/user.jpg" alt="" />
                                <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                            </div>
                            <div className="ms-3">
                                <h6 className="mb-0">Jhon Doe</h6>
                                <span>Admin</span>
                            </div>
                        </div>
                        <div className="navbar-nav w-100">
                            {/* <a href="index.html" className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2"></i>Dashboard</a> */}

                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" className="nav-item nav-link active" data-bs-toggle="dropdown"><i className="far fa-file-alt me-2"></i>HOME</a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <a href="signin.html" className="dropdown-item">TERMS AND CONDITION</a>
                                    <a href="signup.html" className="dropdown-item">ABOUT US</a>
                                    <a href="signup.html" className="dropdown-item">CONTACT US</a>
                                    <a href="signup.html" className="dropdown-item">FEEDBACK</a>



                                </div>
                            </div>

                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>STUDENTS</a>
                                <div className="dropdown-menu bg-transparent border-0 list">
                                    {/* <a href="/about" className="dropdown-item">ADD STUDENTS</a> */}
                                    <Link className="link dropdown-item" to="/Addstudent">ADD STUDENTS</Link>
                                    <Link className="link dropdown-item" to="/Managestudents">MANAGE STUDENTS</Link>

                                    {/* <a href="typography.html" className=" link dropdown-item">MANSTUDENTS</a> */}
                                    {/* <a href="element.html" className="dropdown-item">CURRENT STUDENTS</a> */}
                                </div>
                            </div>
                            <div className="nav-item dropdown">

                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>PAYMENTS</a>
                                <div className="dropdown-menu bg-transparent border-0 ">
                                    {/* <a href="button.html" className="dropdown-item">ALL PAYMENT HISTORY</a> */}
                                    <Link className="link dropdown-item" to="/Showstudentfees">ALL PAYMENT HISTORY</Link>

                                    <a href="typography.html" className="dropdown-item">LAST MONTH PAYMENT</a>
                                    <a href="element.html" className="dropdown-item">PENDING PAYMENTS</a>
                                </div>
                            </div>
                            <div className="nav-item dropdown">

<a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Batches</a>
<div className="dropdown-menu bg-transparent border-0 ">
    {/* <a href="button.html" className="dropdown-item">ALL PAYMENT HISTORY</a> */}
    <Link className="link dropdown-item" to="/Seebatches">See Your Batches</Link>

    {/* <a href="typography.html" className="dropdown-item">LAST MONTH PAYMENT</a>
    <a href="element.html" className="dropdown-item">PENDING PAYMENTS</a> */}
</div>
</div>

                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="far fa-file-alt me-2"></i>CERTIFICATION</a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <a href="signin.html" className="dropdown-item">ALL CERTIFICATES</a>
                                    <a href="signup.html" className="dropdown-item">PENDING CERTIFICATES</a>

                                </div>
                            </div>


                            
                                <div className="">
                                    <ul className="list">
                                        <li>
                                            <Link className="link" to="/About">About Us</Link>
                                        </li>
                                        <li>
                                            <Link className="link" to="/Addstudent">studnt reg</Link>
                                        </li>
                                        <li>
                                            <Link className="link" to="/First">first page</Link>
                                        </li>
                                        <li>
                                            {/* <Link className="link" to="/About">About Us</Link> */}
                                        </li>
                                    </ul>
                                    
                                </div>
                            


                        </div>
                    </nav>
                </div>
                {/* Sidebar End */}

            </div>
        </div>

    )
}


export default Homeside;