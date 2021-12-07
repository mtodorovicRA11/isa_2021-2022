import React from 'react'
import { Formik } from 'formik';
import TextField from '../components/form-fields/TextField';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';

const LoginScreen = () => {
  return (
    <main className="login-form">
      <div className="container">
        <div className="row justify-content-center align-content-center" style={{ height: '100vh' }}>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Login</div>
              <div className="card-body">
                <Formik
                  initialValues={{ email: '', password: '' }}
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
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 400);
                  }}
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
                      />
                      {errors.email && touched.email && errors.email}
                      <TextField
                        label="Enter your password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      {errors.password && touched.password && errors.password}
                      <div className="d-flex justify-content-between">
                        <button type="submit" className="btn btn-primary">
                          Login
                        </button>
                        <div className="d-flex align-items-center">
                          Don't have an account?
                          <Link className="btn btn-link" to="/register">
                            Register
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
    </main>
  )
}

export default LoginScreen