import { useState, useEffect,useRef } from "react";
// import {name} from "./url.js";
import { url } from './url.js';


function First()

{

  // alert(hi);
  // console.log(hi);
  // alert(hi);
  // const myScript = require('./url.js');
  // console.log(myScript.hi);z



    var [tagline, settagline] = useState("");
    var [address, setaddress] = useState("");
    const [phn1, setphn1] = useState("");
    var [phn2, setphn2] = useState("");
    var [phn3, setphn3] = useState("");
    var [email, setemail] = useState("");
    var [footer, setfooter] = useState("");
    var [timing, settiming] = useState("");
    var [adminid, setadminid] = useState("");

    useEffect(()=>{

      // alert(url);
      

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
      
             settagline(data.tagline);
             setaddress(data.address);
             setphn1(data.phn1);
             setphn2(data.phn2);
             setphn3(data.phn3);
             setemail(data.email);
             setfooter(data.footer);
             settiming(data.timing);
             setadminid(data.adminid);
              
            })
            .catch(err => console.log(err));
        
    
    }, [])








  var [noofstudents, setnoofstudents] = useState("");
  var [noofcourse, setnoofcourse] = useState("");
  var [noofcertificates, setnoofcertificates] = useState("");
    
    fetch(url+"/showstudentfees", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Origin": "*",
    },
    // body: JSON.stringify(user)
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data[0].feedetailstransactionid);

    //   setFilteredList(data);
    //   setStudents(data);
    console.log(data.length);
    
    localStorage.setItem("noofstudent",data.length-1);
    var lastcpcid=localStorage.getItem("lastcpcid");
  var lastno=parseInt( lastcpcid.slice(5,lastcpcid.length));

    setnoofstudents(lastno);
    var lastcpcid=localStorage.getItem("lastcourseid");
    var lastno=parseInt( lastcpcid.slice(4,lastcpcid.length));
  
      setnoofcourse(lastno);
  

    })
    .catch((err) => console.log(err));




    
    const updatedetails = (e) => {
        e.preventDefault();
        

        const user = { address: address, tagline: tagline, email: email, phn2: phn2, phn3: phn3, phn1: phn1,  footer: footer, timing: timing,adminid:adminid };
        console.log(user);

        fetch(url+"/updateadmin", {
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
                // window.location.replace("")
                alert("Admin Details Updated");
    //   window.location.replace("http://localhost:3001");

            })
            .catch(err => console.log(err));

    
    
    
    }


    return (
        <>
        
        {/* <button onClick={clickme}>click to fetch value from other page</button> */}
        <div >
        <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
            <div className="col-sm-6 col-xl-3">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-line fa-3x text-primary"></i>
                    <div className="ms-3">
                        <p className="mb-2">STUDENTS</p>
                        <h6 className="mb-0">{noofstudents}</h6>
                    </div>
                </div>
            </div>
            
            <div className="col-sm-6 col-xl-3">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-line fa-3x text-primary"></i>
                    <div className="ms-3">
                        <p className="mb-2">PAYMENT-MONTH</p>
                        <h6 className="mb-0">dec</h6>
                    </div>
                </div>
            </div>
            <div className="col-sm-6 col-xl-3">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-bar fa-3x text-primary"></i>
                    <div className="ms-3">
                        <p className="mb-2">COURSES</p>
                        <h6 className="mb-0">{noofcourse}</h6>
                    </div>
                </div>
            </div>
            <div className="col-sm-6 col-xl-3">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                    <i className="fa fa-chart-area fa-3x text-primary"></i>
                    <div className="ms-3">
                        <p className="mb-2">CERTIFICATION</p>
                        <h6 className="mb-0">0</h6>
                    </div>
                </div>
            </div>
            

            
        </div>
    </div>
    <br></br>
<h3>Update Your Website Details</h3>
<br></br>

    <form onSubmit={updatedetails}>
   
  <div style={{ "display": "grid",
  "grid-template-columns": "auto auto   ",
  "grid-gap": "10px","width":"95%","margin":"auto"}}>


<div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
Institute Tagline                  </label>
                  <input
                  onChange={(e) => settagline(e.target.value)}
                  placeholder={tagline}
                  
                    // onChange={(e) => setname(e.target.value)}
                    type="text"
                    className="form-control bg-secondary "
                    id="exampleInputText1"
                  />
                </div>
                
<div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
Institute Address                  </label>
                  <input
                    onChange={(e) => setaddress(e.target.value)}
                    placeholder={address}
                    type="text"
                    className="form-control bg-secondary "
                    id="exampleInputText1"
                  />
                </div>
<div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    PHN NO-1
                  </label>
                  <input
                    // onChange={(e) => setname(e.target.value)}
                    onChange={(e) => setphn1(e.target.value)}
                    placeholder={phn1}
                    
                    type="number"
                    className="form-control bg-secondary "
                    id="exampleInputText1"
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                  PHN NO-2

                  </label>
                  <input
                    // onChange={(e) => setfees(e.target.value)}
                    onChange={(e) => setphn2(e.target.value)}
                    placeholder={phn2}
                  
                    type="number"
                    className="form-control bg-secondary"
                    id="exampleInputText1"
                  />
                </div>
                
<div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
PHN NO-3
                  </label>
                  <input
                    // onChange={(e) => setname(e.target.value)}
                    onChange={(e) => setphn3(e.target.value)}
                    placeholder={phn3}
                  
                    type="number"
                    className="form-control bg-secondary "
                    id="exampleInputText1"
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
Email 
                  </label>
                  <input
                    // onChange={(e) => setname(e.target.value)}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder={email}
                  
                    type="email"
                    className="form-control bg-secondary "
                    id="exampleInputText1"
                  />
                </div>

                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
Institute Timing
                  </label>
                  <input
                    // onChange={(e) => setname(e.target.value)}
                    onChange={(e) => settiming(e.target.value)}
                    placeholder={timing}
                  
                    type="text"
                    className="form-control bg-secondary "
                    id="exampleInputText1"
                  />
                </div>

                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
Footer 
                  </label>
                  <input
                    // onChange={(e) => setname(e.target.value)}
                    onChange={(e) => setfooter(e.target.value)}
                    placeholder={footer}
                  
                    type="description"
                    className="form-control bg-secondary "
                    id="exampleInputText1"
                  />
                </div>



    
   </div>
   
    
   

 



   


                <button type="submit" className="btn btn-success">
                UPDATE DETAILS
                </button>
              </form>
             
    
        </div>
        </>
    );
}

export default First;