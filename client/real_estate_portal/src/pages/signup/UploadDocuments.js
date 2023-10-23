import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const DocumentsForm = () => {
  const apiHost = process.env.REACT_APP_API_HOST;
  const location = useLocation();
  const navigate = useNavigate();
  const { data } = location.state;
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleFileSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitError(null);

      const formData = new FormData();
      values.files.forEach((file) => {
        formData.append('verification_documents', file);
      });

      await axios.patch(
        `${apiHost}/api/update-user-profile/${data.user.id}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Token ${data.user.token}`,
          },
        }
      );

      setSubmitSuccess(true);
    } catch (error) {
      // If there's an error, set submitError to the error message
      setSubmitError(error.response.data.detail);
    } finally {
      // Don't forget to call setSubmitting(false) when your async logic is done.
      setSubmitting(false);
    }
  };

  return (
    <section
      className="documents"
      style={{
        height: '100vh',
        marginLeft: '25%',
        marginRight: '25%',
        marginTop: '5%',
      }}
    >
      <div className="form-container" style={{ height: '100vh' }}>
        <div className="mb-4">
          <h3
            style={{
              fontSize: '2rem',
              lineHeight: '3.5rem',
              fontWeight: '700',
            }}
          >
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
                          {/* Add more radio buttons for other document types */}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <FieldArray
                    name="files"
                    render={({ remove, push }) => (
                      <div>
                        {values.files.length > 0 && values.files.map((file, index) => (
                          <div key={index}>
                            <input
                              type="file"
                              name={`files.${index}`}
                              onChange={(event) => setFieldValue(`files.${index}`, event.target.files[0])}
                            />
                            <Button type="button" variant="danger" onClick={() => remove(index)}>
                              Remove
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          onClick={() => push(null)}
                        >
                          Add File
                        </Button>
                      </div>
                    )}
                  />
                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    Submit
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
          {/* Notification for successful submission */}
          {submitSuccess && (
            <div className="mt-3">
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
