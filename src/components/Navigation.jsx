import React from 'react'
import {NavLink, useNavigate} from 'react-router-dom';
import { Formik } from 'formik';
import TextField from "./form-fields/TextField";
import Button from "./Button";
import {getRole} from "../api/axiosInstance";
import {signOutService} from "../api/authServices";

function renderBack() {
  if(window.location.href!=="http://localhost:3000/boats" && window.location.href!=="http://localhost:3000/cottages") {
    return (
      <Button
        type="button"
        label="Back"
        onClick={() => {
          window.history.back();
        }
        }
      />
    )
  }
}

const Navigation = ({ handleSearch }) => {

  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item nav-link">
              {renderBack}
            </li>
            <li className="nav-item nav-link">
              <Button
                type="button"
                label="Home"
                onClick={() => {
                  if (getRole() === "COTTAGE_OWNER") {
                    navigate("/cottages");
                  }
                  if (getRole() === "BOAT_OWNER") {
                    navigate("/boats");
                  }
                }
                }
              />
            </li>
            <li className="nav-item nav-link">
              <Button
                type="button"
                label="My Profile"
                onClick={() => {
                  navigate("/profile");
                }
                }
              />
            </li>
            <li className="nav-item nav-link">
              <Button
                type="button"
                label="Sign Out"
                onClick={() => {
                  signOutService();
                  navigate("/signin");
                }
                }
              />
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

