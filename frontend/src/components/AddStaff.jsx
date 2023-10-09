import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState, useRef, useContext } from 'react';
import { AppContext } from '../context';
import { useNavigate } from 'react-router-dom';

const AddStaff = () => {
  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    role: '',
    level: '',
    reports_to: '',
  };
  const nonumber = /^[A-Za-z ]+$/;
  const capitalize = /^[A-Z][a-z]/;
  const validationSchema = Yup.object({
    firstname: Yup.string()
      .required('Required')
      .min(3, 'Firstname must be at least 3 characters')
      .max(50, 'Firstname must be at most 50 characters')
      .matches(capitalize, 'Firstname must start with a capital letter ')
      .matches(nonumber, 'Firstname must be alphabets only'),
    lastname: Yup.string()
      .required('Required')
      .min(3, 'Lastname must be at least 3 characters')
      .max(50, 'Lastname must be at most 50 characters')
      .matches(capitalize, 'Lastname must start with a capital letter')
      .matches(nonumber, 'Lastname must be alphabets only'),
    email: Yup.string().required('Required').email('Invalid email address'),
    role: Yup.string()
      .required('Required')
      .min(3, 'Role must be at least 3 characters'),
    level: Yup.string().required('Required'),
    reports_to: Yup.string()
      .required('Required')
      .min(3, 'Reports to must be at least 3 characters'),
  });

  const navigate = useNavigate();
  const { accessToken} = useContext(AppContext);
  const [message,setMessage ] = useState('')
  const onSubmit = async (values, formik) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
      const response = await axios.post(
        'http://localhost:4000/api/staff',
        values,
        config
      );
      if (response.status === 201) {
        setMessage(response.data.message);

        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1000);
      }
      formik.setSubmitting(false);
    } catch (error) {
      console.log(error)
        if (error.response.status === 403) {
          setMessage(error.response.data.error.message);
        }
        setMessage(error.response.data.error);
    }
  };
  return (
    <>
      <Container className='hieracy-container'>
        <Box className='creation-container'>
          <Grid style={{ display: 'flex' }}>
            <h4
              style={{ fontWeight: '600', marginTop: '2%', marginBottom: '2%' }}
            >
              Staff Registration
            </h4>
            <small
              style={{
                marginTop: '2%',
                marginBottom: '2%',
                marginLeft: '20%',
                color: 'purple',
                fontSize: '12px',
              }}
            >
              {message.message ? message.message : message}
            </small>
          </Grid>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <Grid item xs={6} md={8} className='staffcreation-grid'>
                <div className='left-div'>
                  <small className='input-label'>Staff First name</small>
                  <br />
                  <Field type='text' name='firstname' className='left-input' />
                  <br />
                  <ErrorMessage name='firstname'>
                    {(msg) => <small className='error-message'>{msg}</small>}
                  </ErrorMessage>
                </div>
                <div className='right-div'>
                  <small className='input-label'>Staff Last name</small>
                  <br />
                  <Field type='text' name='lastname' className='right-input' />
                  <br />
                  <ErrorMessage name='lastname'>
                    {(msg) => <small className='error-message'>{msg}</small>}
                  </ErrorMessage>
                </div>
              </Grid>
              <Grid item xs={6} md={8} className='staffcreation-grid'>
                <div className='left-div'>
                  <small className='input-label'>Staff Email</small>
                  <br />
                  <Field type='text' name='email' className='left-input' />
                  <br />
                  <ErrorMessage name='email'>
                    {(msg) => <small className='error-message'>{msg}</small>}
                  </ErrorMessage>
                </div>
                <div className='right-div'>
                  <small className='input-label'>Staff Level</small>
                  <br />
                  <Field
                    as='select'
                    name='level'
                    className='right-input'
                    style={{ width: '99%' }}
                  >
                    <option value='default'>Default</option>
                    <option value='0'>0</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                  </Field>
                  <br />
                  <ErrorMessage name='level'>
                    {(msg) => <small className='error-message'>{msg}</small>}
                  </ErrorMessage>
                </div>
              </Grid>
              <Grid item xs={6} md={8} className='staffcreation-grid'>
                <div className='left-div'>
                  <small className='input-label'>Staff Role</small>
                  <br />
                  <Field
                    as='select'
                    name='role'
                    className='left-input'
                    style={{ width: '99%' }}
                  >
                    <option value='default'>Default</option>
                    <option value='Board of Directors'>
                      Board of Directors
                    </option>
                    <option value='CEO'>CEO</option>
                    <option value='CTO'>CTO</option>
                    <option value='Staff Director'>Staff Director</option>
                    <option value='Volunteer Director'>
                      Volunteer Director
                    </option>
                    <option value='Finance Director'>Finance Director</option>
                    <option value='Communications Director'>
                      Communications Director
                    </option>
                    <option value='Fundraising Director'>
                      Fundraising Director
                    </option>
                    <option value='Program Director'>Program Director</option>
                    <option value='Operations Director'>
                      Operations Director
                    </option>
                  </Field>
                  <br />
                  <ErrorMessage name='role'>
                    {(msg) => <small className='error-message'>{msg}</small>}
                  </ErrorMessage>
                </div>
                <div className='right-div'>
                  <small className='input-label'>Staff Reports to</small>
                  <br />
                  <Field
                    as='select'
                    name='reports_to'
                    className='right-input'
                    style={{ width: '99%' }}
                  >
                    <option value='default'>Default</option>
                    <option value='Board of Directors'>
                      Board of Directors
                    </option>
                    <option value='CEO'>CEO</option>
                    <option value='CTO'>CTO</option>
                    <option value='Staff Director'>Staff Director</option>
                    <option value='Volunteer Director'>
                      Volunteer Director
                    </option>
                    <option value='Finance Director'>Finance Director</option>
                    <option value='Communications Director'>
                      Communications Director
                    </option>
                    <option value='Fundraising Director'>
                      Fundraising Director
                    </option>
                    <option value='Program Director'>Program Director</option>
                    <option value='Operations Director'>
                      Operations Director
                    </option>
                  </Field>
                  <br />
                  <ErrorMessage name='reports_to'>
                    {(msg) => <small className='error-message'>{msg}</small>}
                  </ErrorMessage>
                </div>
              </Grid>
              <Grid item xs={6} md={8} className='staffcreation-grid'>
                <button type='submit' className='submit-btn'>
                  <small
                    style={{
                      color: '#F0F3F5',
                      fontWeight: '800',
                      fontSize: '12px',
                    }}
                  >
                    Create Staff
                  </small>
                </button>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Container>
    </>
  );
};

export default AddStaff;
