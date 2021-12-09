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

  if(!cottage) return null;

  const initialValues = {
    id: cottage.id,
    name: cottage.name,
    address: cottage.address,
  }

  const update = async (formData, { setSubmitting }) => {
    try {
      setSubmitting(true);
      await updateCottageService(formData);
      navigate('/', { replace: true })
      setSubmitting(false);
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
                      <div className="d-flex justify-content-between mt-3">
                        <Button
                          type="submit"
                          label="Update Cottage"
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
    </main >
  )
}

export default ViewCottageScreen
