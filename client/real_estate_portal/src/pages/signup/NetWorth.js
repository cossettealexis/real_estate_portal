import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Spinner, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const NetworthForm = () => {
  const apiHost = process.env.REACT_APP_API_HOST;
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    networth: '',
  };

  const networthOptions = [
    'Less than $1,000',
    '$1,000 - $10,000',
    '$10,001 - $50,000',
    '$50,001 - $100,000',
    '$100,001 - $500,000',
    '$500,001 - $1,000,000',
    '$1,000,001 - $5,000,000',
    'More than $5,000,000',
  ];

  const validationSchema = Yup.object().shape({
    networth: Yup.string().required('Net worth is required'),
  });

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const response = await axios.patch(`${apiHost}/api/update-user-profile/${data.user.id}/`, {
        networth: values.networth,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${data.user.token}`,
        },
      });

      if (response.status === 200) {
        console.log('User profile updated successfully:', response.data);
        navigate('/bank', { state: { data: response.data } }); // Redirect to the next page
      } else {
        console.error('Error updating user profile:', response.status);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className="networth"
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
          What is your estimated net worth?
        </h3>
        <p style={{ fontWeight: '500' }}>
          We want to make the wealth-building potential of owning rental homes & vacation rentals more accessible.
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="needs-validation" noValidate>
          <div className="form-row">
            <div className="col-md-12 mb-3">
              <FormGroup>
                <Field
                  as="select"
                  name="networth"
                  className="form-control"
                  required
                >
                  <option value="" disabled>
                    Select net worth
                  </option>
                  {networthOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Field>
              </FormGroup>
              <ErrorMessage
                name="networth"
                component="div"
                className="text-danger"
              />
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-end mt-5 mx-auto">
            <Button
              type="submit"
              className="btn btn-primary w-100"
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
              ) : (
                <strong>Press Enter &rarr;</strong>
              )}
            </Button>
          </div>
        </Form>
      </Formik>
    </section>
  );
};

export default NetworthForm;
