import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const MailingAdressForm = (props) => {
  const apiHost = process.env.REACT_APP_API_HOST;

  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state;
  const user_id = data.id;

  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    mailing_street: '',
    mailing_apartment_or_suite: '',
    mailing_city: '',
    mailing_state: '',
    mailing_postal_code: '',
  };

  const validationSchema = Yup.object().shape({
    mailing_street: Yup.string().required('Street is required'),
    mailing_apartment_or_suite: Yup.string(),
    mailing_city: Yup.string().required('City is required'),
    mailing_state: Yup.string().required('State is required'),
    mailing_postal_code: Yup.string().required('Postal Code is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        user_id,
        mailing_street: values.street,
        mailing_apartment_or_suite: values.apartment_or_suite,
        mailing_city: values.city,
        mailing_state: values.state,
        mailing_postal_code: values.postal_code,
      };

      const requestUrl = `${apiHost}/api/update-user-profile/${user_id}/`;
      const headers = {
        'Authorization': `Token ${data.user.token}`,
      };

      // Set loading state while making the API request
      setApiError(null);
      setIsLoading(true);

      const response = await axios.patch(requestUrl, payload, { headers });
      console.log('Mailing address updated successfully:', response.data);

      setApiError(null);
      setIsLoading(false);


    // Redirect to the next page upon successful update
    navigate('/citizenship', { state: { data: response.data } });

    } catch (error) {
      console.error('Error updating mailing address:', error);
      setIsLoading(false);

      if (error.response && error.response.data) {
        const errorMessages = error.response.data;
        const fieldErrors = {};

        Object.keys(errorMessages).forEach((fieldName) => {
          fieldErrors[fieldName] = errorMessages[fieldName][0];
        });

        if (fieldErrors.error) {
          setApiError(error.response.data.error);
        } else {
          Formik.setErrors(fieldErrors);
        }
      } else {
        setApiError('An error occurred while processing your request.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mailing" style={{
      height: '100vh',
      marginLeft: '25%',
      marginRight: '25%',
      marginTop: '5%',
    }}>
      <div className="pb-4">
        <h3 style={{ fontSize: '2rem', lineHeight: '3.5rem', fontWeight: '700' }}>
          What's your mailing address?
        </h3>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
          <Form className="needs-validation" noValidate>
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <div className={`form-group ${touched.mailing_street && errors.mailing_street ? 'has-danger' : ''}`}>
                  <Field
                    type="text"
                    name="mailing_street"
                    className={`form-control ${touched.mailing_street && errors.mailing_street ? 'is-invalid' : ''}`}
                    placeholder="Street"
                  />
                  <ErrorMessage name="mailing_mailing_street" component="div" className="text-danger" />
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className={`form-group ${touched.mailing_apartment_or_suite && errors.mailing_apartment_or_suite ? 'has-danger' : ''}`}>
                  <Field
                    type="text"
                    name="mailing_apartment_or_suite"
                    className={`form-control ${touched.mailing_apartment_or_suite && errors.mailing_apartment_or_suite ? 'is-invalid' : ''}`}
                    placeholder="Apt, Suite. (optional)"
                  />
                  <ErrorMessage name="mailing_apartment_or_suite" component="div" className="text-danger" />
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className={`form-group ${touched.mailing_city && errors.mailing_city ? 'has-danger' : ''}`}>
                  <Field
                    type="text"
                    name="mailing_city"
                    className={`form-control ${touched.mailing_city && errors.mailing_city ? 'is-invalid' : ''}`}
                    placeholder="City"
                  />
                  <ErrorMessage name="mailing_city" component="div" className="text-danger" />
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className={`form-group ${touched.state && errors.state ? 'has-danger' : ''}`}>
                  <Field
                    type="text"
                    name="mailing_state"
                    className={`form-control ${touched.mailing_state && errors.mailing_state ? 'is-invalid' : ''}`}
                    placeholder="State"
                  />
                  <ErrorMessage name="mailing_state" component="div" className="text-danger" />
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className={`form-group ${touched.mailing_postal_code && errors.mailing_postal_code ? 'has-danger' : ''}`}>
                  <Field
                    type="text"
                    name="mailing_postal_code"
                    className={`form-control ${touched.mailing_postal_code && errors.mailing_postal_code ? 'is-invalid' : ''}`}
                    placeholder="Postal Code"
                  />
                  <ErrorMessage name="mailing_postal_code" component="div" className="text-danger" />
                </div>
              </div>
            </div>
            
            <div className="col-md-6 d-flex align-items-end mt-5 mx-auto">
              <button
                type="submit"
                className={`btn btn-md ${
                  (isLoading || isSubmitting) ? 'btn-secondary' : 'btn-primary'
                } w-100`}
                disabled={isLoading || isSubmitting}
              >
                {isLoading ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                ) : (
                  <strong>Press Enter &rarr;</strong>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default MailingAdressForm;
