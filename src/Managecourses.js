import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";

// import "./showstudent.css";
function Managecourses() {
  var [courses, setcourses] = useState("");
  var [studentbatch, setdata] = useState([]);

  var [courseid, setcourseid] = useState("");
  var [name, setname] = useState("");
  var [title, settitle] = useState("");
  var [fees, setfees] = useState("");
  var [desc, setdesc] = useState("");
  //   var [password, setpass] = useState("");

  function click1(cpc) {
    // document.getElementById("1a").setAttribute("id", "democlass");
    // alert(bat);

    // console.log(cpc);
    setTimeout(() => {
      // console.log('Hello, World!')

      document.getElementById("textbox" + cpc).focus();
    }, 50);
  }
  function deletecourse(cid) {
    //Runs only on the first render

    if (window.confirm("Are you sure to discontinue the course") == true) {
      // text = "You pressed OK!";
      // alert("hit");
      var ds = { courseid: cid };
      fetch("http://localhost:3000/deletecourse", {
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
      alert("course not deleted");
    }
    window.location.reload();

    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
  }

  function getcursor(oldcpcid) {
    document.getElementById("update" + oldcpcid).className =
      "btn btn-success mt-3";
    document.getElementById("update" + oldcpcid).innerHTML = "Course updated";

    setTimeout(() => {
      // console.log('Hello, World!')
      document.getElementById("update" + oldcpcid).className =
        "btn btn-info mt-3";
      document.getElementById("update" + oldcpcid).innerHTML = "update again";
    }, 5000);

    //  alert("hi: "+oldcpcid);
    const user = {
        courseid: courseid,
        coursename: name,
        coursetitle: title,
        coursefees: fees,
        coursedescription: desc,
      //   phone: phone,
      //   name: name,
      //   batch: batch1,
        oldcourseid: oldcpcid,
    };
    console.log(user);

    fetch("http://localhost:3000/updatecourse", {
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

    fetch("http://localhost:3000/showcourses", {
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
        setcourses(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [filteredList, setFilteredList] = new useState([]);
  // const [students, setStudents] =

  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    var updatedList = [...courses];
    // Include all elements which includes the search query
    updatedList = updatedList.filter((item) => {
      return item.coursename.toLowerCase().indexOf(query.toLowerCase()) !== -1;
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
              <h6 className="mb-4">Manage Your Courses</h6>
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
                          <th scope="col">CourseID</th>
                          <th scope="col">Name</th>
                          <th scope="col">Title</th>
                          <th scope="col">Details</th>
                        </tr>
                      </thead>
                      <tbody id="show">
                        {filteredList.map((data) => (
                          <>
                            <tr>
                              <th scope="row">{data.courseid}</th>
                              <td>{data.coursename}</td>
                              <td>{data.coursetitle}</td>
                              <td>
                                <button
                                  className="btn btn-success  collapsed"
                                  type="button"
                                  data-toggle="collapse"
                                  data-target={"#" + data.courseid}
                                  aria-expanded="false"
                                  aria-controls="collapseExample"
                                  onClick={() => click1(data.courseid)}
                                >
                                  About Course
                                </button>
                              </td>
                            </tr>

                            <tr>
                              <td colSpan="8">
                                <div
                                  className="collapse "
                                  data-parent="#accordion"
                                  id={data.courseid}
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
                                                  <h4>{data.coursename}</h4>
                                                  <p className="text-muted font-size-sm">
                                                    {data.courseid}
                                                  </p>

                                                  <p className="text-muted font-size-sm">
                                                    {data.coursefees}
                                                  </p>
                                                  <button
                                                    className="btn btn-primary mr-3"
                                                    onClick={() =>
                                                      deletecourse(
                                                        data.courseid
                                                      )
                                                    }
                                                  >
                                                    Delete Course
                                                  </button>
                                                  <div id="desc">
                                                    <button
                                                      className="btn btn-success  collapsed my-4"
                                                      type="button"
                                                      data-toggle="collapse"
                                                      data-target={
                                                        "#details" +
                                                        data.courseid
                                                      }
                                                      aria-expanded="false"
                                                      aria-controls="collapseExample"
                                                    >
                                                      Course Description
                                                    </button>
                                                  </div>
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
                                                    onChange={(e) =>
                                                      setname(e.target.value)
                                                    }
                                                    id={
                                                      "textbox" + data.courseid
                                                    }
                                                    placeholder={
                                                      data.coursename
                                                    }
                                                  />
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">
                                                    CourseID
                                                  </h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  {/* {data.course} */}
                                                  <input
                                                    className=" form-control"
                                                    onChange={(e) =>
                                                      setcourseid(
                                                        e.target.value
                                                      )
                                                    }
                                                    id="textbox"
                                                    placeholder={data.courseid}
                                                  />
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">
                                                    Title
                                                  </h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  {/* {data.course} */}
                                                  <input
                                                    className=" form-control"
                                                    onChange={(e) =>
                                                      settitle(e.target.value)
                                                    }
                                                    id="textbox"
                                                    placeholder={
                                                      data.coursetitle
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
                                                    // onChange={(e) =>
                                                    //   setemail(e.target.value)
                                                    // }
                                                    id="textbox"
                                                    placeholder={
                                                      data.coursecatagory
                                                    }
                                                  />
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">Fees</h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  <input
                                                    className=" form-control"
                                                    onChange={(e) =>
                                                      setfees(e.target.value)
                                                    }
                                                    id="textbox"
                                                    placeholder={
                                                      data.coursefees
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
                                      <div
                                        className="collapse "
                                        data-parent="#desc"
                                        id={"details" + data.courseid}
                                      >
                                          <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">Course Description</h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  <input
                                                    className=" form-control"
                                                    id="textbox"
                                                    onChange={(e) =>
                                                        setdesc(e.target.value)
                                                      }
                                                     
                                                    placeholder=
                                        {data.coursedescription}
                                                  />
                                                </div>
                                              </div>

                                      </div>

                                      <div className="col-sm-12">
                                            <a
                                              id={"update" + data.courseid}
                                              className="btn btn-info mt-1"
                                              //   target="__blank"
                                              //   href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                                              onClick={() =>
                                                getcursor(data.courseid)
                                              }
                                            >
                                              Update Course
                                            </a>
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

export default Managecourses;
