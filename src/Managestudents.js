import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
// import "./showstudent.css";
function Managestudents() {
  var [students, setStudents] = useState("");
  var [cpcid, setcpcid] = useState("");
  var [name, setname] = useState("");
  var [email, setemail] = useState("");
  var [phone, setphone] = useState("");
  var [course, setcourse] = useState("");
  var [password, setpass] = useState("");


function getcursor (oldcpcid){
      //  alert("hi: "+oldcpcid);
        document.getElementById('textbox').focus();
        const user = {cpcid: cpcid,name:name,email:email,course:course,password:password,phone:phone,name:name,oldcpcid:oldcpcid};
        console.log(user);
        
    fetch("http://localhost:3000/updatestudent", {
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
        })
        .catch(err => console.log(err));
  
    
}

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
        // body: JSON.stringify(user)
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
              <h6 class="mb-4">Manage Your Students</h6>
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
                          <th scope="col">Course</th>
                          <th scope="col">Details</th>
                        </tr>
                      </thead>
                      <tbody id="show">
                        {filteredList.map((data) => (
                          <>
                            <tr>
                              <th scope="row">2</th>
                              <td>{data.name}</td>
                              <td>{data.course}</td>
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
                                                  <h4 >{data.name}</h4>
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
                                                    <a
                                                      class="btn btn-info mt-3"
                                                    //   target="__blank"
                                                    //   href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                                                      onClick={()=>getcursor(data.cpcid)}
                                                    >
                                                      Update Profile
                                                    </a>
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
                                                  <h6 class="mb-0 mt-2">
                                                    Full Name
                                                  </h6>
                                                </div>
                                                <div class="col-sm-9">
                                                  <input class=" form-control"onChange={(e) => setname(e.target.value)} id="textbox" placeholder={data.name}/>

                                                  
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div class="row">
                                                <div class="col-sm-3">
                                                  <h6 class="mb-0">Cpcid</h6>
                                                </div>
                                                <div class="col-sm-9 ">
                                                  {/* {data.course} */}
                                                  <input class=" form-control"onChange={(e) => setcpcid(e.target.value)} id="textbox" placeholder={data.cpcid}/>

                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div class="row">
                                                <div class="col-sm-3">
                                                  <h6 class="mb-0">Course</h6>
                                                </div>
                                                <div class="col-sm-9 ">
                                                  {/* {data.course} */}
                                                  <input class=" form-control"onChange={(e) => setcourse(e.target.value)} id="textbox" placeholder={data.course}/>

                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div class="row">
                                                <div class="col-sm-3">
                                                  <h6 class="mb-0">Email</h6>
                                                </div>
                                                <div class="col-sm-9 ">
                                                  <input class=" form-control"onChange={(e) => setemail(e.target.value)} id="textbox" placeholder={data.email}/>

                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div class="row">
                                                <div class="col-sm-3">
                                                  <h6 class="mb-0">Course</h6>
                                                </div>
                                                <div class="col-sm-9 ">
                                                  {/* {data.course} */}
                                                  <input class=" form-control"onChange={(e) => setcourse(e.target.value)} id="textbox" placeholder={data.course}/>

                                                </div>
                                              </div>
                                              
                                              <hr></hr>
                                              <div class="row">
                                                <div class="col-sm-3">
                                                  <h6 class="mb-0">Mobile</h6>
                                                </div>
                                                <div class="col-sm-9 ">
                                                  {/* {data.phone} */}
                                                  <input class=" form-control"onChange={(e) => setphone(e.target.value)} id="textbox" placeholder={data.phone}/>

                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div class="row">
                                                <div class="col-sm-3">
                                                  <h6 class="mb-0">Address</h6>
                                                </div>
                                                <div class="col-sm-9 ">
                                                  {/* {data.address} */}
                                                  <input class=" form-control"onChange={(e) => setpass(e.target.value)} id="textbox" placeholder={data.password}/>

                                                </div>
                                              </div>
                                              <hr></hr>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <hr class="mt-0 mb-4"></hr>
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

export default Managestudents;
