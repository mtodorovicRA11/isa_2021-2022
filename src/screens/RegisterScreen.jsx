import React from 'react'
import { Formik } from 'formik';
import TextField from '../components/form-fields/TextField';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

const RegisterScreen = () => {
  return (
    <main className="login-form">
      <div className="container">
        <div className="row justify-content-center align-content-center" style={{ height: '100vh' }}>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Register</div>
              <div className="card-body">
                <Formik
                  initialValues={{ fullName: '', email: '', password: '' }}
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
                        label="Full name"
                        type="text"
                        name="fullName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fullName}
                        error={errors.fullName && touched.fullName && errors.fullName}
                      />
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
                      <div className="d-flex justify-content-between">
                        <Button
                          type="submit"
                          label="Register"
                        />
                        <div className="d-flex align-items-center">
                          Already have an account?
                          <Link className="btn btn-link" to="/login">
                            Login
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

export default RegisterScreen