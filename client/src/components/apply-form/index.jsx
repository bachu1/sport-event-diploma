import {TextField, TextareaAutosize, Button} from "@material-ui/core";
import * as React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import './index.scss';
import {useHttp} from "../../hooks/http.hook";

const VALIDATION_SCHEMA = Yup.object({
  email: Yup.string().email().required('Please, add email'),
  fullName: Yup.string().required('Please, add full name').min(5, 'Too short'),
  subject: Yup.string().required('Please, add subject').min(5, 'Too short'),
  description: Yup.string()
});

const INITIAL_VALUES = {
  email: '',
  fullName: '',
  subject: '',
  description: ''
};

const ApplyForm = () => {

  const {request} = useHttp();

  const onSubmit = async (values) => {
    try {
      console.log('in onSubmit');
      const data = await request('/api/form/application-form', 'POST', {...values});
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      validationSchema={VALIDATION_SCHEMA}
      onSubmit={onSubmit}
    >
      {({values, handleSubmit, handleReset, setFieldValue, handleBlur, isValid, touched, errors, setFieldTouched}) => (
        <form onSubmit={handleSubmit} className='application-form-main'>
          <h2>Apply Application Form</h2>
          <div className='app-form-item'>
            <TextField
              variant="outlined"
              required
              onBlur={() => setFieldTouched('subject')}
              onChange={(event) => {
                setFieldValue('subject', event.target.value)
              }}
              value={values.subject}
              error={!!touched.subject && !!errors.subject}
              helperText={(!!touched.subject && !!errors.subject) && errors.subject}
              label='Subject'>
            </TextField>
          </div>
          <div className='app-form-item'>
            <TextField
              variant="outlined"
              value={values.fullName}
              onBlur={() => setFieldTouched('fullName')}
              required onChange={(event) => {
              setFieldValue('fullName', event.target.value)
            }}
              error={!!touched.fullName && !!errors.fullName}
              helperText={(!!touched.fullName && !!errors.fullName) && errors.fullName}
              label='Full Name'>
            </TextField>
          </div>
          <div className='app-form-item'>
            <TextField
              variant="outlined"
              value={values.email}
              required onChange={(event) => {
              setFieldValue('email', event.target.value)
            }}
              onBlur={() => setFieldTouched('email')}
              error={!!touched.email && !!errors.email}
              helperText={(!!touched.email && !!errors.email) && errors.email}
              label='Email'>
            </TextField>
          </div>
          <div className='app-form-item app-form-description'>
            <TextareaAutosize
              className='text-area-autosize'
              aria-label="empty textarea"
              placeholder="Description"
              value={values.description}
              label='Description'
              onChange={(event) => {
                setFieldValue('description', event.target.value)
              }}
              variant="outlined"
              required
            />
          </div>
          <div className='app-form-item'>
            <Button disabled={!isValid} onClick={handleSubmit} variant="outlined" color="primary">
              SUBMIT
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default ApplyForm
