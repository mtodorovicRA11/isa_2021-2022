import { Formik } from 'formik';
import React from 'react'
import Button from '../components/Button';
import TextField from '../components/form-fields/TextField';
import { useNavigate } from 'react-router-dom';
import { postBoatService } from '../api/boatApiService';

const NewBoatScreen = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    type: '',
    length: '',
    motorNumber: '',
    motorPower: '',
    maxSpeed: '',
    address: '',
    navigationEquipment: '',
    promo: '',
    photoURLs: '',
    capacity: '',
    rules: '',
    fishingEquipment: '',
    additionalInformation: ''
  }

  const handleSubmit = async (formData, {setSubmitting}) => {
    try {
      setSubmitting(true);
      postBoatService(formData)
      setSubmitting(false);
      navigate("/boats");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="login-form">
      <div className="container">
        <div className="row justify-content-center align-content-center" style={{height: '100vh'}}>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">New boat</div>
              <div className="card-body">
                <Formik
                  initialValues={initialValues}
                  validate={values => {
                    const errors = {};
                    if (!values.name) {
                      errors.name = 'Required';
                    }
                    if (!values.type) {
                      errors.type = 'Required';
                    }
                    if (!values.length) {
                      errors.length = 'Required';
                    }
                    if (!values.motorNumber) {
                      errors.motorNumber = 'Required';
                    }
                    if (!values.motorPower) {
                      errors.motorPower = 'Required';
                    }
                    if (!values.maxSpeed) {
                      errors.maxSpeed = 'Required';
                    }
                    if (!values.address) {
                      errors.address = 'Required';
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
                        label="Name *"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        error={errors.name && touched.name && errors.name}
                      />
                      <div className="d-flex justify-content-between">
                        <TextField
                          label="Type *"
                          type="text"
                          name="type"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.type}
                          error={errors.type && touched.type && errors.type}
                        />
                        <TextField
                          label="Length in cm *"
                          type="number"
                          name="length"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.length}
                          error={errors.length && touched.length && errors.length}
                        />
                        <TextField
                          label="Capacity"
                          type="text"
                          name="capacity"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.capacity}
                          error={errors.capacity && touched.capacity && errors.capacity}
                        />
                      </div>
                      <div className="d-flex justify-content-between">
                        <TextField
                          label="Motor Number *"
                          type="text"
                          name="motorNumber"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.motorNumber}
                          error={errors.motorNumber && touched.motorNumber && errors.motorNumber}
                        />
                        <TextField
                          label="Power in W *"
                          type="number"
                          name="motorPower"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.motorPower}
                          error={errors.motorPower && touched.motorPower && errors.motorPower}
                        />
                        <TextField
                          label="Maximum Speed *"
                          type="number"
                          name="maxSpeed"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.maxSpeed}
                          error={errors.maxSpeed && touched.maxSpeed && errors.maxSpeed}
                        />
                      </div>
                      <TextField
                        label="Address *"
                        type="text"
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        error={errors.address && touched.address && errors.address}
                      />
                      <div className="d-flex justify-content-between">
                        <div className="col-6">
                          <TextField
                            label="Navigation Equipment"
                            type="text"
                            name="navigationEquipment"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.navigationEquipment}
                            error={errors.navigationEquipment && touched.navigationEquipment && errors.navigationEquipment}
                          />
                        </div>
                        <div className="col-6">
                          <TextField
                            label="Fishing Equipment"
                            type="text"
                            name="fishingEquipment"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.fishingEquipment}
                            error={errors.fishingEquipment && touched.fishingEquipment && errors.fishingEquipment}
                          />
                        </div>
                      </div>
                      <TextField
                        label="Photo URLs"
                        type="text"
                        name="photoURLs"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.photoURLs}
                        error={errors.photoURLs && touched.photoURLs && errors.photoURLs}
                      />
                      <div className="d-flex justify-content-between">
                        <TextField
                          label="Promotional"
                          type="text"
                          name="promo"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.promo}
                          error={errors.promo && touched.promo && errors.promo}
                        />
                        <TextField
                          label="Rules"
                          type="text"
                          name="rules"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.rules}
                          error={errors.rules && touched.rules && errors.rules}
                        />
                        <TextField
                          label="Additional Information"
                          type="text"
                          name="additionalInformation"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.additionalInformation}
                          error={errors.additionalInformation && touched.additionalInformation && errors.additionalInformation}
                        />
                      </div>
                      <div className="d-flex justify-content-between mt-3">
                        <Button
                          type="submit"
                          label="Add Boat"
                          disabled={isSubmitting}
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

export default NewBoatScreen
