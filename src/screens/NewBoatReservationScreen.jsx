import { Formik } from 'formik';
import React from 'react'
import Button from '../components/Button';
import TextField from '../components/form-fields/TextField';
import {useNavigate, useParams} from 'react-router-dom';
import {postBoatReservationService} from "../api/boatReservationsApiService";

const NewBoatReservationScreen = () => {
  const navigate = useNavigate();

  let { boatId } = useParams();

  const initialValues = {
    beginning: '',
    end: '',
    price: '',
    maxRenters: '',
    additionalOffers: '',
    renterId: ''
  }

  const handleSubmit = async (formData, { setSubmitting }) => {
    try {
      setSubmitting(true);
      await postBoatReservationService(boatId, formData)
      setSubmitting(false);
      navigate(`/boat/${boatId}/reservations`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="login-form">
      <div className="container">
        <div className="row justify-content-center align-content-center" style={{ height: '100vh' }}>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">New Boat Reservation</div>
              <div className="card-body">
                <Formik
                  initialValues={initialValues}
                  validate={values => {
                    const errors = {};
                    if (!values.beginning) {
                      errors.beginning = 'Required';
                    }
                    if (!values.end) {
                      errors.end = 'Required';
                    }
                    if (!values.price) {
                      errors.price = 'Required';
                    }
                    if (!values.maxRenters) {
                      errors.maxRenters = 'Required';
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
                      <div className="d-flex justify-content-between">
                        <div className="col-6">
                      <TextField
                        label="Beginning *"
                        type="datetime-local"
                        name="beginning"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.beginning}
                        error={errors.beginning && touched.beginning && errors.beginning}
                      />
                        </div>
                        <div className="col-6">
                      <TextField
                        label="End *"
                        type="datetime-local"
                        name="end"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.end}
                        error={errors.end && touched.end && errors.end}
                      />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="col-6">
                      <TextField
                          label="Price *"
                          type="number"
                          name="price"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.price}
                          error={errors.price && touched.price && errors.price}
                      />
                        </div>
                        <div className="col-6">
                      <TextField
                          label="Maximum Renters *"
                          type="text"
                          name="maxRenters"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.maxRenters}
                          error={errors.maxRenters && touched.maxRenters && errors.maxRenters}
                      />
                      </div>
                      </div>
                      <TextField
                          label="Additional Offers"
                          type="number"
                          name="additionalOffers"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.additionalOffers}
                          error={errors.additionalOffers && touched.additionalOffers && errors.additionalOffers}
                      />
                      <TextField
                          label="Renter"
                          type="text"
                          name="renterId"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.renterId}
                          error={errors.renterId && touched.renterId && errors.renterId}
                      />
                      <div className="d-flex justify-content-between mt-3">
                        <Button
                          type="submit"
                          label="Add Reservation"
                          disabled={isSubmitting}
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
    </main >
  )
}

export default NewBoatReservationScreen
