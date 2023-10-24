import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const DocumentsForm = () => {
  const apiHost = process.env.REACT_APP_API_HOST;
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state;
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [documents, setDocuments] = useState([]);


  const handleFileSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitError(null);
  
      const formData = new FormData();
      formData.append('file', values.file);
      formData.append('user', data.user.id);
  
      const documentResponse = await axios.post(`${apiHost}/api/documents/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${data.user.token}`,
        },
      });

      setSubmitSuccess(true);

      // Fetch and update the user's uploaded documents
      fetchUserDocuments(data.user.id);
    } catch (error) {
      // If there's an error, set submitError to the error message
      setSubmitError(error.response.data.detail);
    } finally {
      // Don't forget to call setSubmitting(false) when your async logic is done.
      setSubmitting(false);
    }
  };

  useEffect(() => {
    // Fetch and update the user's uploaded documents when the component mounts
    fetchUserDocuments(data.user.id);
}, []);

  const fetchUserDocuments = async (userId) => {
    try {

    const response = await axios.get(`${apiHost}/api/documents/?user_id=${userId}`, {
      headers: {
        Authorization: `Token ${data.user.token}`,
      },
    });

      // Set the documents in the state
      setDocuments(response.data.results);
    } catch (error) {
      // Handle errors if necessary
    }
  };

  const getFileNameFromUrl = (url) => {
    const urlParts = url.split('/');
    return decodeURIComponent(urlParts[urlParts.length - 1]);
  };
  

  return (
    <section
      className="documents"
      style={{
        height: '100vh',
        marginLeft: '25%',
        marginRight: '25%',
        marginTop: '5%',
      }}>
      <div className="form-container" style={{ height: '100vh' }}>
        <div className="mb-4">
          <h3 style={{ fontSize: '2rem', lineHeight: '3.5rem', fontWeight: '700' }}>
            Upload verification documents
          </h3>
        </div>

        <div className="row">
          <div className='col-lg-6 col-md-6 col-sm-6' style={{ width: '50%' }}>
            <Formik
              initialValues={{ selectedDocument: 'Driver\'s License (Real Id Compliant)' }}
              onSubmit={handleFileSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="needs-validation" noValidate>
                  {}
                  <div className="form-row">
                    <div className="col-md-12 pt-5 mb-3">
                      <div className="card rounded-0 mb-1">
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            <label>
                              <Field
                                type="radio"
                                name="selectedDocument"
                                value="Driver's License (Real Id Compliant)"
                              />
                              <span style={{ marginLeft: '10px', fontSize: 'small' }}>Driver's License (Real Id Compliant)</span>
                            </label>
                          </li>
                          <li className="list-group-item">
                            <label>
                              <Field type="radio" name="selectedDocument" value="Passport" />
                              <span style={{ marginLeft: '10px', fontSize: 'small' }}>Passport</span>
                            </label>
                          </li>
                          <li className="list-group-item">
                            <label>
                              <Field type="radio" name="selectedDocument" value="Green Card" />
                              <span style={{ marginLeft: '10px', fontSize: 'small' }}>Green Card</span>
                            </label>
                          </li>
                          <li className="list-group-item">
                            <label>
                              <Field
                                type="radio"
                                name="selectedDocument"
                                value="Certificate of Formation"
                              />
                              <span style={{ marginLeft: '10px', fontSize: 'small' }}>Certificate of Formation</span>
                            </label>
                          </li>
                          <li className="list-group-item">
                            <label>
                              <Field type="radio" name="selectedDocument" value="ID" />
                              <span style={{ marginLeft: '10px', fontSize: 'small' }}>ID</span>
                            </label>
                          </li>
                          <li className="list-group-item">
                            <label>
                              <Field
                                type="radio"
                                name="selectedDocument"
                                value="Other Identification"
                              />
                              <span style={{ marginLeft: '10px', fontSize: 'small' }}>Other Identification</span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 mt-5" style={{ width: '50%', height: '50vh', border: '1px dashed #ccc', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Formik
              initialValues={{ file: null }}
              onSubmit={handleFileSubmit}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form className="needs-validation" noValidate>
                  <div className="file-upload-container" style={{ width: '100%' }}>
                    <label htmlFor="file-upload" className='text-secondary' style={{ fontSize: 'small', cursor: 'pointer' }}>
                      Drag and drop or
                      <span style={{ color: 'blue', textDecoration: 'underline', marginLeft: '5px', fontSize: 'small', cursor: 'pointer' }}>
                        Browse   
                      </span>
                      <span> </span>
                      your files (max size: 10mb)
                      <input
                        type="file"
                        id="file-upload"
                        name="file"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        style={{ display: 'none' }}
                        onChange={async (event) => {
                          setFieldValue('file', event.currentTarget.files[0]);
                          try {
                            await handleFileSubmit({ file: event.currentTarget.files[0] }, { setSubmitting: () => {} });
                          } catch (error) {
                            console.error('API error:', error);
                          }
                        }}
                      />
                    </label>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div className="col-lg-6 col-md-6 col-sm-6 mt-3" style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
            <p>Uploaded Documents:</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
              {documents.map(document => (
                <div key={document.id}>
                  <a href={document.file} target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', color: 'black', fontSize: '10px' }}>
                    {getFileNameFromUrl(document.file)}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Notification for successful submission */}
          {submitSuccess && (
            <div className="mt-5">
              <Alert variant="success">
                Document upload successful! <br />
              </Alert>
              <a href='/properties' className='btn btn-primary' variant='primary'>Start Investing</a>
            </div>
          )}

          {/* Notification for submission error */}
          {submitError && (
            <div className="mt-3">
              <Alert variant="danger">
                Error: {submitError}
              </Alert>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DocumentsForm;
