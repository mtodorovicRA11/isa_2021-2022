import React from 'react'
import { NavLink } from 'react-router-dom';
import { Formik } from 'formik';
import TextField from "./form-fields/TextField";
import Button from "./Button";

const Navigation = ({ handleSearch }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={isActive => isActive ? "nav-link-active" : "nav-link"} to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={isActive => isActive ? "nav-link-active" : "nav-link"} to="/cottage/new">New Cottage</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={isActive => isActive ? "nav-link-active" : "nav-link"} to="/profile">Profile</NavLink>
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

