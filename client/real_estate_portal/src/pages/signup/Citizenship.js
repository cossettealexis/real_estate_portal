import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const CitizenshipForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    citizenship: '',
  };

  const validationSchema = Yup.object().shape({
    citizenship: Yup.string().required('Citizenship is required'),
  });

  const handleSubmit = (values) => {
    // Handle form submission here
    console.log('Form values:', values);

    // Redirect to the next page upon successful submission
    navigate('/account-type');
  };

  return (
    <section className="citizenship" id="citizenship" style={{
        height: '100vh',
        marginLeft: '25%',
        marginRight: '25%',
        marginTop: '5%',
      }}>
      <div className="mb-4">
        <h3 style={{ fontSize: '2rem', lineHeight: '3.5rem', fontWeight: '700' }}>
            What's your citizenship?
        </h3>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
          <Form className="needs-validation" noValidate>
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <div className="card">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-4">
                      <div>
                        <strong>U.S. Citizen</strong>
                        <br />
                        <small>I have a U.S. Tax ID</small>
                      </div>
                      <label className="mb-0">
                        <Field type="radio" name="citizenship" value="us_citizen" required />
                      </label>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-4">
                      <div>
                        <strong>U.S. Resident</strong>
                        <br />
                        <small>
                          I have a U.S Tax ID (including work visa holders who intend to stay in the US for the
                          full investment period)
                        </small>
                      </div>
                      <label className="mb-0">
                        <Field type="radio" name="citizenship" value="us_resident" required />
                      </label>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-4">
                      <div>
                        <strong>Non U.S. Citizen or Resident</strong>
                      </div>
                      <label className="mb-0">
                        <Field type="radio" name="citizenship" value="non_us_citizen" required />
                      </label>
                    </li>
                  </ul>
                </div>
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

export default CitizenshipForm;
