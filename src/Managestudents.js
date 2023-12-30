import ReactDOM from "react-dom";
import { useState, useEffect,useRef } from "react";
import { url } from './url.js';

// import "./showstudent.css";
function Managestudents() {
  var [students, setStudents] = useState("");
  var [studentbatch, setdata] = useState([]);

  var [cpcid, setcpcid] = useState("");
  var [name, setname] = useState("");
  var [email, setemail] = useState("");
  var [phone, setphone] = useState("");
  var [course, setcourse] = useState("");
  var [password, setpass] = useState("");
  var day = [1, 2, 3, 4, 5, 6, 7];
  var days = ["a", "b", "c", "d", "e", "f", "g"];
  var times = [
    "7:00-9:00AM",
    "9:00-12:00PM",
    "12:00-2:00PM",
    "2:00-4:00PM",
    "4:00-6:00PM",
    "6:00-8:00PM",
    "8:00-10:00PM",
  ];
  var batch1 = [];
  const setbatch = (e, p, batch) => {
    // e.preventDefault();
    // console.log(e);
    if (batch.includes(e) == false) {
      batch.push(e);
      document.getElementById(e + p).className = "text-success bg-white";
    } else {
      var index = batch.indexOf(e);
      console.log(index);
      batch.splice(index, 1);
      document.getElementById(e + p).className = "";
    }
    console.log(batch);
    batch1 = batch;
  };
  function click1(bat, cpc) {
    // document.getElementById("1a").setAttribute("id", "democlass");
    // alert(bat);

    for (var i = 0; i < bat.length; i++) {
      console.log(bat[0] + cpc);
      // var s1=bat[i][0];
      // var s2=bat[i][1];
      // var s3=keys.indexOf(s2);
      // console.log(s2+" "+s3);
      // //  showbatch=showbatch+days[s1-1]+" : "+times[s3]+"<hr/>"
      // document.getElementById(bat[i]).className="bg-white text-success";
      document.getElementById(bat[i] + cpc).className = "bg-white text-success";

      //       console.log(bat[i]);
      // document.getElementById().className = "";
      // document.getElementById
    }
    // console.log(cpc);
    setTimeout(() => {
      // console.log('Hello, World!')

      document.getElementById("textbox" + cpc).focus();
    }, 50);
  }
  function deletestudent(cid,name,email) {
      //Runs only on the first render
  
    
    if (window.confirm("Are you sure to discontinue the student") == true) {
      // text = "You pressed OK!";
    // alert("hit");
    var ds = { cpcid: cid,name:name,email:email };
    fetch(url+"/deletestudent", {
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
    
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    
  }

  function getcursor(oldcpcid) {
    document.getElementById("update" + oldcpcid).className =
      "btn btn-success mt-3";
    document.getElementById("update" + oldcpcid).innerHTML = "profile updated";

    setTimeout(() => {
      // console.log('Hello, World!')
      document.getElementById("update" + oldcpcid).className =
        "btn btn-info mt-3";
      document.getElementById("update" + oldcpcid).innerHTML = "update again";
    }, 5000);

    //  alert("hi: "+oldcpcid);
    const user = {
      cpcid: cpcid,
      name: name,
      email: email,
      course: course,
      password: password,
      phone: phone,
      name: name,
      batch: batch1,
      oldcpcid: oldcpcid,
    };
    console.log(user);

    fetch(url+"/updatestudent", {
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
      .then((data) => {})
      .catch((err) => console.log(err));
  }
const dataFetchedRef = useRef(false);


  useEffect(() => {
    //Runs only on the first render

        if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
    

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
      <div className="container pt-4 ">
        <div className="row g-4">
          <div className="col-12">
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Manage Your Students</h6>
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
                          <th scope="col">Course</th>
                          <th scope="col">Details</th>
                        </tr>
                      </thead>
                      <tbody id="show">
                        {filteredList.map((data) => (
                          <>
                            <tr>
                              <th scope="row">{data.cpcid}</th>
                              <td>{data.name}</td>
                              <td>{data.course}</td>
                              <td>
                                <button
                                  className="btn btn-success  collapsed"
                                  type="button"
                                  data-toggle="collapse"
                                  data-target={"#" + data.email}
                                  aria-expanded="false"
                                  aria-controls="collapseExample"
                                  onClick={() => click1(data.batch, data.cpcid)}
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
                                                    {data.cpcid}
                                                  </p>
                                                 
                                                  <p className="text-muted font-size-sm">
                                                    {data.course}
                                                  </p>
                                                  <button
                                                    className="btn btn-primary mr-3"
                                                    onClick={() =>
                                                      deletestudent(
                                                        data.cpcid,data.name,data.email
                                                      )
                                                    }
                                                  >
                                                    Discontinue
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
                                                    Full Name
                                                  </h6>
                                                </div>
                                                <div className="col-sm-9">
                                                  <input
                                                    className=" form-control"
                                                    onChange={(e) =>
                                                      setname(e.target.value)
                                                    }
                                                    id={"textbox" + data.cpcid}
                                                    placeholder={data.name}
                                                  />
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">
                                                    Cpcid
                                                  </h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  {/* {data.course} */}
                                                  <input
                                                    className=" form-control"
                                                    onChange={(e) =>
                                                      setcpcid(e.target.value)
                                                    }
                                                    id="textbox"
                                                    placeholder={data.cpcid}
                                                  />
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">
                                                    Course
                                                  </h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  {/* {data.course} */}
                                                  <input
                                                    className=" form-control"
                                                    onChange={(e) =>
                                                      setcourse(e.target.value)
                                                    }
                                                    id="textbox"
                                                    placeholder={data.course}
                                                  />
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">
                                                    Email
                                                  </h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  <input
                                                    className=" form-control"
                                                    onChange={(e) =>
                                                      setemail(e.target.value)
                                                    }
                                                    id="textbox"
                                                    placeholder={data.email}
                                                  />
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">
                                                    Course
                                                  </h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  {/* {data.course} */}
                                                  <input
                                                    className=" form-control"
                                                    onChange={(e) =>
                                                      setcourse(e.target.value)
                                                    }
                                                    id="textbox"
                                                    placeholder={data.course}
                                                  />
                                                </div>
                                              </div>

                                              <hr></hr>
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">
                                                    Mobile
                                                  </h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  {/* {data.phone} */}
                                                  <input
                                                    className=" form-control"
                                                    onChange={(e) =>
                                                      setphone(e.target.value)
                                                    }
                                                    id="textbox"
                                                    placeholder={data.phone}
                                                  />
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">
                                                    Password
                                                  </h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  {/* {data.address} */}
                                                  <input
                                                    className=" form-control"
                                                    onChange={(e) =>
                                                      setpass(e.target.value)
                                                    }
                                                    id="textbox"
                                                    placeholder={data.password}
                                                  />
                                                </div>
                                              </div>

                                              <hr></hr>
                                            </div>
                                          </div>
                                          <div className="col-sm-12">
                                            <a
                                              id={"update" + data.cpcid}
                                              className="btn btn-info mt-1"
                                              //   target="__blank"
                                              //   href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                                              onClick={() =>
                                                getcursor(data.cpcid)
                                              }
                                            >
                                              Update Profile
                                            </a>
                                          </div>

                                          <table className="mt-3">
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
                                            <tbody>
                                              {day.map((data1) => (
                                                // <div>

                                                // </div>
                                                <tr>
                                                  <td
                                                    id={
                                                      "1" +
                                                      days[data1 - 1] +
                                                      data.cpcid
                                                    }
                                                    onClick={() =>
                                                      setbatch(
                                                        "1" + days[data1 - 1],
                                                        data.cpcid,
                                                        data.batch
                                                      )
                                                    }
                                                    scope="col"
                                                  >
                                                    {times[data1 - 1]}
                                                  </td>
                                                  <td
                                                    id={
                                                      "2" +
                                                      days[data1 - 1] +
                                                      data.cpcid
                                                    }
                                                    onClick={() =>
                                                      setbatch(
                                                        "2" + days[data1 - 1],
                                                        data.cpcid,
                                                        data.batch
                                                      )
                                                    }
                                                    scope="col"
                                                  >
                                                    {times[data1 - 1]}
                                                  </td>
                                                  <td
                                                    id={
                                                      "3" +
                                                      days[data1 - 1] +
                                                      data.cpcid
                                                    }
                                                    onClick={() =>
                                                      setbatch(
                                                        "3" + days[data1 - 1],
                                                        data.cpcid,
                                                        data.batch
                                                      )
                                                    }
                                                    scope="col"
                                                  >
                                                    {times[data1 - 1]}
                                                  </td>
                                                  <td
                                                    id={
                                                      "4" +
                                                      days[data1 - 1] +
                                                      data.cpcid
                                                    }
                                                    onClick={() =>
                                                      setbatch(
                                                        "4" + days[data1 - 1],
                                                        data.cpcid,
                                                        data.batch
                                                      )
                                                    }
                                                    scope="col"
                                                  >
                                                    {times[data1 - 1]}
                                                  </td>
                                                  <td
                                                    id={
                                                      "5" +
                                                      days[data1 - 1] +
                                                      data.cpcid
                                                    }
                                                    onClick={() =>
                                                      setbatch(
                                                        "5" + days[data1 - 1],
                                                        data.cpcid,
                                                        data.batch
                                                      )
                                                    }
                                                    scope="col"
                                                  >
                                                    {times[data1 - 1]}
                                                  </td>
                                                  <td
                                                    id={
                                                      "6" +
                                                      days[data1 - 1] +
                                                      data.cpcid
                                                    }
                                                    onClick={() =>
                                                      setbatch(
                                                        "6" + days[data1 - 1],
                                                        data.cpcid,
                                                        data.batch
                                                      )
                                                    }
                                                    scope="col"
                                                  >
                                                    {times[data1 - 1]}
                                                  </td>
                                                  <td
                                                    id={
                                                      "7" +
                                                      days[data1 - 1] +
                                                      data.cpcid
                                                    }
                                                    onClick={() =>
                                                      setbatch(
                                                        "7" + days[data1 - 1],
                                                        data.cpcid,
                                                        data.batch
                                                      )
                                                    }
                                                    scope="col"
                                                  >
                                                    {times[data1 - 1]}
                                                  </td>
                                                </tr>
                                              ))}
                                            </tbody>
                                          </table>
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

export default Managestudents;
