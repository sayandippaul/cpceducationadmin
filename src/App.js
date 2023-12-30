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
// import Studentmainpage from "./Studentmainpage";
// import Loginsignup from "./Loginsignup";


// import {Routes, Route} from 'react-router-dom';
const Loginsignup = React.lazy(() => import('./Loginsignup'));
const Studentmainpage = React.lazy(() => import('./Studentmainpageold'));


val=0;
var sora=1;
// localStorage.setItem("sora",0)
var val=localStorage.getItem("admin");
// var sora=localStorage.getItem("sora");
function App() {
  if(val==0){

  }
  
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
  // <React.Suspense fallback={<></>}>
  //       {(CHOSEN_THEME === TYPE_OF_THEME.LIGHT_MODE) && <LightTheme />}
  //       {(CHOSEN_THEME === TYPE_OF_THEME.DARK_MODE) && <DarkTheme />}
  //     </React.Suspense>

  return (

    <div className="App">
      {val == 0 ? (
        
        <Loginsignup />
      ) : (
        <>
         
         <Homenav></Homenav>
          <Homeside></Homeside>
        </>
      )}
    </div>
  );
}

export default App;
