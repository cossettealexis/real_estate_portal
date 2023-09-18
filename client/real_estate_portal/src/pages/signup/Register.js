import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/Register.css';

function Signup() {
  const navigate = useNavigate();
  const apiHost = process.env.REACT_APP_API_HOST;
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Your password should have at least 8 characters and include at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character (!@#$%^&*)'
      )
      .required('Password is required'),
    agree_terms: Yup.boolean().oneOf([true], 'You must agree to the Terms of Service'),
    country_code: Yup.string().required('Country Code is required'),
  });

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      phone_number: '',
      email: '',
      password: '',
      agree_terms: false,
      country_code: '+1', // Set the default country code here as +1
    },
    validationSchema,
    onSubmit: (values) => {
      // Set loading state while making the API request
      setApiError(null);
      setIsLoading(true);

      axios
        .post(apiHost + '/api/register/', values)
        .then((response) => {
          console.log('API response:', response.data);
          setApiError(null);
          setIsLoading(false); // Turn off loading state

          // Redirect to the residential form page upon successful registration
          navigate('/residential-address');
        })
        .catch((error) => {
          console.error('API error:', error);
          setIsLoading(false); // Turn off loading state

          if (error.response && error.response.data) {
            const errorMessages = error.response.data;
            // Create an object to store field-specific error messages
            const fieldErrors = {};

            // Loop through the error messages and extract field-specific errors
            Object.keys(errorMessages).forEach((fieldName) => {
              fieldErrors[fieldName] = errorMessages[fieldName][0];
            });

            // Set the field-specific error messages
            console.log(fieldErrors);
            console.log(fieldErrors['I']);
            if (fieldErrors.error) {
              setApiError(error.response.data.error);
            } else {
              formik.setErrors(fieldErrors);
            }
          } else {
            setApiError('An error occurred while processing your request.');
          }
        });
    },
  });

  const handleCountryCodeChange = (event) => {
    formik.setFieldValue('country_code', event.target.value);
  };

  return (
    <section className="signup" style={{
      height: '100vh',
      marginLeft: '25%',
      marginRight: '25%',
      marginTop: '5%',
    }}>
      <div className="container mb-5">
        <div className="text-center mb-5">
          <h3 style={{ fontSize: '3.5rem', lineHeight: '3.5rem', fontWeight: '700', letterSpacing: '2px' }}>
            Create your account
          </h3>
        </div>
        {apiError && <div className="text-danger">{apiError}</div>}
        <form onSubmit={formik.handleSubmit} className="needs-validation" noValidate>
          {/* First Name and Last Name */}
          <div className="row form-row">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="first_name"
                  placeholder="First Name *"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.first_name}
                  required
                />
                {formik.touched.first_name && formik.errors.first_name ? (
                  <div className="text-danger">{formik.errors.first_name}</div>
                ) : null}
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="last_name"
                  placeholder="Last Name *"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.last_name}
                  required
                />
                {formik.touched.last_name && formik.errors.last_name ? (
                  <div className="text-danger">{formik.errors.last_name}</div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Country Code and Phone Number */}
          <div className="row form-row">
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <select
                  className="form-control form-control-lg"
                  name="country_code"
                  onChange={handleCountryCodeChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country_code}
                  required
                  style={{ fontSize: '15px', fontWeight: 'bold', color: '#585858' }}
                >
                  <option value="+1" style={{ fontSize: '15px', fontWeight: 'bold' }}>
                    +1 (US)
                  </option>
                  <option value="+44" style={{ fontSize: '15px', fontWeight: 'bold' }}>
                    +44 (UK)
                  </option>
                  <option value="+63" style={{ fontSize: '15px', fontWeight: 'bold' }}>
                    +63 (PH)
                  </option>
                </select>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="phone_number"
                  placeholder="Phone Number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone_number}
                />
                {formik.touched.phone_number && formik.errors.phone_number ? (
                  <div className="text-danger">{formik.errors.phone_number}</div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Email and Password */}
          <div className="form-row">
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  name="email"
                  placeholder="Email *"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  required
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  name="password"
                  placeholder="Password *"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  required
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Password Strength Progress Bar */}
          <div className="progress password-progress">
            <div
              className={`progress-bar ${formik.values.password &&
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                  formik.values.password
                )
                  ? 'bg-primary'
                  : 'bg-danger'}`}
              role="progressbar"
              style={{
                width: `${
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                    formik.values.password
                  )
                    ? 100
                    : 0
                }%`,
                borderRadius: 0,
              }}
              aria-valuenow={
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                  formik.values.password
                )
                  ? 100
                  : 0
              }
              aria-valuemin="0"
              aria-valuemax="100"
            >
              {/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                formik.values.password
              )
                ? 'Strong Password'
                : 'Weak'}
            </div>
          </div>

          {/* Terms of Service */}
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              name="agree_terms"
              id="agreeTerms"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.agree_terms}
              required
            />
            <label className="form-check-label" htmlFor="agreeTerms">
              <small>
                I have read and agree to the <u>Terms of Service</u> and <u>Privacy Policy</u>
              </small>
            </label>
          </div>

          <div className="col-md-12 d-flex align-items-end mt-3">
          <button
            type="submit"
            className={`btn w-100 ${
              (isLoading || !formik.values.agree_terms || !formik.isValid) ? 'btn-dark' : 'btn-primary'
            }`}
            disabled={isLoading || !formik.isValid}
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              <strong>Continue</strong>
            )}
          </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Signup;
