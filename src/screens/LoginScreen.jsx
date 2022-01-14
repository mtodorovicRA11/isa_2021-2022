import React from 'react'
import { Formik } from 'formik';
import TextField from '../components/form-fields/TextField';
import Button from '../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { loginService } from '../api/authServices';
import {getRole} from "../api/axiosInstance";

const LoginScreen = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  }

  const handleSubmit = async (formData, { setSubmitting }) => {
    try {
      setSubmitting(true);
      await loginService(formData)
      const role = getRole();
      if(role==="BOAT_OWNER"){
        navigate('/boats', { replace: true })
      }
      else if(role==="COTTAGE_OWNER"){
        navigate('/cottages', { replace: true })
      }
      setSubmitting(false);
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
  }

  return (
    <main className="login-form">
      <div className="container">
        <div className="row justify-content-center align-content-center" style={{ height: '100vh' }}>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Sign In</div>
              <div className="card-body">
                <Formik
                  initialValues={initialValues}
                  validate={values => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = 'Required';
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                      errors.email = 'Invalid email address';
                    }
                    return errors;
                  }}
                  onSubmit={handleSubmit}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <TextField
                        label="Enter your email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        error={errors.email && touched.email && errors.email}
                      />
                      <TextField
                        label="Enter your password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        error={errors.password && touched.password && errors.password}
                      />
                      <div className="d-flex justify-content-between mt-3">
                        <Button
                          type="submit"
                          label="Sign In"
                          disabled={isSubmitting}
                        />
                        <div className="d-flex align-items-center">
                          Don't have an account?
                          <Link className="btn btn-link" to="/signup">
                            Sign Up
                          </Link>
                        </div>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main >
  )
}

export default LoginScreen