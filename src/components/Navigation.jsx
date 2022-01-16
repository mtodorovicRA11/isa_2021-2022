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
        <NavLink className={isActive => isActive ? "nav-link-active" : "nav-link"} to="window.history.back();">Back</NavLink>
      </li>
    )
  }
}

const Navigation = ({ handleSearch }) => {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item nav-link">
              {renderBack()}
            </li>
            <li className="nav-item nav-link">
              {renderHome()}
            </li>
            <li className="nav-item nav-link">
              <NavLink className={isActive => isActive ? "nav-link-active" : "nav-link"} to="/profile">Profile</NavLink>
            </li>
            <li className="nav-item nav-link">
              <NavLink className={isActive => isActive ? "nav-link-active" : "nav-link"} to="javascript:window.history.back();" >Sign Out</NavLink>
            </li>
          </ul>
          {handleSearch && <Formik
            initialValues={{ searchParam: "" }}
            onSubmit={handleSearch}
          >
            {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
              <form onSubmit={handleSubmit} class="form-inline my-2 my-lg-0 d-flex justify-content-between">
                <TextField class="form-control mr-sm-2"
                  placeholder="Search"
                  type="text"
                  name="searchParam"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.searchParam}
                />
                <Button type="submit" label="Search" class="btn btn-outline-success my-2 my-sm-0"/>
              </form>
            )}
          </Formik>}
        </div>
    </nav>
  )
}

export default Navigation

