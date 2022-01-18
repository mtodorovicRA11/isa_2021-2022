import React, {useEffect, useState} from 'react'
import { Formik } from 'formik';
import TextField from '../components/form-fields/TextField';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import {getMeService, updateMeService, deactivateMeService} from '../api/meApiService';

const ProfileScreen = () => {
  const navigate = useNavigate();
  const [me, setMe] = useState(null);

  useEffect(() => {
    const getMe = async () => {
      const data = await getMeService();
      setMe(data ?? null)
    }
    getMe();
  }, [])

  if(!me) return null;

  const initialValues = {
    name: me.name,
    surname: me.surname,
    address: me.address,
    city: me.city,
    country: me.country,
    phoneNumber: me.phoneNumber,
  }

  const update = async (formData, { setSubmitting }) => {
    try {
      setSubmitting(true);
      await updateMeService(formData);
      window.history.go(-1);
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
              <div className="card-header">My Profile</div>
              <div className="card-body">
                <Formik
                  initialValues={initialValues}
                  validate={values => {
                    const errors = {};
                    if (!values.name) {
                      errors.name = 'Required';
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
                      <div className="d-flex justify-content-between">
                        <div className="col-6">
                          <TextField
                            label="Name"
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
                            label="Surname"
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
                            label="Address"
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
                            label="City"
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
                            label="Country"
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
                        label="Phone number"
                        type="text"
                        name="phoneNumber"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.phoneNumber}
                        error={errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
                      />
                      <div className="d-flex justify-content-between mt-3">
                        <Button
                          type="submit"
                          label="Update"
                          disabled={isSubmitting}
                        />
                        <Button
                          type="button"
                          label="Deactivate"
                          onClick={()=>deactivateMeService()}
                        />
                        <Button
                          type="button"
                          label="Cancel"
                          onClick={() => {window.history.back()}}
                        />
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

export default ProfileScreen