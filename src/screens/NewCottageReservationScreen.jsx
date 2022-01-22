import { Formik } from 'formik';
import React from 'react'
import Button from '../components/Button';
import TextField from '../components/form-fields/TextField';
import {useNavigate, useParams} from 'react-router-dom';
import {postCottageReservationService} from "../api/cottageReservationsApiService";
import RadioGroupField from "../components/form-fields/RadioGroupField";

const NewCottageReservationScreen = () => {
  const navigate = useNavigate();

  let {cottageId} = useParams();

  const initialValues = {
    beginning: '',
    end: '',
    price: '',
    maxOccupants: '',
    description: '',
    occupantId: '',
    availableToOccupy: "Yes"
  }

  const handleSubmit = async (formData, {setSubmitting}) => {
    try {
      setSubmitting(true);
      await postCottageReservationService(cottageId, formData)
      setSubmitting(false);
      navigate(`/cottage/${cottageId}/reservations`);
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
  }

  return (
    <main className="login-form">
      <div className="container">
        <div className="row justify-content-center align-content-center" style={{height: '100vh'}}>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">New Cottage Reservation</div>
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
                    if (!values.maxOccupants) {
                      errors.maxOccupants = 'Required';
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
                      setFieldValue,
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
                            min="1"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.price}
                            error={errors.price && touched.price && errors.price}
                          />
                        </div>
                        <div className="col-6">
                          <TextField
                            label="Maximum Occupants *"
                            type="text"
                            name="maxOccupants"
                            min="1"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.maxOccupants}
                            error={errors.maxOccupants && touched.maxOccupants && errors.maxOccupants}
                          />
                        </div>
                      </div>
                      <TextField
                        label="Description"
                        type="number"
                        name="description"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.description}
                        error={errors.description && touched.description && errors.description}
                      />
                      <div className="col-6">
                        <RadioGroupField
                          label="Available For Occupy"
                          name="availableToOccupy"
                          options={["Yes", "No"]}
                          onChange={setFieldValue}
                          onBlur={handleBlur}
                          value={values.availableToOccupy}
                        />
                        <TextField
                          label="Occupant"
                          type="text"
                          name="occupantId"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.occupantId}
                          error={errors.occupantId && touched.occupantId && errors.occupantId}
                        />
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <Button
                          type="submit"
                          label="Add Reservation"
                          disabled={isSubmitting}
                        />
                        <Button
                          type="button"
                          label="Cancel"
                          onClick={() => {
                            window.history.back()
                          }}
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

export default NewCottageReservationScreen
