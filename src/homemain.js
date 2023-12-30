// import {react} from 'react';
import React, { Component } from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import About from './About';
import First from './First';
import Addstudent from './Addstudent';
// import Loginsignup from './Loginsignup';

import Showstudentfees from './Showstudentfees';
import Managestudents from './Managestudents';

import Seebatches from './Seebatches';
import Addcourse from './Addcourse';
import Managecourses from './Managecourses';
import Admission from './Admission';
import Feedback from './Feedback';




function Homemain() {
    if(localStorage.getItem("admissiondetails")==null){

        localStorage.setItem("admissiondetails","");
    }

    return (
        <div id="hi">



            

                {/* <Route exact path='/About' element={< About />}></Route> */}
                <Routes>
                    <Route exact path='/About' element={< About />}></Route>
                    <Route exact path='/Seebatches' element={< Seebatches />}></Route>

                    <Route exact path='/Addstudent' element={< Addstudent />}></Route>
                    <Route exact path='/Admission' element={< Admission />}></Route>
                    <Route exact path='/Showstudentfees' element={< Showstudentfees />}></Route>
                    <Route exact path='/Managestudents' element={< Managestudents />}></Route>
                    <Route exact path='/Addcourse' element={< Addcourse />}></Route>
                    <Route exact path='/Managecourses' element={< Managecourses />}></Route>
                    <Route exact path='/Feedback' element={< Feedback />}></Route>
                    {/* <Route exact path='/Loginsignup' element={< Loginsignup />}></Route> */}

                    <Route exact path='/' element={< First />}></Route>
                    <Route exact path='/First' element={< First />}></Route>

                    
                </Routes>


            


        </div>



    )
}


export default Homemain;