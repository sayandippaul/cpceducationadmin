import Button from "react-bootstrap/Button";
import Placeholder from "react-bootstrap/Placeholder";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect, useRef } from "react";

function Addcourse() {
  var lastcpcid=localStorage.getItem("lastcourseid");
  var lastno=parseInt( lastcpcid.slice(4,lastcpcid.length))+1;

  const dataFetchedRef = useRef(false);
 
  useEffect((async) => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

  }, []);
    const [name, setname] = useState("");
    const [desc, setdesc] = useState("");
    const [ctitle, settitle] = useState("");
    const [fees, setfees] = useState("");


  const clickme = (e) => {
    var courseid=document.getElementById("coid").value;
    var catavalue=document.getElementById("catavalue").value;

    e.preventDefault();
 
    const course = {
      coursename: name,
      coursedesc: desc,
       coursetitle: ctitle,
       coursecatagory:catavalue,
       coursefees:fees,
         courseid:courseid
    };
    console.log(course);
    // var  text = { username: name, email: email, month: month,amount:amount,batch:batch };
  
    fetch("http://localhost:3000/Addcourse", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(course),
    })
      .then((res) => res.json())
      .then((data) => {
        // window.location.replace("login.js");
        // alert(data);
        if (data != 0) {
          alert("Course Added");
        } else {
          alert("course already exist");
        }
        // alert("success");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="container-fluid pt-4 px-4 ">
        <div className="">
          <div className="">
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Courses Registration</h6>
              <form onSubmit={clickme}>
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Course Id{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="coid"
                    value={"#cid"+lastno}
                    aria-describedby="emailHelp"
                  />
                  {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.
                  </div> */}
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                   Course Name
                  </label>
                  <input
                    onChange={(e) => setname(e.target.value)}
                    type="text"
                    className="form-control"
                    id="exampleInputText1"
                    required

                  />
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                   Course Title
                  </label>
                  <input
                    onChange={(e) => settitle(e.target.value)}
                    type="text"
                    className="form-control"
                    id="exampleInputText1"
                    required
                  />
                </div>

                <div class="bg-secondary rounded h-100 p-4">
                  <label for="exampleInputPassword1" className="form-label">
                  Choose Subject Catagory
                  </label>
                        <select class="form-select form-select-lg mb-3" id="catavalue"
                                    aria-label=".form-select-lg example">
                                                <option id="1" value="basic">Basic</option>
                                                <option id="2" value="designing">Designing</option>
                                                <option id="3" value="programming">Programming</option>
                                                <option id="4" value="database">Database</option>

                    
                        </select>
                        
                      
                    </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">
                   Course Fees
                  </label>
                  <input
                    onChange={(e) => setfees(e.target.value)}
                    type="number"
                    className="form-control"
                    id="exampleInputText1"
                    required

                  />
                </div>
                <div className="mb-2">
                  <label for="exampleInputPassword1" className="form-label">
                    Course description
                  </label>
                  <input
                    onChange={(e) => setdesc(e.target.value)}
                    type="description"
                    className="form-control"
                    id="exampleInputText1"
                    required

                  />
                </div>

                

               

                <button type="submit" className="btn btn-primary">
                  Add Course
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

export default Addcourse;
