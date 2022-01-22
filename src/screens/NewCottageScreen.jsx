import { Formik } from 'formik';
import React from 'react'
import Button from '../components/Button';
import TextField from '../components/form-fields/TextField';
import { useNavigate } from 'react-router-dom';
import { postCottageService } from '../api/cottageApiService';

const NewCottageScreen = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    address: '',
    promotional: '',
    photoUrls: '',
    roomNumber: '',
    bedNumber: '',
    rules: ''
  }

  const handleSubmit = async (formData, { setSubmitting }) => {
    try {
      setSubmitting(true);
      await postCottageService(formData)
      setSubmitting(false);
      navigate("/cottages");
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
              <div className="card-header">New cottage</div>
              <div className="card-body">
                <Formik
                  initialValues={initialValues}
                  validate={values => {
                    const errors = {};
                    if (!values.address) {
                      errors.address = 'Required';
                    }
                    if (!values.name) {
                      errors.name = 'Required';
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
                      <TextField
                        label="Address *"
                        type="text"
                        name="address"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        error={errors.address && touched.address && errors.address}
                      />
                      <TextField
                          label="Promotional Materials"
                          type="text"
                          name="promotional"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.promotional}
                          error={errors.promotional && touched.promotional && errors.promotional}
                      />
                      <TextField
                          label="Photo URLs"
                          type="text"
                          name="photoUrls"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.photoUrls}
                          error={errors.photoUrls && touched.photoUrls && errors.photoUrls}
                      />
                      <TextField
                          label="Number of Rooms"
                          type="number"
                          name="roomNumber"
                          min="1"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.roomNumber}
                          error={errors.roomNumber && touched.roomNumber && errors.roomNumber}
                      />
                      <TextField
                          label="Number of beds"
                          type="number"
                          name="bedNumber"
                          min="1"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.bedNumber}
                          error={errors.bedNumber && touched.bedNumber && errors.bedNumber}
                      />
                      <TextField
                          label="House Rules"
                          type="text"
                          name="rules"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.rules}
                          error={errors.rules && touched.rules && errors.rules}
                      />
                      <div className="d-flex justify-content-between mt-3">
                        <Button
                          type="submit"
                          label="Add cottage"
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

export default NewCottageScreen
