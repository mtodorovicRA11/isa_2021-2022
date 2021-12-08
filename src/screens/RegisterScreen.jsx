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
                  initialValues={{ email: '', password: '', repeatPassword: '', name: '', surname: '', address: '', city: '', country: '', phoneNumber: '', reason: '' }}
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
                        error={errors.email && touched.email && errors.email}
                      />
                      <TextField
                        label="Enter yourPassword"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        error={errors.password && touched.password && errors.password}
                      />
                      <TextField
                        label="Repeat your password"
                        type="password"
                        name="repeatPassword"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.repeatPassword}
                        error={errors.repeatPassword && touched.repeatPassword && errors.repeatPassword}
                      />
                      <div className="d-flex justify-content-between">
                        <TextField
                          label="Enter your name"
                          type="text"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          error={errors.name && touched.name && errors.name}
                        />
                        <TextField
                          label="Enter your surname"
                          type="text"
                          name="surname"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.surname}
                          error={errors.surname && touched.surname && errors.surname}
                        />
                      </div>
                      <div className="d-flex justify-content-between">
                        <TextField
                          label="Enter your address"
                          type="text"
                          name="address"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address}
                          error={errors.address && touched.address && errors.address}
                        />
                        <TextField
                          label="Enter your city"
                          type="text"
                          name="city"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.city}
                          error={errors.city && touched.city && errors.city}
                        />
                        <TextField
                          label="Enter your country"
                          type="text"
                          name="country"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.country}
                          error={errors.country && touched.country && errors.country}
                        />
                      </div>
                      <TextField
                        label="Enter your phone number"
                        type="text"
                        name="phoneNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phoneNumber}
                        error={errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                      />
                      <TextField
                        label="Enter the reason for registration"
                        type="text"
                        name="reason"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.reason}
                        error={errors.reason && touched.reason && errors.reason}
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