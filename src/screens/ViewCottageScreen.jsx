import { Formik } from 'formik';
import React, {useEffect, useState} from 'react'
import Button from '../components/Button';
import TextField from '../components/form-fields/TextField';
import { useNavigate } from 'react-router-dom';
import { getCottageService, updateCottageService } from '../api/cottageApiService';
import {useParams} from 'react-router-dom';

const ViewCottageScreen = () => {
  const navigate = useNavigate();
  const [cottage, setCottage] = useState(null);

  let { cottageId } = useParams();

  useEffect(() => {
    const getCottage = async () => {
      const data = await getCottageService(cottageId);
      setCottage(data ?? null)
    }
    getCottage();
  }, [])

  console.log(cottage);
  if(!cottage) return null;

  const initialValues = {
    id: cottage.id,
    name: cottage.name,
    address: cottage.address,
    promotional: cottage.promotional,
    photoUrls: cottage.photoUrls,
    roomNumber: cottage.roomNumber,
    bedNumber: cottage.bedNumber,
    rules: cottage.rules
  }

  const update = async (formData, { setSubmitting }) => {
    try {
      setSubmitting(true);
      await updateCottageService(formData);
      navigate('/', { replace: true })
      setSubmitting(false);
    } catch (error) {
      alert(error.response.data);
      console.log(error);
    }
  }

  return (
    <main className="login-form">
      <div className="container">
        <div className="row justify-content-center align-content-center" style={{ height: '100vh' }}>
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">View Cottage</div>
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
                  onSubmit={update}
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
                        label="Name"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        error={errors.name && touched.name && errors.name}
                      />
                      <TextField
                        label="Address"
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
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.roomNumber}
                          error={errors.roomNumber && touched.roomNumber && errors.roomNumber}
                      />
                      <TextField
                          label="Number of beds"
                          type="number"
                          name="bedNumber"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.roomNumber}
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
                          label="Update Cottage"
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

export default ViewCottageScreen
