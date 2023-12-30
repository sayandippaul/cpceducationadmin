
import "./loginsignup.css";
// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { url } from './url.js';

import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router";
// import { useNavigate } from "react-router";
import First from "./First";
import {Routes, Route, useNavigate} from 'react-router-dom';
// localStorage.setItem("app",0);
// localStorage.setItem("admin",0);

function Loginsignup()
{
const navigate = useNavigate();

    const[cpcid,setcpcid]=useState('')
    const[cpcid1,setcpcid1]=useState('')
    const[pass,setpass]=useState('')
    const[address,setaddress]=useState('')
    const[phone,setphone]=useState('')
    const[name,setname]=useState('')

    const[pass1,setpassword]=useState('')
    const container = document.getElementById('container');
    // console.log(container.classList)
   
    
    const clickme = (e) => {
        // alert(name+phone);
    e.preventDefault();
            const user = { cpcid: cpcid, password: pass };
            // const user={username:"sayandip paul",password:"12345"};
        // console.log("hi"+user.username);
        // console.log(user);

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
    
            // window.location.replace("login.js");
            // alert("success");
            console.log(data);
            if(cpcid==data.adminid && pass==data.password){
          localStorage.setItem("admin",1);
          alert("Welcome "+data.admin);
          window.location.reload();
        }
        else{
                alert("Wrong Credentials");

          localStorage.setItem("admin",0);

        }

            
          })
          .catch(err => console.log(err));
    

              }





      const register = (e) => {
        // alert(name+phone);
    e.preventDefault();
    const user = { cpcid: cpcid1, password: pass1,address:address,phone:phone,name:name };

    fetch(url+"/registerstudent", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
        .then(data => {
      //       alert("hi");
  
      //     // window.location.replace("login.js");
      //     // alert("success");
              console.log(data);           
               if(data==0){
              alert("User already exists or wrong cpcid");
      //         // const root = ReactDOM.createRoot(document.getElementById('root'));
      //         // const navigate=useNavigate()
      //         // navigate('/App')
      //         // window.location.replace("index2.js");
      //           window.location.replace("http://localhost:3001");


          }
          else{
              alert("Registration successful ");
              localStorage.setItem("app",1);
              localStorage.setItem("cpcid",cpcid);

              localStorage.setItem("sora",0);

                // window.reload();
                // location.reload();
        window.location.reload();


          }
        })
        .catch(err => console.log(err));
  
      }
    return (
        <>
        {/* <h2>Weekly Coding Challenge #1: Sign in/up Form</h2>
         */}
         

<div className="problem">
<div className="container" id="container">
	<div className=" ">
		<form onSubmit={clickme} action="#">
			<h1>Sign in</h1>
			{/* <div className="social-container">
				<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
				<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
				<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
			</div> */}
			<span>Admin Panel</span>
			<input onChange={(e) => setcpcid(e.target.value)} type="text" placeholder="Enter AdminID" />
			<input onChange={(e) => setpass(e.target.value)} type="password" placeholder="Password" />
			<a href="#">Forgot your password?</a>

			<button>Sign In</button>
		</form>
	</div>
</div>

</div>

      
        </>
    );
}

const container = document.getElementById('container');
function signin(){
    // alert("hi");
        container.classList.remove("right-panel-active");
}
function signup(){
	container.classList.add("right-panel-active");
}
export default Loginsignup;

