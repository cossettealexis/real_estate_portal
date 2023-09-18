import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS


const AccountTypeForm = () => {
    const initialValues = {
      accountType: '', // You can set the default value if needed
    };
  
    const validationSchema = Yup.object().shape({
      accountType: Yup.string().required('Account type is required'),
    });
  
    const handleSubmit = (values, { setSubmitting }) => {
      // Handle form submission here
      console.log(values);
      // You can add your submission logic here
    };
  
    return (
      <section className="account-type" style={{
        height: '100vh',
        marginLeft: '25%',
        marginRight: '25%',
        marginTop: '5%',
        }}>
        <div className="mb-4">
            <h3 style={{ fontSize: '2rem', lineHeight: '3.5rem', fontWeight: '700' }}>
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
                          <small>LLC, Trust or Corporation</small>
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
  