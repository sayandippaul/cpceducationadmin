import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
// import "./showstudent.css";

function Showstudentfees() {
  const [students, setStudents] = useState([]);
  const [fees, setfees] = useState([]);

  useEffect(() => {
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

  function setpend(tid,oldcpcid){
    // alert(tid);
  
  var user1={cpcid:oldcpcid,tid:tid};
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
        setfees(data.feedetails)
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
      <div class="container pt-4 ">
        <div class="row g-4">
          <div class="col-12">
            <div class="bg-secondary rounded h-100 p-4">
              <h6 class="mb-4">Students Fees List</h6>
              {/* <input id="search-box" /> */}
              <form class="d-none d-md-flex ms-4">
                <input
                  class="form-control bg-dark border-0"
                  onChange={filterBySearch}
                  type="search"
                  placeholder="Search by name"
                />
              </form>

              <div class="table-responsive">
                <div id="accordion">
                  <div class="">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">ID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Course</th>
                          <th scope="col">Date of joining</th>
                          <th scope="col">Fees</th>
                          <th scope="col">Due MONTH</th>
                          <th scope="col">Details</th>
                        </tr>
                      </thead>
                      <tbody id="show">
                        {filteredList.map((data) => (
                          <>
                            <tr>
                              <th scope="row">2</th>
                              <td>{data.name}</td>
                              <td>{data.email}</td>
                              <td>{data.course}</td>
                              <td>{data.month}</td>
                              <td>456</td>
                              <td>Member</td>
                              <td>
                                <button
                                  class="btn btn-success  collapsed"
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
                                  class="collapse "
                                  data-parent="#accordion"
                                  id={data.email}
                                >
                                  {/* to get the result that you can see in the preview selection */}
                                  {
                                    // data.email

                                    <div class="container-xl px-4 mt-4">
                                      {/* <!-- Account page navigation--> */}

                                      {/* <!-- Breadcrumb --> */}

                                      <div class="row gutters-sm">
                                        <div class="col-md-4 mb-3">
                                          <div class="">
                                            <div class="card-body">
                                              <div class="d-flex flex-column align-items-center text-center">
                                                {/* <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" class="rounded-circle" width="150"> */}
                                                <div class="mt-3">
                                                  <h4>{data.name}</h4>
                                                  <p class="text-muted font-size-sm">
                                                    {data.course}
                                                  </p>
                                                  <button class="btn btn-primary mr-3">
                                                    Discontinue
                                                  </button>
                                                  <button class="btn btn-outline-primary ml-2">
                                                    Message
                                                  </button>
                                                </div>
                                                <div class="row">
                                                  <div class="col-sm-12">
                                                    {/* <a
                                                      class="btn btn-info mt-3"
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
                                        <div class="col-md-8">
                                          <div class=" mb-3">
                                            <div class="card-body">
                                              <div class="row">
                                                <div class="col-sm-3">
                                                  <h6 class="mb-0">
                                                    Full Name
                                                  </h6>
                                                </div>
                                                <div class="col-sm-9 ">
                                                  {data.name}
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div class="row">
                                                <div class="col-sm-3">
                                                  <h6 class="mb-0">Email</h6>
                                                </div>
                                                <div class="col-sm-9 ">
                                                  {data.email}
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div class="row">
                                                <div class="col-sm-3">
                                                  <h6 class="mb-0">Course</h6>
                                                </div>
                                                <div class="col-sm-9 ">
                                                  {data.course}
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div class="row">
                                                <div class="col-sm-3">
                                                  <h6 class="mb-0">Mobile</h6>
                                                </div>
                                                <div class="col-sm-9 ">
                                                  {data.phone}
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div class="row">
                                                <div class="col-sm-3">
                                                  <h6 class="mb-0">Address</h6>
                                                </div>
                                                <div class="col-sm-9 ">
                                                  {data.address}
                                                </div>
                                              </div>
                                              <hr></hr>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <hr class="mt-0 mb-4"></hr>
                                      <div class="row">
                                        <div class="col-lg-4 mb-4">
                                          {/* <!-- Billing card 1--> */}
                                          <div class=" h-100 border-start-lg border-start-primary">
                                            <div class="card-body">
                                              <div class="small text-muted">
                                                Current Fees
                                              </div>
                                              <div class="h3">{data.amount} </div>
                                              <a
                                                class="text-arrow-icon small"
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
                                                  class="feather feather-arrow-right"
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
                                        <div class="col-lg-4 mb-4">
                                          {/* <!-- Billing card 2--> */}
                                          <div class=" h-100 border-start-lg border-start-secondary">
                                            <div class="card-body">
                                              <div class="small text-muted">
                                                Next payment due
                                              </div>
                                              <div class="h3">July 15</div>
                                              <a
                                                class="text-arrow-icon small text-secondary"
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
                                                  class="feather feather-arrow-right"
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
                                        <div class="col-lg-4 mb-4">
                                          {/* <!-- Billing card 3--> */}
                                          <div class=" h-100 border-start-lg border-start-success">
                                            <div class="card-body">
                                              <div class="small text-muted">
                                                Total Months Due
                                              </div>
                                              <div class="h3  align-items-center">
                                                4
                                              </div>
                                              <a
                                                class="text-arrow-icon small text-success"
                                                href="#!"
                                              >
                                                Send Remainder
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
                                                  class="feather feather-arrow-right"
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
                                      </div>
                                      {/* <!-- Payment methods card--> */}

                                      {/* <!-- Billing history card--> */}
                                      <div class=" mb-4">
                                        <div class="card-header">
                                          Billing History
                                        </div>
                                        <div class="card-body p-0">
                                          {/* <!-- Billing history table--> */}
                                          <div class="table-responsive table-billing-history">
                                            <table class="table mb-0">
                                              <thead>
                                                <tr>
                                                  <th
                                                    class="border-gray-200"
                                                    scope="col"
                                                  >
                                                    Transaction ID
                                                  </th>
                                                  <th
                                                    class="border-gray-200"
                                                    scope="col"
                                                  >
                                                    Date
                                                  </th>
                                                  <th
                                                    class="border-gray-200"
                                                    scope="col"
                                                  >
                                                    Amount
                                                  </th>
                                                  <th
                                                    class="border-gray-200"
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
                                                  <td>06/15/2021</td>
                                                  <td >{e.fees}</td>
                                                  {/* <td onClick={() => checkstatus(e.status,e.transactionid)} id={e.transactionid}>                                                 
                                                  </td>
                                                   */}
                                                   <td>{e.status==0 ? <span class="badge bg-light text-dark" onClick={()=>setpend(e.transactionid,data.cpcid)}> Pending</span> : <span class="badge bg-success">Paid</span> }</td>
                             </tr>
                           </>
                        ))}
                      




                                               </tbody>
                                            </table>
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
