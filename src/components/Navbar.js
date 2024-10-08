import React from "react";
import '../styles.css';
import {Link , useLocation, useNavigate} from "react-router-dom";
const Navbar = () => {
  const location = useLocation()
  let history=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('token')
    history('/login')
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-custom ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">
                Home
              </Link>
            </li>
           
          </ul>
          
         { !localStorage.getItem('token')?
          <form className="d-flex" >
         <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
          <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
           
         </form>
         :
         <button className="btn btn-danger" onClick={handleLogout}> Logout</button>
         }
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
