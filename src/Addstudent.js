import Button from "react-bootstrap/Button";
import Placeholder from "react-bootstrap/Placeholder";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect, useRef } from "react";
// import "./login.js";

// name email date id course
var batch = [];
var times = [
  "7:00-9:00AM",
  "9:00-12:00PM",
  "12:00-2:00PM",
  "2:00-4:00PM",
  "4:00-6:00PM",
  "6:00-8:00PM",
  "8:00-10:00PM",
];

// document.getElementById("show").innerHTML="";

//  function shownow(){

// var show='<tr><td scope="col">7:00-9:00AM</td><td scope="col">9:00-12:00PM</td><td scope="col">12:00-2:00PM</td><td scope="col">2:00-4:00PM</td><td scope="col">4:00-6:00PM</td><td scope="col">6:00-8:00PM</td><td scope="col">8:00-10:00PM</td></tr>'+'<br/>';
// for(var i=1;i<=7;i++){
// show=show+'<tr><td onClick="{() => setbatch('+i+'a)}" scope="col">7:00-9:00AM</td><td onClick="{() => setbatch('+i+'b)}" scope="col">9:00-12:00PM</td><td onClick="{() => setbatch('+i+'c)}" scope="col">12:00-2:00PM</td><td onClick="{() => setbatch('+i+'d)}" scope="col">2:00-4:00PM</td><td onClick="{() => setbatch('+i+'e)}" scope="col">4:00-6:00PM</td><td onClick="{() => setbatch('+i+'f)}" scope="col">6:00-8:00PM</td><td onClick="{() => setbatch('+i+'g)}" scope="col">8:00-10:00PM</td></tr>'+'';

// }

// }

// setbatch();

// shownow();
const setbatch = (e) => {
  // e.preventDefault();
  // console.log(e);
  if (batch.includes(e) == false) {
    batch.push(e);
    document.getElementById(e).className = "text-success bg-white";
  } else {
    var index = batch.indexOf(e);
    console.log(index);
    batch.splice(index, 1);
    document.getElementById(e).className = "";
  }
  console.log(batch);
};

function Addstudent() {
  const dataFetchedRef = useRef(false);
  // function register()
  // {
  // function setbatch(n){
  //   // batch.push(i);
  //   // alert(n);
  //   // console.log(batch);

  //   }

  // var show="";
  useEffect((async) => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    // show="";
    //Runs only on the first render
    // for(var i=1;i<=7;i++){
    //   // show=show+'<tr><td onClick="{() => setbatch(1)}" scope="col">7:00-9:00AM</td><td  scope="col">9:00-12:00PM</td><td onClick="{() => setbatch('+i+'c)}" scope="col">12:00-2:00PM</td><td onClick="{() => setbatch('+i+'d)}" scope="col">2:00-4:00PM</td><td onClick="{() => setbatch('+i+'e)}" scope="col">4:00-6:00PM</td><td onClick="{() => setbatch('+i+'f)}" scope="col">6:00-8:00PM</td><td onClick="{() => setbatch('+i+'g)}" scope="col">8:00-10:00PM</td></tr>'+'';

    //   }
    // document.getElementById("show").innerHTML=show;
  }, []);
  var day = [1, 2, 3, 4, 5, 6, 7];
  var days = ["a", "b", "c", "d", "e", "f", "g"];
  const [name, setname] = useState("");
  const [email, setemail] = useState("");

  const [amount, setfees] = useState("");

  const clickme = (e) => {
    e.preventDefault();
    //   if (dataFetchedRef.current) return;
    // dataFetchedRef.current = true;

    // alert(name+phone);
    const d = new Date();
    let month = d.getMonth();
    var ki = parseInt(localStorage.getItem("noofstudent")) + 1;
    const user = {
      username: name,
      email: email,
      cpcid: "cpcid" + ki,
      month: month,
      amount: amount,
      batch: batch,
    };
    console.log("hi" + user.username);
    console.log(user);
    // var  text = { username: name, email: email, month: month,amount:amount,batch:batch };
    function sendmail() {
      fetch("http://localhost:3000/sendmailreg", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => { })
        .catch((err) => console.log(err));
    }
    
    fetch("http://localhost:3000/Addstudent", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        // window.location.replace("login.js");
        // alert(data);
        if (data != 0) {
          sendmail();
          batch = [];
          alert("student added for registration");
        } else {
          alert("email already exists");
        }
        // alert("success");
      })
      .catch((err) => console.log(err));
  };
  //   var show="";
  //   // var show='<tr><td scope="col">7:00-9:00AM</td><td scope="col">9:00-12:00PM</td><td scope="col">12:00-2:00PM</td><td scope="col">2:00-4:00PM</td><td scope="col">4:00-6:00PM</td><td scope="col">6:00-8:00PM</td><td scope="col">8:00-10:00PM</td></tr>'+'<br/>';
  // for(var i=1;i<=7;i++){
  //   show=show+'<tr><td scope="col">7:00-9:00AM</td><td scope="col">9:00-12:00PM</td><td scope="col">12:00-2:00PM</td><td scope="col">2:00-4:00PM</td><td scope="col">4:00-6:00PM</td><td scope="col">6:00-8:00PM</td><td scope="col">8:00-10:00PM</td></tr>'+'<br/>';

  // }
  // document.getElementById("show").innerHTML=show;
  // }

  return (
    <div>
      <div className="container-fluid pt-4 px-4 ">
        <div className="">
          <div className="">
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Student Registration</h6>
              <form onSubmit={clickme}>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Email Id{" "}
                  </label>
                  <input
                    onChange={(e) => setemail(e.target.value)}
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.
                  </div> */}
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Name
                  </label>
                  <input
                    onChange={(e) => setname(e.target.value)}
                    type="text"
                    className="form-control"
                    id="exampleInputText1"
                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                    Fees
                  </label>
                  <input
                    onChange={(e) => setfees(e.target.value)}
                    type="number"
                    className="form-control"
                    id="exampleInputText1"
                  />
                </div>

                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-check">
                    Courses
                  </label>
                  <br />
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckIndeterminate"
                  />
                  <label
                    className="form-check-label"
                    for="flexCheckIndeterminate"
                  >
                    JAVASCRIPT
                  </label>
                  <br />

                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckIndeterminate"
                  />
                  <label
                    className="form-check-label"
                    for="flexCheckIndeterminate"
                  >
                    PHP
                  </label>
                  <br />
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckIndeterminate"
                  />
                  <label
                    className="form-check-label"
                    for="flexCheckIndeterminate"
                  >
                    C++
                  </label>
                  <br></br>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckIndeterminate"
                  />
                  <label
                    className="form-check-label"
                    for="flexCheckIndeterminate"
                  >
                    PYTHON
                  </label>
                </div>

                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Monday</th>
                      <th scope="col">Tuesday</th>
                      <th scope="col">Wednesday</th>
                      <th scope="col">Thursday</th>
                      <th scope="col">Friday</th>
                      <th scope="col">Saturday</th>
                      <th scope="col">Sunday</th>
                    </tr>
                  </thead>
                  {/*                       
                      <thead>
                        
                        <tr>
                          <td scope="col">7:00-9:00AM</td>
                          <td scope="col">9:00-12:00PM</td>
                          <td scope="col">12:00-2:00PM</td>
                          <td scope="col">2:00-4:00PM</td>
                          <td scope="col">4:00-6:00PM</td>
                          <td scope="col">6:00-8:00PM</td>
                          <td scope="col">8:00-10:00PM</td>

                        </tr>
                      </thead> */}
                  <tbody id="show">
                    {/* {show} */}

                    {day.map((data) => (
                      // <div>

                      // </div>
                      <tr>
                        <td
                          id={"1" + days[data - 1]}
                          onClick={() => setbatch("1" + days[data - 1])}
                          scope="col"
                        >
                          {times[data - 1]}
                        </td>
                        <td
                          id={"2" + days[data - 1]}
                          onClick={() => setbatch("2" + days[data - 1])}
                          scope="col"
                        >
                          {times[data - 1]}
                        </td>
                        <td
                          id={"3" + days[data - 1]}
                          onClick={() => setbatch("3" + days[data - 1])}
                          scope="col"
                        >
                          {times[data - 1]}
                        </td>
                        <td
                          id={"4" + days[data - 1]}
                          onClick={() => setbatch("4" + days[data - 1])}
                          scope="col"
                        >
                          {times[data - 1]}
                        </td>
                        <td
                          id={"5" + days[data - 1]}
                          onClick={() => setbatch("5" + days[data - 1])}
                          scope="col"
                        >
                          {times[data - 1]}
                        </td>
                        <td
                          id={"6" + days[data - 1]}
                          onClick={() => setbatch("6" + days[data - 1])}
                          scope="col"
                        >
                          {times[data - 1]}
                        </td>
                        <td
                          id={"7" + days[data - 1]}
                          onClick={() => setbatch("7" + days[data - 1])}
                          scope="col"
                        >
                          {times[data - 1]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button type="submit" className="btn btn-primary">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// window.Onload = shownow();

export default Addstudent;
