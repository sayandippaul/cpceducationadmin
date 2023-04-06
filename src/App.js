import logo from "./logo.svg";
import "./App.css";
import Home from "./Home";
import React, { useEffect, useState } from 'react';
// import Home from './homeside';
// import Home from './homenav';
import Homenav from "./homenav";
import Homeside from "./homeside";
import "./template";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import About from "./About";
import First from "./First";
// import "./login.js";
import Loginsignup from "./Loginsignup";
import Studentmainpage from "./Studentmainpage";

// import {Routes, Route} from 'react-router-dom';

val=0;
var sora=0;
// localStorage.setItem("sora",0)
var val=localStorage.getItem("app");
var sora=localStorage.getItem("sora");

function App() {
  
 const closesidebar = () => {
    // console.log('button clicked');
    // $('.sidebar-toggler').click(function () {
    //     $('.sidebar, .content').toggleClass("open");
    //     return false;
    // });
    // document.getElementById("close").style.width=0;
    // document.querySelector('.sidebar, .content').classList.toggle("open");
    document.querySelector(".content").classList.toggle("open");
    document.querySelector(".sidebar").classList.toggle("open");
    //  val=true;
  };

  return (
    <div className="App">
      {val == 0 ? (
        
        <Loginsignup />
      ) : (
        <>
          {/* <Loginsignup></Loginsignup> */}
          {sora == 0 ? (
        
        <Studentmainpage />
      ) : (
        <>
          {/* <Loginsignup></Loginsignup> */}

          <Homenav></Homenav>
          <Homeside></Homeside>
          {/* <Homemain></Homemain> */}
        </>
      )}
          {/* <Homenav></Homenav>
          <Homeside></Homeside> */}
          {/* <Homemain></Homemain> */}
        </>
      )}
    </div>
  );
}

export default App;
