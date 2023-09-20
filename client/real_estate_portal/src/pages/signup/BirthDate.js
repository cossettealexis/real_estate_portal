import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'; // Import ErrorMessage
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

  // Initialize form values state with data from the API response
  const [formValues, setFormValues] = useState({
    birthdate: data.birthdate || '',
    ssn: data.ssn || '',
  });

  const validationSchema = Yup.object().shape({
    birthdate: Yup.date().required('Date of birth is required'),
    ssn: Yup.string()
      .matches(/^\d{9}$/, 'Social Security Number must be 9 digits')
      .required('Social Security Number is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
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
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="needs-validation" noValidate>
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <div className="form-group">
                  <Field
                    type="date"
                    name="birthdate"
                    className="form-control"
                    placeholder="Birthdate"
                    required
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
                    placeholder="Social Security Number"
                    required
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
