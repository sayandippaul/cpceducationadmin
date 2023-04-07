import "./studentmainpage.css";
import { useState, useEffect,useRef } from "react";
var student=[];
var times=["7:00-9:00AM","9:00-12:00PM","12:00-2:00PM","2:00-4:00PM","4:00-6:00PM","6:00-8:00PM","8:00-10:00PM"];
var days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
var keys=['a','b','c','d','e','f','g'];

function Studentmainpage() {
    const dataFetchedRef = useRef(false);
    // useEffect((async) => {

   
  var [student, setdata] = useState([]);
  var [address, setaddress] = useState("");
  var [name, setname] = useState("");
  var [email, setemail] = useState("");
  var [phone, setphone] = useState("");
  var [course, setcourse] = useState("");
  var [password, setpass] = useState("");

    function getcursor (oldcpcid){
         
        //  alert("hi: "+oldcpcid);
          document.getElementById('textbox').focus();
          const user = {address: address,name:name,email:email,course:course,password:password,phone:phone,name:name,oldcpcid:oldcpcid};
          console.log(user);

          var studentbatch=[];
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
  var showbatch="";
  function setbatch(bat){
    // console.log(bat+"hi");
    for(var i=0;i<bat.length;i++){
        var s1=bat[i][0];
        var s2=bat[i][1];
        var s3=keys.indexOf(s2);
        console.log(s2+" "+s3);
         showbatch=showbatch+days[s1-1]+" : "+times[s3]+"<hr/>"

        
  }
  document.getElementById("showbatch").innerHTML=showbatch;
}
   const user={cpcid:localStorage.getItem('cpcid')};
//    const user={cpcid:"cpc12345"};

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
  
    fetch("http://localhost:3000/loginid", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Origin": "*",
      },
        body: JSON.stringify(user)
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data[0].feedetailstransactionid);
        // student=data;
        setdata(data);
        console.log(data.batch);
        setbatch(data.batch);

        // setFilteredList(data);
        // setStudents(data);
      })
      .catch((err) => console.log(err));
    // });
  }, []);


    function logout(){
        localStorage.setItem("app",0);
        localStorage.setItem("sora",0);

        // window.rel
        window.location.reload();
    }
   
    
    return (
        <div
            className="student"
            data-spy="scroll"
            data-target=".navbar"
            data-offset="40"
            id="home"
        >
            <div
                className="bgded overlay"
            // style="background-image: url('images/demo/backgrounds/01.png')"
            >
                {/* <!-- ################################################################################################ --> */}
                <div className="wrapper row0">
                    <header id="header" className="hoc clear center">
                        {/* <!-- ################################################################################################ --> */}
                        <h1 id="logo">
                            <i className="fas fa-truck-loading"></i>
                            <a href="index.html">CPC EDUCATION</a>
                        </h1>
                        {/* <!-- ################################################################################################ --> */}
                    </header>
                </div>
                {/* <!-- ################################################################################################ --> */}
                {/* <!-- ################################################################################################ --> */}
                {/* <!-- ################################################################################################ --> */}
                <div className="wrapper row1">
                    <nav
                        className="navbar sticky-top navbar-expand-lg navbar-light bg-gray"
                        data-spy="affix"
                        data-offset-top="510"
                    >
                        <div className="container">
                            <button
                                className="navbar-toggler ml-auto"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div
                                className="collapse mt-sm-20 navbar-collapse"
                                id="navbarSupportedContent"
                            >
                                <ul className="navbar-nav mx-auto">
                                    <li className="nav-item px-auto">
                                        <a href="#home" className="nav-link pl-auto">
                                            Home
                                        </a>
                                    </li>
                                    <li className="nav-item px-auto">
                                        <a href="#profile" className="nav-link mx-auto">
                                            Your Profile
                                        </a>
                                    </li>
                                    <li className="nav-item px-auto">
                                        <a href="#resume" className="nav-link mx-auto">
                                            Attandance
                                        </a>
                                    </li>
                                </ul>
                                <ul className="navbar-nav brand mx-auto">
                                    {/* <!-- <img src="assets/imgs/avatar.jpg" alt="" className="brand-img"> --> */}
                                    <li className="brand-txt">
                                        <h5 className="brand-title">{student.name}</h5>
                                        <div className="brand-subtitle">CpcId | {student.cpcid}</div>
                                    </li>
                                </ul>
                                <ul className="navbar-nav mx-auto">
                                    <li className="nav-item mx-auto">
                                        <a href="#portfolio" className="nav-link">
                                            Class Notification
                                        </a>
                                    </li>
                                    <li className="nav-item mx-auto">
                                        <a href="#blog" className="nav-link">
                                            Messages
                                        </a>
                                    </li>
                                    <li onClick={logout} className="nav-item  last-item">
                                        {/* <a href="#contact" className="nav-link"> */}
                                            Log Out
                                        {/* </a> */}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                {/* <!-- ################################################################################################ --> */}
                {/* <!-- ################################################################################################ --> */}
                {/* <!-- ################################################################################################ --> */}
                <div id="pageintro" className="hoc clear">
                    {/* <!-- ################################################################################################ --> */}
                    <article>
                        <h3 className="heading">Computer Programming Center</h3>
                        <p>Tagline................................</p>
                        <footer>
                            <a className="btn" href="#">
                                Nascetur ridiculus mus
                            </a>
                        </footer>
                    </article>
                    {/* <!-- ################################################################################################ --> */}
                </div>
                {/* <!-- ################################################################################################ --> */}
            </div>
            {/* <!-- End Top Background Image Wrapper --> */}
            {/* <!-- ################################################################################################ --> */}
            {/* <!-- ################################################################################################ --> */}
            {/* <!-- ################################################################################################ --> */}
            <div className="wrapper row3">
                <main className="hoc container clear">
                    {/* <!-- main body --> */}
                    {/* <!-- ################################################################################################ --> */}
                    <div className="sectiontitle">
                        <h6 className="heading font-x3 text-dark">Achievements</h6>
                        <p>Quis purus nulla facilisi aliquam non ligula nam ut nisi.</p>
                    </div>
                    <div className="posts">
                        <figure className="group">
                            <div>
                                <a className="imgover" href="#">
                                    <img src="images/demo/570x320.png" alt="" />
                                </a>
                            </div>
                            <figcaption>
                                <h6 className="heading">Praesent auctor justo</h6>
                                <p>
                                    Et pulvinar pellentesque lectus urna luctus lorem a laoreet
                                    enim ligula vitae turpis curabitur ullamcorper arcu lobortis
                                    tempus ornare arcu elit dapibus ante at.
                                </p>
                                <footer>
                                    <a className="btn" href="#">
                                        View Details
                                    </a>
                                </footer>
                            </figcaption>
                        </figure>
                        {/* <!-- ################################################################################################ --> */}
                        <figure className="group">
                            <div>
                                <a className="imgover" href="#">
                                    <img src="images/demo/570x320.png" alt="" />
                                </a>
                            </div>
                            <figcaption>
                                <h6 className="heading">Pharetra libero nisi</h6>
                                <p>
                                    Vel diam maecenas mattis massa nec rutrum mattis leo felis
                                    posuere eros eget elementum tortor leo non enim praesent id
                                    metus in auctor enim a tortor nunc laoreet.
                                </p>
                                <footer>
                                    <a className="btn" href="#">
                                        View Details
                                    </a>
                                </footer>
                            </figcaption>
                        </figure>
                    </div>
                    {/* <!-- ################################################################################################ --> */}
                    {/* <!-- / main body --> */}
                    <div className="clear"></div>
                </main>
            </div>
            <section className="session" id="profile">
            <div className="container-fluid">
            <div className="row about-section ">
            <div className="col-lg-4 about-card mt-4">
            <h3 className="font-weight-light ">Your Profile</h3>
            <span className="line mb-5"></span>
            <h5 className="mb-3">CPC course</h5>
            <p className="mt-20"><strong>Course: </strong>{student.course}</p>
            <p className="mt-20"><strong>CPCId: </strong>{student.cpcid}</p>

            <button className="btn btn-info" onClick={()=>getcursor(student.cpcid)}><i className="icon-down-circled2 "></i>Update Profile</button>
            </div>
            <div className="col-lg-4 about-card mt-4">
            <h3 className="font-weight-light">Personal Info</h3>
            <span className="line mb-5"></span>
            <ul className="mt40 info list-unstyled">
            <li ><strong style={{float:"left",marginRight:"2%"}}>Date of Joining</strong>:<input disabled style={{float:"right"}} placeholder={student.month} className="outline-none"/></li>
            <hr/>
            <li><strong style={{float:"left",marginRight:"2%"}}>Email</strong>: <input id="textbox"style={{float:"right"}} placeholder={student.email}onChange={(e) => setemail(e.target.value)} className="outline-none"/></li>
            <hr/>
            <li><strong style={{float:"left",marginRight:"2%"}}>Phone</strong>:<input id="textbox"style={{float:"right"}} placeholder={student.phone} onChange={(e) => setphone(e.target.value)} className="outline-none"/> </li>
                {/* <!-- <li><span></span> : John_Doe </li> --> */}
            <hr/>
            <li><strong style={{float:"left",marginRight:"2%"}}>Address</strong>:<input id="textbox"style={{float:"right"}} placeholder={student.address}onChange={(e) => setaddress(e.target.value)} className="outline-none"/></li>
            <hr/>

            </ul>
                {/*<!-- <ul className="social-icons pt-3">
                    <li className="social-item"><a className="social-link" href="#"><i className="ti-facebook" aria-hidden="true"></i></a></li>
                    <li className="social-item"><a className="social-link" href="#"><i className="ti-twitter" aria-hidden="true"></i></a></li>
                    <li className="social-item"><a className="social-link" href="#"><i className="ti-google" aria-hidden="true"></i></a></li>
                    <li className="social-item"><a className="social-link" href="#"><i className="ti-instagram" aria-hidden="true"></i></a></li>
                    <li className="social-item"><a className="social-link" href="#"><i className="ti-github" aria-hidden="true"></i></a></li>
                </ul>   --> */}
            </div>
            <div className="col-lg-4 about-card mt-4">
            <h3 className="font-weight-light">Course Details</h3>
            <span className="line mb-5"></span>
            <div className="row">
                {/* <!-- <div className="col-1 text-danger pt-1"><i className="ti-widget icon-lg"></i></div> --> */}
            <div className="col-10 ml-auto mr-3">
            <h6>Course Fees</h6>
            <p className="subtitle">{student.amount}</p>
            <hr/>
            </div>
            </div>
            <div className="row">
                {/* <!-- <div className="col-1 text-danger pt-1"><i className="ti-paint-bucket icon-lg"></i></div> --> */}
            <div className="col-10 ml-auto mr-3">
            <h6 >Course Days</h6>
            <p id="showbatch"className="subtitle">Lorem ipsum dolor sit consectetur.</p>
            {/* <p className="subtitle">Lorem ipsum dolor sit consectetur.</p>
            <p className="subtitle">Lorem ipsum dolor sit consectetur.</p> */}
            {/* <hr/> */}
            </div>
            </div>
            </div>
            </div>
            </div>
             </section >
        </div>
    
    );
}

export default Studentmainpage;
