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




function Homemain() {
    return (
        <div id="hi">



            

                {/* <Route exact path='/About' element={< About />}></Route> */}
                <Routes>
                    <Route exact path='/About' element={< About />}></Route>
                    <Route exact path='/Seebatches' element={< Seebatches />}></Route>

                    <Route exact path='/Addstudent' element={< Addstudent />}></Route>
                    <Route exact path='/Showstudentfees' element={< Showstudentfees />}></Route>
                    <Route exact path='/Managestudents' element={< Managestudents />}></Route>
                    {/* <Route exact path='/Loginsignup' element={< Loginsignup />}></Route> */}

                    <Route exact path='/' element={< First />}></Route>
                    <Route exact path='/First' element={< First />}></Route>

                    
                </Routes>


            


        </div>



    )
}


export default Homemain;