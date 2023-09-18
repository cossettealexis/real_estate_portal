import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const BirthdateForm = () => {
  const initialValues = {
    birthdate: '', // You can set the default value if needed
    ssn: '',
  };

  const validationSchema = Yup.object().shape({
    birthdate: Yup.date().required('Date of birth is required'),
    ssn: Yup.string()
      .matches(/^\d{9}$/, 'Social Security Number must be 9 digits')
      .required('Social Security Number is required'),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here
    console.log(values);
    // You can add your submission logic here
  };

  return (
    <section className="birthdate" style={{
      height: '100vh',
      marginLeft: '25%',
      marginRight: '25%',
      marginTop: '5%',
    }}>
      <div className="mb-4">
        <h3 style={{ fontSize: '2rem', lineHeight: '3.5rem', fontWeight: '700' }}>
          What's your date of birth and Social Security Number?
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
                <FormGroup>
                    <Field
                      type="date"
                      name="birthdate"
                      as={FormControl}
                      placeholder="Birthdate"
                      required
                    />
                  </FormGroup>
              </div>
              <div className="col-md-12 mb-3">
                <FormGroup>
                  <Field
                    type="text"
                    name="ssn"
                    as={FormControl}
                    placeholder="Social Security Number"
                    required
                  />
                </FormGroup>
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

export default BirthdateForm;
