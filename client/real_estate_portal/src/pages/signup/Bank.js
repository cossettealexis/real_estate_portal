import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Spinner, FormGroup, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';



const BankForm = () => {
  const apiHost = process.env.REACT_APP_API_HOST;
  const Plaid = require('plaid');
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [linkToken, setLinkToken] = useState('');
  const [apiError, setApiError] = useState(null);


  const handleBankLinkFailure = () => {
    setShowNotification(true);
  };

  useEffect(() => {
    // Fetch the Plaid Link token from your Django API
    axios.get(`${apiHost}/api/get_plaid_link_token/`) // Update the API endpoint as needed
      .then(response => {
        setLinkToken(response.data.link_token);
      })
      .catch(error => {
        setApiError('Error connecting to Plaid.');
      });
  }, []);

  const plaidLinkOptions = {
    token: linkToken, // Your Plaid Link token obtained from the server
    onSuccess: (publicToken, metadata) => {
      handlePlaidLinkSuccess(publicToken, metadata);
    },
  };

  const handlePlaidLinkSuccess = (publicToken, metadata) => {
    // Handle Plaid Link success
    console.log('Plaid Link success - publicToken:', publicToken);
    console.log('Plaid Link success - metadata:', metadata);

    // Optionally, you can send the publicToken to your server for further processing
    // Example:
    // axios.post('/api/process_plaid_link/', { publicToken })
    //   .then(response => {
    //     // Handle the response from the server
    //   })
    //   .catch(error => {
    //     // Handle errors
    //   });
  };

  const handlePlaidLinkClick = () => {
    // Launch Plaid Link when the "Link bank with Plaid with credentials" option is clicked
    const linkHandler = Plaid.create(plaidLinkOptions);
    linkHandler.open();
  };

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

    {showNotification && (
      <div className="notification">
        Link bank is not successful.
      </div>
    )}

    <div className="mb-4">
        <h3 style={{ fontSize: '2rem', lineHeight: '3.5rem', fontWeight: '700' }}>
            Link your bank
        </h3>
        <p style={{ fontWeight: '500' }}>
            The next step is to link your bank account to fund your investments.
            Linking your account also allows us to deliver dividend payments directly to your bank in the future.
        </p>
      </div>

      {apiError && (
        <div className="error-message" style={
          {
            // backgroundColor: '#f44336',
            color: 'red',
            textAlign: 'center',
            padding: '8px',
            marginTop: '10px',
            borderRadius: '5px'
          }
        }>
          {apiError}
        </div>
      )}
      {showNotification && (
        <div className="notification">
          Link bank is not successful.
        </div>
      )}

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
                      <button
                        style={{
                          border: 'none', 
                          background: 'none',
                          fontSize: 'inherit',
                          cursor: 'pointer',
                        }}
                       onClick={() => {
                        handlePlaidLinkClick()
                        }}>
                        <strong>&gt;</strong>
                      </button>
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
                      <button
                        style={{
                          border: 'none', 
                          background: 'none',
                          fontSize: 'inherit',
                          cursor: 'pointer',
                        }}
                       onClick={() => {
                          handleBankLinkFailure();
                        }}>
                        <strong>&gt;</strong>
                      </button>
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
                      <button
                        style={{
                          border: 'none', 
                          background: 'none',
                          fontSize: 'inherit',
                          cursor: 'pointer',
                        }}
                       onClick={() => {
                          handleBankLinkFailure();
                        }}>
                        <strong>&gt;</strong>
                      </button>
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
