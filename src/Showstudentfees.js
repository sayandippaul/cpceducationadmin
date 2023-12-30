import ReactDOM from "react-dom";
// import { useState, useEffect } from "react";
import { useState, useEffect, useRef } from "react";

// import "./showstudent.css";

function Showstudentfees() {




  

  const [students, setStudents] = useState([]);
  const [fees, setfees] = useState([]);
  var d = new Date();

  var curmonth = d.getMonth();
  var curyear  = d.getFullYear();

var montharr=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  function deletestudent(cid,name,email) {
    //Runs only on the first render

  
  if (window.confirm("Are you sure to discontinue the student") == true) {
    // text = "You pressed OK!";
  // alert("hit");
  var ds = { cpcid: cid,name:name,email:email };
  fetch("http://localhost:3000/deletestudent", {
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
    .then((data) => {

    })
    .catch((err) => console.log(err));
  } else {
    // text = "You canceled!";
    alert("student not deleted");
  }
  window.location.reload();
  
  
  
}

  function updatefees(f,name,cpcid){




    let feesnew = prompt("Please enter New fees",f );
    var fees1={cpcid:cpcid,amount:feesnew};
    fetch("http://localhost:3000/updatefees", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(fees1)
    })
      .then(res => res.json())
      .then(data => {
  console.log(data);
        // window.location.replace("login.js");
        // alert("success");
        if(data!=0){
          alert("Fees updated ");
          window.location.reload();
          
        }
        // console.log(fees);
        
      })
    
      .catch(err => console.log(err));
  
  

  }
  const dataFetchedRef = useRef(false);

  useEffect(() => {


    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;


    fetch("http://localhost:3000/addfeeseverymonth", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((data) => {
  
        })
        .catch((err) => console.log(err));


    //Runs only on the first render
    
    fetch("http://localhost:3000/showstudentfees", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Origin": "*",
      },
      //   body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data[0].feedetailstransactionid);

        setFilteredList(data);
        setStudents(data);
        
      })
      .catch((err) => console.log(err));
  }, []);
   
  
  const [filteredList, setFilteredList] = new useState([]);
  // const [students, setStudents] =

  function setpend(tid,oldcpcid,email){
    // alert(tid);
  
  var user1={cpcid:oldcpcid,tid:tid,email:email};
    fetch("http://localhost:3000/updatepend", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(user1)
    })
      .then(res => res.json())
      .then(data => {
  console.log(data);
        // window.location.replace("login.js");
        // alert("success");
        if(data!=0){
          alert("Fees updated for date  "+data.month+"  of student  "+data.name);
          document.getElementById("showfeesofpend"+oldcpcid+tid).className="badge bg-success";
          document.getElementById("showfeesofpend"+oldcpcid+tid).innerHTML="paid now";
          document.getElementById("showdateofpend"+oldcpcid+tid).innerHTML=data.month;

        }
        // console.log(fees);
        
      })
    
      .catch(err => console.log(err));
  
    // const user = {oldcpcid:oldcpcid,feedetails:};
    //         console.log(user);
  
    //         var studentbatch=[];
    //     fetch("http://localhost:3000/updatestudent", {
    //         method: "POST",
    //         headers: {
    //           Accept: "application/json",
    //           "Content-Type": "application/json",
    //           "Access-Control-Allow-Headers": "Content-Type",
    //           "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    //           "Access-Control-Allow-Origin": "*"
    //         },
    //         body: JSON.stringify(user)
    //       })
    //       .then(res => res.json())
    //         .then(data => {
    //         })
    //         .catch(err => console.log(err));
      
  }
  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    var updatedList = [...students];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
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
              <h6 className="mb-4">Students Fees List</h6>
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
                          <th scope="col">ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Course</th>
                          <th scope="col">Date of joining</th>
                          <th scope="col">Fees</th>
                          {/* <th scope="col">Due MONTH</th> */}
                          <th scope="col">Details</th>
                        </tr>
                      </thead>
                      <tbody id="show">
                        {filteredList.map((data) => (
                          <>
                            <tr>
                              <th scope="row">{data.cpcid}</th>
                              <td>{data.name}</td>
                              <td>{data.phone}</td>
                              <td>{data.course}</td>
                              <td>{data.createdAt.slice(0,10)}</td>
                              <td>{data.amount}</td>
                              {/* <td>Month due</td> */}
                              <td>
                                <button
                                  className="btn btn-success  collapsed"
                                  type="button"
                                  data-toggle="collapse"
                                  data-target={"#" + data.email}
                                  aria-expanded="false"
                                  aria-controls="collapseExample"
                                  //   onClick={(e)=>click1(data.email)}
                                >
                                  view profile
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
                                                  <h4>{data.name}</h4>
                                                  <p className="text-muted font-size-sm">
                                                    {data.course}
                                                  </p>
                                                  <p className="text-muted font-size-sm">
                                                    {data.cpcid}
                                                  </p>
                                                  
                                                  <button 
                                                  onClick={() =>
                                                    deletestudent(
                                                      data.cpcid,data.name,data.email
                                                    )
                                                  } className="btn btn-primary mr-3">
                                                    Discontinue
                                                  </button>
                                                 </div>
                                                <div className="row">
                                                  <div className="col-sm-12">
                                                    {/* <a
                                                      className="btn btn-info mt-3"
                                                      target="__blank"
                                                      href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                                                    >
                                                      
                                                    </a> */}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-8">
                                          <div className=" mb-3">
                                            <div className="card-body">
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">
                                                    Full Name
                                                  </h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  {data.name}
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">Email</h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  {data.email}
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">Course</h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  {data.course}
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">Mobile</h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  {data.phone}
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">Address</h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  {data.address}
                                                </div>
                                              </div>
                                              <hr></hr>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <hr className="mt-0 mb-4"></hr>
                                      <div className="row">
                                        <div className="col-lg-4 mb-4">
                                          {/* <!-- Billing card 1--> */}
                                          <div className=" h-100 border-start-lg border-start-primary">
                                            <div className="card-body">
                                              <div className="small text-muted">
                                                Current Fees
                                              </div>
                                              <div className="h3">{data.amount} </div>
                                              <a 
                                              onClick={()=>updatefees(data.amount,data.name,data.cpcid)}
                                                className="text-arrow-icon small"
                                                href="#!"
                                              >
                                                Update Fees
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="24"
                                                  height="24"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  stroke-width="2"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  className="feather feather-arrow-right"
                                                >
                                                  <line
                                                    x1="5"
                                                    y1="12"
                                                    x2="19"
                                                    y2="12"
                                                  ></line>
                                                  <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-4 mb-4">
                                          {/* <!-- Billing card 2--> */}
                                          <div className=" h-100 border-start-lg border-start-secondary">
                                            <div className="card-body">
                                              <div className="small text-muted">
                                                Student Status
                                              </div>
                                              <div className="h3">Active</div>
                                              <a
                                                className="text-arrow-icon small text-secondary"
                                                href="#!"
                                              >
                                                View payment history
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="24"
                                                  height="24"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  stroke-width="2"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  className="feather feather-arrow-right"
                                                >
                                                  <line
                                                    x1="5"
                                                    y1="12"
                                                    x2="19"
                                                    y2="12"
                                                  ></line>
                                                  <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg>
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-lg-4 mb-4">
                                          {/* <!-- Billing card 3--> */}
                                          <div className=" h-100 border-start-lg border-start-success">
                                            <div className="card-body">
                                              <div className="small text-muted">
                                                Current Month-Year
                                              </div>
                                              <div className="h3  align-items-center">
                                              {montharr[curmonth]+"-"+curyear}
                                              </div>
                                              <a
                                                className="text-arrow-icon small text-success"
                                                href="#!"
                                              >
                                                {/* Send Remainder */}
                                                {/* <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="24"
                                                  height="24"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                  stroke="currentColor"
                                                  stroke-width="2"
                                                  stroke-linecap="round"
                                                  stroke-linejoin="round"
                                                  className="feather feather-arrow-right"
                                                >
                                                  <line
                                                    x1="5"
                                                    y1="12"
                                                    x2="19"
                                                    y2="12"
                                                  ></line>
                                                  <polyline points="12 5 19 12 12 19"></polyline>
                                                </svg> */}
                                              </a>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* <!-- Payment methods card--> */}

                                      {/* <!-- Billing history card--> */}
                                      <div className=" mb-4">
                                        <div className="card-header">
                                          Billing History
                                        </div>
                                        <div className="card-body p-0">
                                          {/* <!-- Billing history table--> */}
                                          <div className="table-responsive table-billing-history">
                                            <table className="table mb-0">
                                              <thead>
                                                <tr>
                                                  <th
                                                    className="border-gray-200"
                                                    scope="col"
                                                  >
                                                    Transaction ID
                                                  </th>
                                                  <th
                                                    className="border-gray-200"
                                                    scope="col"
                                                  >
                                                    Date
                                                  </th>
                                                  <th
                                                    className="border-gray-200"
                                                    scope="col"
                                                  >
                                                    Amount
                                                  </th>
                                                  <th
                                                    className="border-gray-200"
                                                    scope="col"
                                                  >
                                                    Status
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>



                                              {data.feedetails.map((e) => (
                          <>
                            <tr>
                              
                                                  <td>{e.transactionid}</td>
                                                  <td id={"showdateofpend"+data.cpcid+e.transactionid}>{e.date}</td>
                                                  <td >{e.fees}</td>
                                                  {/* <td onClick={() => checkstatus(e.status,e.transactionid)} id={e.transactionid}>                                                 
                                                  </td>
                                                   */}
                                                   <td ><span id={"showfeesofpend"+data.cpcid+e.transactionid}> {e.status==0 ? <span  className="badge bg-light text-dark" onClick={()=>setpend(e.transactionid,data.cpcid,data.email)}> Pending</span> : <span className="badge bg-success">Paid</span> }</span></td>
                             </tr>
                           </>
                        ))}
                      




                                               </tbody>
                                            </table>
                                            
                    <br></br>
                    <br></br>
                    <br></br>
                    <hr></hr>
                    <hr></hr>
                    <br></br>
                                          </div>
                                        </div>
                                      </div>
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

export default Showstudentfees;
