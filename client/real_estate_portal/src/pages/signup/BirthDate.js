import React, { useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const BirthdateForm = () => {
  const apiHost = process.env.REACT_APP_API_HOST;
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state;
  const userId = data.user.id;

  const initialValues = {
    birthdate: data.birthdate || '',
    ssn: data.ssn || '',
  };

  const validationSchema = Yup.object().shape({
    birthdate: Yup.date().required('Date of birth is required'),
    ssn: Yup.string()
      .matches(/^\d{3}-\d{2}-\d{4}$/, 'Enter a valid SSN (e.g., 111-11-1111)')
      .required('Social Security Number is required'),
  });

  const formatSSN = (value) => {
    // Remove non-digit characters
    const ssnDigits = value.replace(/\D/g, '');
    
    // Format SSN as XXX-XX-XXXX
    const formattedSSN = ssnDigits.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
    
    return formattedSSN;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    // Remove non-digit characters to save in the database
    values.ssn = values.ssn.replace(/\D/g, '');
    
    try {
      const userToken = data.user.token;
      const response = await axios.patch(
        `${apiHost}/api/update-user-profile/${userId}/`,
        {
          birthdate: values.birthdate,
          ssn: values.ssn,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${userToken}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('User profile updated successfully:', response.data);
        // Redirect to the next page upon successful update
        navigate('/networth', { state: { data: response.data } });
      } else {
        console.error('Error updating user profile:', response.status);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const maxDate = new Date().toISOString().split('T')[0]; // Get the current date

  return (
    <section
      className="birthdate"
      style={{
        height: '100vh',
        marginLeft: '25%',
        marginRight: '25%',
        marginTop: '5%',
      }}
    >
      <div className="mb-4">
        <h3
          style={{
            fontSize: '2rem',
            lineHeight: '3.5rem',
            fontWeight: '700',
          }}
        >
          What's your date of birth and Social Security Number?
        </h3>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="needs-validation" noValidate>
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <Field
                    type="date"
                    name="birthdate"
                    className="form-control"
                    required
                    max={maxDate} // Set max attribute to the current date
                  />
                  <ErrorMessage
                    name="birthdate"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <Field
                    type="text"
                    name="ssn"
                    className="form-control"
                    placeholder="Social Security Number (e.g., 111-11-1111)"
                    required
                    onChange={(e) => {
                      const formattedSSN = formatSSN(e.target.value);
                      setFieldValue('ssn', formattedSSN);
                    }}
                  />
                  <ErrorMessage
                    name="ssn"
                    component="div"
                    className="text-danger"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-end mt-5 mx-auto">
              <Button
                type="submit"
                variant="primary"
                className="w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="mr-2"
                  />
                ) : null}
                <strong>Press Enter &rarr;</strong>
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default BirthdateForm;
