
import "./loginsignup.css";
// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import React, { useState, useEffect } from 'react';
import { Navigate } from "react-router";
// import { useNavigate } from "react-router";
import First from "./First";
import {Routes, Route, useNavigate} from 'react-router-dom';
// localStorage.setItem("app",0);
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
    function signin(){
        // alert("hi");
        localStorage.setItem("sora",0);
        localStorage.setItem("app",1);
        window.location.reload();
        


            // container.classList.remove("right-panel-active");
            document.getElementById("container").className="container";
            // document.getElementsByClassName("right-panel-active").style.display="none";
    }
    // function click(){
    //     navigate("/First")

    // }
    function signup(){
        // container.classList.add("right-panel-active");
        document.getElementById("container").className="container right-panel-active";

        // document.getElementsByClassName("right-panel-active").style.display="block";

    }
    const clickme = (e) => {
        // alert(name+phone);
    e.preventDefault();
            const user = { cpcid: cpcid, password: pass };
            // const user={username:"sayandip paul",password:"12345"};
        // console.log("hi"+user.username);
        // console.log(user);

        fetch("http://localhost:3000/login", {
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
    
            // window.location.replace("login.js");
            // alert("success");
            console.log(data[0].password);
            if(data[0].password==pass){
                if(cpcid=="cpcbelgharia56"){
                localStorage.setItem("sora",1);

                }
                else{
                localStorage.setItem("sora",0);

                }
                // alert("login successful");
                // const root = ReactDOM.createRoot(document.getElementById('root'));
                // const navigate=useNavigate()
                // navigate('/App')
                // window.location.replace("index2.js");
                localStorage.setItem("app",1);
              localStorage.setItem("cpcid",cpcid);


                // window.reload();
                // location.reload();
        window.location.reload();


            }
            else{
                alert("Wrong Credentials");
                localStorage.setItem("app",0);


            }
          })
          .catch(err => console.log(err));
    
      }





      const register = (e) => {
        // alert(name+phone);
    e.preventDefault();
    const user = { cpcid: cpcid1, password: pass1,address:address,phone:phone,name:name };

    fetch("http://localhost:3000/registerstudent", {
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
	<div className="form-container sign-up-container">
		<form onSubmit={register}>
			<h1>New Admission</h1>
			{/* <div className="social-container">
				<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
				<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
				<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
			</div> */}
			<span>Check your email for registration</span>
			<input onChange={(e) => setcpcid1(e.target.value)} type="text" placeholder="Enter Provided Cpcid" />
			<input onChange={(e) => setname(e.target.value)} type="text" placeholder="Name" />
			<input onChange={(e) => setphone(e.target.value)} type="number" placeholder="Phone number" />
			<input onChange={(e) => setaddress(e.target.value)} type="text" placeholder="Enter Address" />
			<input onChange={(e) => setpassword(e.target.value)} type="password" placeholder="password" />



			<button>Sign Up</button>
		</form>
	</div>
	<div className="form-container sign-in-container">
		<form onSubmit={clickme} action="#">
			<h1>Sign in</h1>
			{/* <div className="social-container">
				<a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
				<a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
				<a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
			</div> */}
			<span> Use Your CPC Account</span>
			<input onChange={(e) => setcpcid(e.target.value)} type="text" placeholder="Enter Your CPCid" />
			<input onChange={(e) => setpass(e.target.value)} type="password" placeholder="Password" />
			<a href="#">Forgot your password?</a>

			<button>Sign In</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button className="ghost" id="signIn" onClick={signin}>Sign In</button>
			</div>
			<div className="overlay-panel overlay-right">
				<h1>New Admission?</h1>
				<p>Enter your personal details and Learn with CPC</p>
                {/* <button onClick={click}>hoii</button> */}

				<button className="ghost" id="signUp" onClick={signup}>Sign Up</button>
			</div>
		</div>
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

