import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom';
import { Formik } from 'formik';
import TextField from "./form-fields/TextField";
import Button from "./Button";
import {getRole} from "../api/axiosInstance";
import {signOutService} from "../api/authServices";

function renderHome() {
  if (getRole() === "COTTAGE_OWNER") {
    return (
      <NavLink className={isActive => isActive ? "nav-link-active" : "nav-link"} to="/cottages">Home</NavLink>
    );
  } else if (getRole() === "BOAT_OWNER") {
    return (
      <NavLink className={isActive => isActive ? "nav-link-active" : "nav-link"} to="/boats">Home</NavLink>
    );
  }
}

function renderBack() {
  if(window.location.href!=="http://localhost:3000/boats" && window.location.href!=="http://localhost:3000/cottages"){
    return(
      <li className="nav-item">
        <NavLink className={isActive => isActive ? "nav-link-active" : "nav-link"} to="javascript:history.back();">Back</NavLink>
      </li>
    )
  }
}

const Navigation = ({ handleSearch }) => {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {renderBack()}
            </li>
            <li className="nav-item">
              {renderHome()}
            </li>
            <li className="nav-item">
              <NavLink className={isActive => isActive ? "nav-link-active" : "nav-link"} to="/profile">Profile</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={isActive => isActive ? "nav-link-active" : "nav-link"} to="javascript:window.history.back();" >Sign Out</NavLink>
            </li>
          </ul>
          {handleSearch && <Formik
            className="d-flex"
            initialValues={{ searchParam: "" }}
            onSubmit={handleSearch}
          >
            {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  placeholder="Search"
                  type="text"
                  name="searchParam"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.searchParam}
                />
                <Button type="submit" label="Search" />
              </form>
            )}
          </Formik>}
        </div>
      </div>
    </nav>
  )
}

export default Navigation

