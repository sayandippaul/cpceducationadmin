import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import { url } from './url.js';

// import "./showstudent.css";
function Feedback() {
  var [questions, setquestion] = useState("");
  var [mes, setmes] = useState("");
  //   var [password, setpass] = useState("");

  function deletecourse(cid) {
    //Runs only on the first render

    if (window.confirm("Are you sure to discontinue the course") == true) {
      // text = "You pressed OK!";
      // alert("hit");
      var ds = { courseid: cid };
      fetch(url+"/deletecourse", {
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
  function getcursor(qid,name,email) {
    document.getElementById("update" + qid).className =
      "btn btn-success mt-3";
    document.getElementById("update" + qid).innerHTML = "Reply Sent";

    setTimeout(() => {
      // console.log('Hello, World!')
      document.getElementById("update" + qid).className =
        "btn btn-info mt-3";
      document.getElementById("update" + qid).innerHTML = "Send Reply Again";
    }, 5000);

    //  alert("hi: "+oldcpcid);
    const user = {
        qid: qid,
        name: name,
        email: email,
        message: mes
    };
    console.log(user);

    fetch(url+"/sendreply", {
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

    fetch(url+"/showfeedback", {
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
        setquestion(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [filteredList, setFilteredList] = new useState([]);
  // const [students, setStudents] =

  const filterBySearch = (event) => {
    // Access input value
    const query = event.target.value;
    // Create copy of item list
    var updatedList = [...questions];
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
              <h6 className="mb-4">Enquiry/Feedback</h6>
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
                          <th scope="col">Qid</th>
                          <th scope="col">Name</th>
                          <th scope="col">Phone</th>
                          <th scope="col">Email</th>
                          <th scope="col">Comments</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody id="show">
                        {filteredList.map((data) => (
                          <>
                            <tr>
                              <th scope="row">{data.qid}</th>
                              <td>{data.name}</td>
                              <td>{data.phone}</td>
                              <td>{data.email}</td>
                              <td>{data.message}</td>
                              <td>
                                <button
                                  className="btn btn-success  collapsed"
                                  type="button"
                                  data-toggle="collapse"
                                  data-target={"#" + data.qid}
                                  aria-expanded="false"
                                  aria-controls="collapseExample"
                                >
                                  Reply
                                </button>
                              </td>
                            </tr>

                            <tr>
                              <td colSpan="8">
                                <div
                                  className="collapse "
                                  data-parent="#accordion"
                                  id={data.qid}
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
                                                    {data.phone}
                                                  </p>

                                                  <button
                                                    className="btn btn-primary mr-3"
                                                    onClick={() =>
                                                      deletecourse(data.qid)
                                                    }
                                                  >
                                                    Delete Comment
                                                  </button>
                                                  <div id="desc">
                                                    <button
                                                      className="btn btn-success  collapsed my-4"
                                                      type="button"
                                                      data-toggle="collapse"
                                                      data-target={
                                                        "#details" +
                                                        data.qid
                                                      }
                                                      aria-expanded="false"
                                                      aria-controls="collapseExample"
                                                    >
                                                      Show Comment
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
                                                    Name
                                                  </h6>
                                                </div>
                                                <div className="col-sm-9">
                                                  <input
                                                    className=" form-control"
                                                    id={
                                                      "textbox" + data.qid
                                                    }
                                                    value={data.name}
                                                  />
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">
                                                    Question ID
                                                  </h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  {/* {data.course} */}
                                                  <input
                                                    className=" form-control"
                                                    id="textbox"
                                                    value={data.qid}
                                                  />
                                                </div>
                                              </div>
                                              <hr></hr>
                                              <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">
                                                    Phone
                                                  </h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  {/* {data.course} */}
                                                  <input
                                                    className=" form-control"
                                                    id="textbox"
                                                    placeholder={data.phone}
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
                                                    // onChange={(e) =>
                                                    //   setemail(e.target.value)
                                                    // }
                                                    id="textbox"
                                                    value={data.coursecatagory}
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
                                        id={"details" + data.qid}
                                      >
                                        <div className="row">
                                          <div className="col-sm-3">
                                            <h6 className="mb-0">Comments</h6>
                                          </div>
                                          <div className="col-sm-9 ">
                                            <input
                                              className=" form-control"
                                              id="textbox"
                                              value={data.message}
                                            />
                                          </div>
                                          <hr/>
                                          <div className="row">
                                                <div className="col-sm-3">
                                                  <h6 className="mb-0">
                                                    Your Answer
                                                  </h6>
                                                </div>
                                                <div className="col-sm-9 ">
                                                  <input
                                                    className=" form-control"
                                                    onChange={(e) =>
                                                      setmes(e.target.value)
                                                    }
                                                    type="textarea"
                                            
                                                    id="textbox"
                                                    placeholder="Enter Your Reply Here"
                                                    />
                                                </div>
                                              </div>
                                              <hr></hr>
                                           
                                        </div>
                                      </div>

                                      <div className="col-sm-12">
                                        <a
                                          id={"update" + data.qid}
                                          className="btn btn-info mt-1"
                                          //   target="__blank"
                                          //   href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills"
                                          onClick={() =>
                                            getcursor(data.qid,data.name,data.email)
                                          }
                                        >
                                          Reply By E-Mail
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

export default Feedback;
