import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const ResidentialForm = (props) => {
  const apiHost = process.env.REACT_APP_API_HOST;

  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state;
  const user_id = data.id;

  const initialValues = {
    street: '',
    aptSuite: '',
    city: '',
    state: '',
    postal_code: '',
    same_as_home: false,
  };

  const validationSchema = Yup.object().shape({
    street: Yup.string().required('Street is required'),
    aptSuite: Yup.string(),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    postal_code: Yup.string().required('Postal Code is required'),
    same_as_home: Yup.boolean(), // Removed the "oneOf" validation
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const payload = {
        user_id,
        street: values.street,
        aptSuite: values.aptSuite,
        city: values.city,
        state: values.state,
        postal_code: values.postal_code,
        same_as_home: values.same_as_home || false, // Set to false if checkbox is not checked
      };
      console.log(data.token)
      const requestUrl = `${apiHost}/api/update-user-profile/${user_id}/`;
      const headers = {
        'Authorization': `Token ${data.token}`,
      };
      const response = await axios.patch(requestUrl, payload, { headers });
      console.log('Residential address updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating residential address:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="residential"
      style={{
        height: '100vh',
        marginLeft: '25%',
        marginRight: '25%',
        marginTop: '5%',
      }}>
      <div className="pb-4">
        <h3 style={{ fontSize: '2.5rem', lineHeight: '3.5rem', fontWeight: '700' }}>
          What's your residential address?
        </h3>
        <p style={{ fontWeight: '500' }}>
          We'll use your street address for any tax reporting or mailing requirements for your state.
        </p>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form className="needs-validation" noValidate>
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <div className={`form-group ${touched.street && errors.street ? 'has-danger' : ''}`}>
                  <Field
                    type="text"
                    name="street"
                    className={`form-control ${touched.street && errors.street ? 'is-invalid' : ''}`}
                    placeholder="Street"
                  />
                  <ErrorMessage name="street" component="div" className="text-danger" />
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className={`form-group ${touched.aptSuite && errors.aptSuite ? 'has-danger' : ''}`}>
                  <Field
                    type="text"
                    name="aptSuite"
                    className={`form-control ${touched.aptSuite && errors.aptSuite ? 'is-invalid' : ''}`}
                    placeholder="Apt, Suite. (optional)"
                  />
                  <ErrorMessage name="aptSuite" component="div" className="text-danger" />
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className={`form-group ${touched.city && errors.city ? 'has-danger' : ''}`}>
                  <Field
                    type="text"
                    name="city"
                    className={`form-control ${touched.city && errors.city ? 'is-invalid' : ''}`}
                    placeholder="City"
                  />
                  <ErrorMessage name="city" component="div" className="text-danger" />
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className={`form-group ${touched.state && errors.state ? 'has-danger' : ''}`}>
                  <Field
                    type="text"
                    name="state"
                    className={`form-control ${touched.state && errors.state ? 'is-invalid' : ''}`}
                    placeholder="State"
                  />
                  <ErrorMessage name="state" component="div" className="text-danger" />
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className={`form-group ${touched.postal_code && errors.postal_code ? 'has-danger' : ''}`}>
                  <Field
                    type="text"
                    name="postal_code"
                    className={`form-control ${touched.postal_code && errors.postal_code ? 'is-invalid' : ''}`}
                    placeholder="Postal Code"
                  />
                  <ErrorMessage name="postal_code" component="div" className="text-danger" />
                </div>
              </div>
            </div>
            <div className="form-check mt-2">
              <Field
                type="checkbox"
                name="same_as_home"
                className="form-check-input"
                id="same_as_home"
              />
              <label className="form-check-label" htmlFor="same_as_home">
                <small style={{ fontWeight: '500' }}>My mailing address is the same</small>
              </label>
            </div>
            <div className="col-md-6 d-flex align-items-end mt-5 mx-auto">
              <button
                type="submit"
                className={`btn btn-md ${
                  Object.keys(errors).length > 0 ? 'btn-secondary' : 'btn-primary'
                } w-100`}
                disabled={Object.keys(errors).length > 0}
              >
                <strong>Press Enter &rarr;</strong>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default ResidentialForm;
