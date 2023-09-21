import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Spinner, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const BankForm = () => {
  const apiHost = process.env.REACT_APP_API_HOST;
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setIsSubmitting(true);
      const response = await axios.patch(`${apiHost}/api/update-user-profile/${data.user.id}/`, {
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${data.user.token}`,
        },
      });

      if (response.status === 200) {
        navigate('/documents', { state: { data: response.data } }); // Redirect to the next page
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bank" style={{
      height: '100vh',
      marginLeft: '25%',
      marginRight: '25%',
      marginTop: '5%',
    }}>
    <div className="mb-4">
        <h3 style={{ fontSize: '2rem', lineHeight: '3.5rem', fontWeight: '700' }}>
            Link your bank
        </h3>
        <p style={{ fontWeight: '500' }}>
            The next step is to link your bank account to fund your investments.
            Linking your account also allows us to deliver dividend payments directly to your bank in the future.
        </p>
      </div>

      <Formik
        initialValues={{ bankOption: '' }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="needs-validation" noValidate>
            <div className="form-row">
              <div className="col-md-12 pt-5 mb-3">
                <FormGroup className="m-3">
                  <div className='row'>
                    <div className='col-8'>
                        <label>
                            <u className="text-primary"><small><strong>Link bank with Plaid with credentials</strong></small></u>
                        </label>
                        <br />
                        <small>Instantly link your bank <strong>(immediate verification)</strong></small>
                    </div>
                    <div className='col-2'>
                        <strong>&gt;</strong>
                    </div>
                  </div>
                </FormGroup>

                <FormGroup className="m-3">
                  <div className='row'>
                    <div className='col-8'>
                        <label>
                            <u className="text-primary"><small><strong>Link bank with Plaid manually</strong></small></u>
                        </label>
                        <br />
                        <small>Manually enter bank account info <strong>(1-2 business days to verify)</strong></small>
                    </div>
                    <div className='col-2'>
                        <strong>&gt;</strong>
                    </div>
                  </div>
                </FormGroup>

                <FormGroup className="m-3">
                  <div className='row'>
                    <div className='col-8'>
                        <label>
                            <u className="text-primary"><small><strong>Link bank by uploading documents manually</strong></small></u>
                        </label>
                        <br />
                        <small>Upload a picture of a voided check <strong>(105 business days to verify)</strong></small>
                    </div>
                    <div className='col-2'>
                        <strong>&gt;</strong>
                    </div>
                  </div>
                </FormGroup>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-end mt-5 mx-auto">
              <button type="submit" className="btn w-100">
                <strong>I'll do this later &gt;</strong>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default BankForm;
