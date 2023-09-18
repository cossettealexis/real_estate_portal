import React from 'react';
import { Formik, Form } from 'formik';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const DocumentsForm = () => {
  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here
    console.log(values);
    // You can add your submission logic here
  };

  return (
    <section className="documents" style={{
      height: '100vh',
      marginLeft: '25%',
      marginRight: '25%',
      marginTop: '5%',
    }}>
      <div className="mb-4">
        <h3 style={{ fontSize: '2rem', lineHeight: '3.5rem', fontWeight: '700' }}>
          Upload verification documents
        </h3>
      </div>

      <Formik
        initialValues={{ selectedDocument: '' }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="needs-validation" noValidate>
            <div className="form-row">
              <div className="col-md-12 pt-5 mb-3">
                <div className="card rounded-0 mb-1">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <label>
                        <input
                          type="radio"
                          name="selectedDocument"
                          value="Driver's License (Real Id Compliant)"
                        />
                        <small>Driver's License (Real Id Compliant)</small>
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="card rounded-0 mb-1">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <label>
                        <input
                          type="radio"
                          name="selectedDocument"
                          value="Passport"
                        />
                        <small>Passport</small>
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="card rounded-0 mb-1">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <label>
                        <input
                          type="radio"
                          name="selectedDocument"
                          value="Green Card"
                        />
                        <small>Green Card</small>
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="card rounded-0 mb-1">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <label>
                        <input
                          type="radio"
                          name="selectedDocument"
                          value="Certificate of Formation"
                        />
                        <small>Certificate of Formation</small>
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="card rounded-0 mb-1">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <label>
                        <input
                          type="radio"
                          name="selectedDocument"
                          value="ID"
                        />
                        <small>ID</small>
                      </label>
                    </li>
                  </ul>
                </div>
                <div className="card rounded-0 mb-1">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <label>
                        <input
                          type="radio"
                          name="selectedDocument"
                          value="Other Identification"
                        />
                        <small>Other Identification</small>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-end mt-5 mx-auto">
              <button type="submit" className="btn btn-primary w-100">
                Upload selected document &gt;
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default DocumentsForm;
