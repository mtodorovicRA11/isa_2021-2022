import React, {useState} from 'react'
import { Formik } from 'formik';
import TextField from '../components/form-fields/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import {getMeService, updateMeService} from '../api/meApiService';

const RegisterScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [me, setMe] = useState([]);

  const getMe = async () => {
    setIsLoading(true);
    const me = await getMeService();
    setMe(me ?? [])
    setIsLoading(false);
  }

  const timer = setTimeout(() => {
    getMe();
  }, 100);
  return () => clearTimeout(timer);

  const initialValues = {
    name: '',
    surname: '',
    address: '',
    city: '',
    country: '',
    phoneNumber: '',
  }

  const update = async (formData, { setSubmitting }) => {
    try {
      setSubmitting(true);
      await updateMeService(formData);
      navigate('/', { replace: true })
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading) return "Loading...";

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
                  onSubmit={update}>
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
                      <div className="d-flex justify-content-between mt-3">
                        <Button
                          type="submit"
                          label="Register"
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