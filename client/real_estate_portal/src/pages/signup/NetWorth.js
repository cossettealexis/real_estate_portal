import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const NetworthForm = () => {
  const initialValues = {
    networth: '', // You can set the default value if needed
  };

  const validationSchema = Yup.object().shape({
    networth: Yup.string().required('Net worth is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here
    console.log(values);
    // You can add your submission logic here
  };

  return (
    <section className="networth" style={{
      height: '100vh',
      marginLeft: '25%',
      marginRight: '25%',
      marginTop: '5%',
    }}>
      <div className="mb-4">
        <h3 style={{ fontSize: '2rem', lineHeight: '3.5rem', fontWeight: '700' }}>
            What is your estimated net worth?
        </h3>
        <p style={{ fontWeight: '500' }}>
          We want to make the wealth building potential of owning rental home & vacation rentals more accesible.
        </p>
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
                <FormGroup>
                  <Field
                    type="text"
                    name="networth"
                    as={FormControl}
                    placeholder="$1,0000,001 - $5,000,000" // Set the placeholder here
                    required
                  />
                </FormGroup>
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-end mt-5 mx-auto">
              <button type="submit" className="btn btn-primary w-100">
                <strong>Press Enter &rarr;</strong>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default NetworthForm;
