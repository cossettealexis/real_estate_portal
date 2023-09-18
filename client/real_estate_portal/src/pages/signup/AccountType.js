import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Spinner } from 'react-bootstrap'; // Import Spinner
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AccountTypeForm = () => {
  const apiHost = process.env.REACT_APP_API_HOST;

  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state;
  const user_id = data.user.id;

  const initialValues = {
    accountType: '',
  };

  const validationSchema = Yup.object().shape({
    accountType: Yup.string().required('Account type is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Make an API request to update the user profile
      const response = await fetch(`${apiHost}/api/update-user-profile/${user_id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${data.user.token}`,
        },
        body: JSON.stringify({
          account_type: values.accountType,
        }),
      });

      if (response.ok) {
        console.log('User profile updated successfully:', response.data);
        // Redirect to the next page upon successful update
        navigate('/birth-date', { state: { data: response.data } });
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
      className="account-type"
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
          Choose your account type
        </h3>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="needs-validation" noValidate>
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <div className="card">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-4">
                      <div>
                        <strong>Individual</strong>
                        <br />
                        <small>Personal Account (Most Users)</small>
                      </div>
                      <label className="mb-0">
                        <Field
                          type="radio"
                          name="accountType"
                          value="individual"
                          required
                        />
                      </label>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-4">
                      <div>
                        <strong>Entity</strong>
                        <br />
                        <small>LLC, Trust, or Corporation</small>
                      </div>
                      <label className="mb-0">
                        <Field
                          type="radio"
                          name="accountType"
                          value="entity"
                          required
                        />
                      </label>
                    </li>
                  </ul>
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
                {isSubmitting ? ( // Conditional rendering of the spinner
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

export default AccountTypeForm;
