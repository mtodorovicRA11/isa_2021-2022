import { Formik, Field } from 'formik';
import React from 'react'
import Button from '../components/Button';
import TextField from '../components/form-fields/TextField';
import {useNavigate, useParams} from 'react-router-dom';
import RadioGroupField from "../components/form-fields/RadioGroupField";
import {postBoatReservationReviewService} from "../api/boatApiService";

const NewBoatReservationScreen = () => {
  const navigate = useNavigate();

  let {boatId, reservationId} = useParams();

  const initialValues = {
    comment: '',
    showed: true,
    rating: "5"
  }

  const handleSubmit = async (formData, {setSubmitting}) => {
    try {
      setSubmitting(true);
      await postBoatReservationReviewService(reservationId, formData)
      setSubmitting(false);
      navigate(`/boat/${boatId}/reservations`);
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
              <div className="card-header">Reservation review for</div>
              <div className="card-body">
                <Formik
                  initialValues={initialValues}
                  validate={values => {
                    const errors = {};
                    if (!values.comment) {
                      errors.comment = 'Required';
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
                            label="Comment"
                            type="text"
                            name="comment"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.comment}
                            error={errors.comment && touched.comment && errors.comment}
                          />
                        </div>
                        <div>Renter Showed?</div>
                        <Field type="checkbox" name="showed" />
                        <RadioGroupField
                          label="Rating"
                          name="rating"
                          options={["1", "2", "3", "4", "5"]}
                          onChange={setFieldValue}
                          onBlur={handleBlur}
                          value={values.rating}
                        />
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <Button
                          type="submit"
                          label="Send"
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

export default NewBoatReservationScreen
