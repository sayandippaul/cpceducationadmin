// import {react} from 'react';
import React, { Component } from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About';
import First from './First';
import { url } from './url.js';

// import Showstudentfees from './showstudentfees';

import { useState, useEffect,useRef } from "react";


function Homeside() {

    var [name, setname] = useState("");
    var [quiry, setquiry] = useState("");
    var [newadmission, setnewadmission] = useState("");
    var [institute, setinstitute] = useState("");

    fetch(url+"/lastcpcid", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
          // alert("success");
          localStorage.setItem("lastcpcid",data.cpcid);
    localStorage.setItem("lastcourseid",data.courseid);
    localStorage.setItem("lastqid",data.qid);
    localStorage.setItem("lastaid",data.aid);
  
        })
        .catch((err) => console.log(err));
  
  
    fetch(url+"/showadmin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Origin": "*"
        },
        // body: JSON.stringify(user)
      })
        .then(res => res.json())
        .then(data => {
  
          setname(data.admin);
          setinstitute(data.institute);
          var lastaid=localStorage.getItem("lastaid");
          setnewadmission(lastaid);
          var lastqid=localStorage.getItem("lastqid");
          
          var lastno=parseInt( lastqid.slice(2,lastqid.length));
            setquiry(lastno);
            console.log(newadmission+quiry);

          if(quiry=="0" || quiry==0){
            document.getElementById("quiry").style.visibility="hidden";
        
        }
        else{
            document.getElementById("quiry").style.visibility="visible";
        
        } if(newadmission=="0" || newadmission==0){
            document.getElementById("newadmission").style.visibility="hidden";
        
        }
        else{
            document.getElementById("newadmission").style.visibility="visible";
        
        }

          
        })
        .catch(err => console.log(err));
        

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
                        <a className="navbar-brand mx-4 mb-3">
                            <h5 className="text-primary"><i className="fa fa-user-edit me-2"></i>{institute}</h5>
                            <br></br>
                        </a>
                        <div className="d-flex align-items-center ms-4 mb-4">
                            <div className="position-relative">
                                <img className="rounded-circle" src="img/user.jpg" alt="" />
                                <div id="circle" className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1 "></div>
                            </div>
                            <div className="ms-3">
                                <h6 className="mb-0"><span>{name}</span></h6>
                                <span id="admin">Admin</span>
                            </div>
                        </div>
                        <div  className="navbar-nav mr-auto" style={{"position":"absolu"}}>
                            {/* <a href="index.html" className="nav-item nav-link active"><i className="fa fa-tachometer-alt me-2"></i>Dashboard</a> */}

                            {/* <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle nav-item nav-link active"  data-bs-toggle="dropdown"><i className="far fa-file-alt me-2"></i>HOME</a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <a href="signin.html" className="dropdown-item">TERMS AND CONDITION</a>
                                    <a href="signup.html" className="dropdown-item">ABOUT US</a>
                                    <a href="signup.html" className="dropdown-item">CONTACT US</a>
                                    <a href="signup.html" className="dropdown-item">FEEDBACK</a>



                                </div>
                            </div> */}

<div className="nav-item  me-auto">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-lock me-2"></i>DASHBOARD</a>
                                <div className="dropdown-menu bg-transparent border-0">
                                     {/* <a href="signin.html" className="dropdown-item"></a> */}
                                    <Link className="link dropdown-item" to="/">GO TO DASHBOARD</Link>

                                    {/* <a href="signup.html" className="dropdown-item">PENDING CERTIFICATES</a>  */}

                                </div>
                            </div>

                             <div className="nav-item dropdown me-auto">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="far fa-file-alt me-2"></i>COURSES</a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    {/* <a href="signin.html" className="dropdown-item">ADD COURSE</a> */}
                                    <Link className="link dropdown-item" to="/Addcourse">NEW COURSE</Link>
                                    <Link className="link dropdown-item" to="/Managecourses"> ALL COURSES DETAILS</Link>


                                </div>
                            </div>


                            <div className="nav-item dropdown me-auto">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="true"><i className="fa fa-laptop me-2"></i>STUDENTS<sup id="newadmission" className="shownotice">{newadmission}</sup>
                                {/* <sup id="newadmission" className="shownotice">&nbsp;&nbsp;&nbsp;&nbsp;</sup> */}
                                 </a>

                                <div className="dropdown-menu bg-transparent border-0">
                                    {/* <a href="/about" className="dropdown-item">ADD STUDENTS</a> */}
                                    <Link className="link dropdown-item" to="/Addstudent">NEW ADMISSSION</Link>
                                    <Link className="link dropdown-item" to="/Admission">APPROVE ADMISSION</Link>
                                    <Link className="link dropdown-item" to="/Managestudents">STUDENTS DETAILS</Link>

                                    {/* <a href="typography.html" className=" link dropdown-item">MANSTUDENTS</a> */}
                                    {/* <a href="element.html" className="dropdown-item">CURRENT STUDENTS</a> */}
                                </div>
                            </div>
                            <div className="nav-item dropdown me-auto">

                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>PAYMENTS</a>
                                <div className="dropdown-menu bg-transparent border-0 ">
                                    {/* <a href="button.html" className="dropdown-item">ALL PAYMENT HISTORY</a> */}
                                    <Link className="link dropdown-item" to="/Showstudentfees">PAYMENT DETAILS</Link>

                                </div>
                            </div>
                            <div className="nav-item dropdown me-auto">

<a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Batches</a>
<div className="dropdown-menu bg-transparent border-0 ">
    {/* <a href="button.html" className="dropdown-item">ALL PAYMENT HISTORY</a> */}
    <Link className="link dropdown-item" to="/Seebatches">YOUR BATCHES</Link>

    {/* <a href="typography.html" className="dropdown-item">LAST MONTH PAYMENT</a>
    <a href="element.html" className="dropdown-item">PENDING PAYMENTS</a> */}
</div>
</div>

<div className="nav-item  me-auto">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-lock me-2"></i>CERTIFICATION</a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    {/* <a href="signin.html" className="dropdown-item">ALL CERTIFICATES</a>
                                    <a href="signup.html" className="dropdown-item">PENDING CERTIFICATES</a> */}

                                </div>
                            </div>

                            
<div className="nav-item dropdown me-auto">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="far fa-file-alt me-2"></i>Feedback/Enquiry <sup id="quiry" className="shownotice">{quiry}</sup>
                                {/* <strong id="quiry" className="shownotice">&nbsp;&nbsp;&nbsp;&nbsp;</strong> */}
                                </a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <Link className="link dropdown-item" to="/Feedback">Reply Enquiries</Link>

                                </div>
                            </div>
                           

{/*                             
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
                                        </li>
                                    </ul>
                                    
                                </div> */}
                            


                        </div>
                    </nav>
                </div>
                {/* Sidebar End */}

            </div>
        </div>

    )
}


export default Homeside;