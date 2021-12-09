import React from 'react'
import { Formik } from 'formik';
import TextField from '../components/form-fields/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { registerService } from '../api/authServices';
import RadioGroupField from '../components/form-fields/RadioGroupField';

const RegisterScreen = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
    passwordRepeat: '',
    name: '',
    surname: '',
    address: '',
    city: '',
    country: '',
    phoneNumber: '',
    reason: '',
    role: "ADMIN"
  }

  const register = async (formData, { setSubmitting }) => {
    try {
      setSubmitting(true);
      await registerService(formData);
      navigate('/signin', { replace: true })
      setSubmitting(false);
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
  }

  return (
    <main className="login-form">
      <div className="container">
        <div className="row justify-content-center align-content-center" style={{ height: "100vh" }}>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">Register</div>
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
                  onSubmit={register}>
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
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
                      <div className="d-flex justify-content-between">
                        <div className="col-6">    <TextField
                          label="Enter your Password"
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          error={errors.password && touched.password && errors.password}
                        />
                        </div>
                        <div className="col-6">
                          <TextField
                            label="Repeat your password"
                            type="password"
                            name="passwordRepeat"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.passwordRepeat}
                            error={errors.passwordRepeat && touched.passwordRepeat && errors.passwordRepeat}
                          />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="col-6">
                          <TextField
                            label="Enter your name"
                            type="text"
                            name="name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            error={errors.name && touched.name && errors.name}
                          />
                        </div>
                        <div className="col-6">
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
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="col-4">
                          <TextField
                            label="Enter your address"
                            type="text"
                            name="address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                            error={errors.address && touched.address && errors.address}
                          />
                        </div>
                        <div className="col-4">
                          <TextField
                            label="Enter your city"
                            type="text"
                            name="city"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.city}
                            error={errors.city && touched.city && errors.city}
                          />
                        </div>
                        <div className="col-4">
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
                      <RadioGroupField
                        label="Role"
                        name="role"
                        options={["COTTAGE_OWNER", "BOAT_OWNER", "FISHING_INSTRUCTOR"]}
                        onChange={setFieldValue}
                        onBlur={handleBlur}
                        value={values.role}
                      />
                      <div className="d-flex justify-content-between mt-3">
                        <Button
                          type="submit"
                          label="Sign Up"
                          disabled={isSubmitting}
                        />
                        <div className="d-flex align-items-center">
                          Already have an account?
                          <Link className="btn btn-link" to="/signin">
                            Sign In
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