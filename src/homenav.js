import { react } from 'react'
import { json } from 'react-router';
import Homemain from './homemain';
import Homeside from './homeside';
import closesidebar from './template';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Homenav() {
    function logout(){
        localStorage.setItem("app",0);
        // window.rel
        window.location.reload();
    }
    const closesidebar = () => {
        // console.log('button clicked');
        // $('.sidebar-toggler').click(function () {
        //     $('.sidebar, .content').toggleClass("open");
        //     return false;
        // });
        // document.getElementById("close").style.width=0;
        // document.querySelector('.sidebar, .content').classList.toggle("open");
        document.querySelector('.content').classList.toggle("open");
        document.querySelector('.sidebar').classList.toggle("open");

        // return false;

    };

    return (
        <div>
            <div className="container-fluid position-relative d-flex p-0">
                {/* Spinner Start */}

                {/* Spinner En

{/* Content Start */}
                <div className="content">
                    {/* Navbar Start */}
                    <nav className="navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
                        <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
                            <h2 className="text-primary mb-0"><i className="fa fa-user-edit"></i></h2>
                        </a>
                        <a href="#" className="sidebar-toggler flex-shrink-0" onClick={closesidebar}>
                            <i className="fa fa-bars"></i>
                        </a>
                        <form className="d-none d-md-flex ms-4">
                            <input className="form-control bg-dark border-0" type="search" placeholder="Search" />
                        </form>
                        <div className="navbar-nav align-items-center ms-auto">
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    <i className="fa fa-envelope me-lg-2"></i>
                                    <span className="d-none d-lg-inline-flex">Message</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                                    <a href="#" className="dropdown-item">
                                        <div className="d-flex align-items-center">
                                            <img className="rounded-circle" src="img/user.jpg" alt="" />
                                            <div className="ms-2">
                                                <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                                                <small>15 minutes ago</small>
                                            </div>
                                        </div>
                                    </a>
                                    <hr className="dropdown-divider" />
                                    <a href="#" className="dropdown-item">
                                        <div className="d-flex align-items-center">
                                            <img className="rounded-circle" src="img/user.jpg" alt="" />
                                            <div className="ms-2">
                                                <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                                                <small>15 minutes ago</small>
                                            </div>
                                        </div>
                                    </a>
                                    <hr className="dropdown-divider" />
                                    <a href="#" className="dropdown-item">
                                        <div className="d-flex align-items-center">
                                            <img className="rounded-circle" src="img/user.jpg" alt="" />
                                            <div className="ms-2">
                                                <h6 className="fw-normal mb-0">Jhon send you a message</h6>
                                                <small>15 minutes ago</small>
                                            </div>
                                        </div>
                                    </a>
                                    <hr className="dropdown-divider" />
                                    <a href="#" className="dropdown-item text-center">See all message</a>
                                </div>
                            </div>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    <i className="fa fa-bell me-lg-2"></i>
                                    <span className="d-none d-lg-inline-flex">Notificatin</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                                    <a href="#" className="dropdown-item">
                                        <h6 className="fw-normal mb-0">Profile updated</h6>
                                        <small>15 minutes ago</small>
                                    </a>
                                    <hr className="dropdown-divider" />
                                    <a href="#" className="dropdown-item">
                                        <h6 className="fw-normal mb-0">New user added</h6>
                                        <small>15 minutes ago</small>
                                    </a>
                                    <hr className="dropdown-divider" />
                                    <a href="#" className="dropdown-item">
                                        <h6 className="fw-normal mb-0">Password changed</h6>
                                        <small>15 minutes ago</small>
                                    </a>
                                    <hr className="dropdown-divider" />
                                    <a href="#" className="dropdown-item text-center">See all notifications</a>
                                </div>
                            </div>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    <img className="rounded-circle me-lg-2" src="img/user.jpg" alt="" />
                                    <span className="d-none d-lg-inline-flex">John Doe</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0 list">
                                    {/* <a href="#" className="dropdown-item">My Profile</a> */}
                                    {/* <Link className="link dropdown-item" to="/Loginsignup">Signup/Login</Link> */}

                                    <a href="#" className="dropdown-item">Settings</a>
                                    <button onClick={logout}  className="dropdown-item">Log Out</button>
                                </div>
                            </div>
                        </div>
                        <br></br>
                        <div></div>

                    </nav>
                    {/* Navbar End */}

                    <Homemain></Homemain>

                    {/* {/* Back to Top */}
                    {/* <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a> */}
                </div>
            </div>
        </div>

    );
}

export default Homenav;
