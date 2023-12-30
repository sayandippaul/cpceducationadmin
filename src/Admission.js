import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import { url } from './url.js';

// import "./showstudent.css";
function Admission() {
  var [admissions, setadmission] = useState("");
  var [studentbatch, setdata] = useState([]);

  var [courseid, setcourseid] = useState("");
  var [name, setname] = useState("");
  var [title, settitle] = useState("");
  var [fees, setfees] = useState("");
  var [desc, setdesc] = useState("");
  //   var [password, setpass] = useState("");

  function approve(name,email,phone,cid,cname,ccata,cfees) {
    var  approvedetails = { studentname: name, email: email, phone: phone,courseid:cid,coursename:cname,coursecatagory:ccata,coursefees:cfees };
    var approvestring=JSON.stringify(approvedetails);
    localStorage.setItem("admissiondetails",approvestring);
    window.location.replace("http://localhost:3002/Addstudent");

    
  }
  
  function deletecourse(cid,name) {
    //Runs only on the first render

    if (window.confirm("Are you sure to reject this admission?") == true) {
      // text = "You pressed OK!";
      // alert("hit");
      var ds = { email: cid,name:name };
      fetch(url+"/rejectadmission", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(ds),
      })
        .then((res) => res.json())
        .then((data) => {})
        .catch((err) => console.log(err));
    } else {
      // text = "You canceled!";
      alert("student can not be rejected");
    }
    window.location.reload();

    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
  }

  const dataFetchedRef = useRef(false);

  useEffect(() => {
    //Runs only on the first render

    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    fetch(url+"/showadmission", {
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
        // console.log(data);

        setFilteredList(data);
        setadmission(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [filteredList, setFilteredList] = new useState([]);
  // const [students, setStudents] =

  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    var updatedList = [...admissions];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.studentname.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    // Trigger render with updated values
    setFilteredList(updatedList);
  };

  return (
    <div>
      <div className="container pt-4 ">
        <div className="row g-4">
          <div className="col-12">
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">New Admission</h6>
              {/* <input id="search-box" /> */}
              <form className="d-none d-md-flex ms-4">
                <input
                  className="form-control bg-dark border-0"
                  onChange={filterBySearch}
                  type="search"
                  placeholder="Search by name"
                />
              </form>

              <div className="table-responsive">
                <div id="accordion">
                  <div className="">
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Course</th>
                          <th scope="col">Name</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Email</th>
                          <th scope="col">Options</th>
                        </tr>
                      </thead>
                      <tbody id="show">
                        {filteredList.map((data) => (
                          <>
                            <tr>
                              <th scope="row">{data.coursename}</th>
                              <td>{data.studentname}</td>
                              <td>{data.phone}</td>
                              <td>{data.email}</td>
                              <td>
                                <button
                                  className="btn btn-success  collapsed"
                                  type="button"
                                  data-toggle="collapse"
                                  data-target={"#" + data.email}
                                  aria-expanded="false"
                                  aria-controls="collapseExample"
                                >
                                  Details Here
                                </button>
                              </td>
                            </tr>

                            <tr>
                              <td colSpan="8">
                                <div
                                  className="collapse "
                                  data-parent="#accordion"
                                  id={data.email}
                                >
                                  {/* to get the result that you can see in the preview selection */}
                                  {
                                    // data.email

                                    <div className="container-xl px-4 mt-4">
                                      {/* <!-- Account page navigation--> */}

                                      {/* <!-- Breadcrumb --> */}

                                      <div className="row gutters-sm">
                                        <div className="col-md-4 mb-3">
                                          <div className="">
                                            <div className="card-body">
                                              <div className="d-flex flex-column align-items-center text-center">
                                                {/* <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"> */}
                                                <div className="mt-3">
                                                  <h4>{data.studentname}</h4>
                                                  <p className="text-muted font-size-sm">
                                                    {data.coursename}
                                                  </p>

                                                  <p className="text-muted font-size-sm">
                                                    {data.coursefees}
                                                  </p>
                                                  <button
                                                    className="btn btn-primary mr-3"
                                                    onClick={() =>
                                                      deletecourse(
                                                        data.email,data.studentname
                                                      )
                                                    }
                                                  >
                                                    Reject
                                                  </button>  <button
                                                    className="btn btn-success mr-3 bg-success"
                                                    onClick={() =>
                                                      approve(
                                                        data.studentname,data.email,data.phone,data.courseid,data.coursename,data.coursecatagory,data.coursefees
                                                      )
                                                    }
                                                  >
                                                    Approve
                                                  </button>
                                                 
                                                  
                                                </div>
                                                <div className="row"></div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-8">
                                          <div className=" mb-3">
                                            <div className="card-body">
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0 mt-2">
                                                    Course Name
                                                  </h6>
                                                </div>
                                                <div className="col-sm-9">
                                                  <input
                                                    className=" form-control"
                                                    value={
                                                      data.coursename
                                                    }
                                                  />
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">
                                                    Student Name
                                                  </h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  {/* {data.course} */}
                                                  <input
                                                    className=" form-control"
                                                    id="textbox"
                                                    value={data.studentname}
                                                  />
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">
                                                    Phone Number
                                                  </h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  {/* {data.course} */}
                                                  <input
                                                    className=" form-control"
                                                    id="textbox"
                                                    value={
                                                      data.phone
                                                    }
                                                  />
                                                </div>
                                              </div>
                                              <hr></hr><div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">
                                                    Email
                                                </h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  {/* {data.course} */}
                                                  <input
                                                    className=" form-control"
                                                    id="textbox"
                                                    value={
                                                      data.email
                                                    }
                                                  />
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">
                                                    Fees
                                                  </h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  {/* {data.course} */}
                                                  <input
                                                    className=" form-control"
                                                    id="textbox"
                                                    value={
                                                      data.coursefees
                                                    }
                                                  />
                                                </div>
                                              </div>
                                              <hr></hr>
                                              
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">
                                                    Catagory
                                                  </h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  <input
                                                    className=" form-control"
                                                    id="textbox"
                                                    value={
                                                      data.coursecatagory
                                                    }
                                                  />
                                                </div>
                                              </div>
                                              <hr></hr>
                                              
                                            </div>
                                          </div>
                                                                                  </div>
                                      </div>

                                      <hr className="mt-0 mb-4"></hr>
                                      
                                      
                                    </div>
                                  }
                                </div>
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admission;
