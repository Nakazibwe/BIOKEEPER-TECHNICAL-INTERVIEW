import React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context';
import { useNavigate } from 'react-router-dom';

const EditStaff = () => {
 const navigate = useNavigate();
 const { accessToken, staffId } = useContext(AppContext);
  const [data, setData] = useState('');
  const [message, setMessage] = useState('');
  const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
  useEffect(()=>{
    const fetchData = async() => {
        try {
           const response = await axios.get(
             `http://localhost:4000/api/staff/${staffId}`,
             config
           );
        if (response.status === 200) {
          setData(response.data);
        } 
        } catch (error) {
        setMessage(error.response.data.error);
        }
    }
    fetchData();
  },[]);

  const initialValues = {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    role: data.role,
    level:data.level,
    reports_to: data.reports_to,
  };
  const nonumber = /^[A-Za-z ]+$/;
  const capitalize = /^[A-Z][a-z]/;
  const validationSchema = Yup.object({
    firstname: Yup.string()
      .min(3, 'Firstname must be at least 3 characters')
      .max(50, 'Firstname must be at most 50 characters')
      .matches(capitalize, 'Firstname must start with a capital letter ')
      .matches(nonumber, 'Firstname must be alphabets only'),
    lastname: Yup.string()
      .min(3, 'Lastname must be at least 3 characters')
      .max(50, 'Lastname must be at most 50 characters')
      .matches(capitalize, 'Lastname must start with a capital letter')
      .matches(nonumber, 'Lastname must be alphabets only'),
    email: Yup.string().email('Invalid email address'),
    role: Yup.string().min(3, 'Role must be at least 3 characters'),
    level: Yup.string(),
    reports_to: Yup.string().min(3, 'Reports to must be at least 3 characters'),
  });

  

  const onSubmit = async (values, formik) => {
    try {
    
      const response = await axios.patch(
        `http://localhost:4000/api/staff/${staffId}`,
        values,
        config
      );
      if (response.status === 200) {
        setMessage(response.data.message);

        setTimeout(() => {
          navigate('/', { replace: true });
        }, 1000);
      }
      formik.setSubmitting(false);
    } catch (error) {
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
              Staff Update
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
              {message}
            </small>
          </Grid>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {(formik)=> {
                return (
                  <Form>
                    <Grid item xs={6} md={8} className='staffcreation-grid'>
                      <div className='left-div'>
                        <small className='input-label'>Staff First name</small>
                        <br />
                        <Field
                          type='text'
                          name='firstname'
                          className='left-input'
                          value={
                            formik.values.firstname
                              ? formik.values.firstname
                              : data.firstname
                          }
                        />
                        <br />
                        <ErrorMessage name='firstname'>
                          {(msg) => (
                            <small className='error-message'>{msg}</small>
                          )}
                        </ErrorMessage>
                      </div>
                      <div className='right-div'>
                        <small className='input-label'>Staff Last name</small>
                        <br />
                        <Field
                          type='text'
                          name='lastname'
                          className='right-input'
                          value={
                            formik.values.lastname
                              ? formik.values.lastname
                              : data.lastname
                          }
                        />
                        <br />
                        <ErrorMessage name='lastname'>
                          {(msg) => (
                            <small className='error-message'>{msg}</small>
                          )}
                        </ErrorMessage>
                      </div>
                    </Grid>
                    <Grid item xs={6} md={8} className='staffcreation-grid'>
                      <div className='left-div'>
                        <small className='input-label'>Staff Email</small>
                        <br />
                        <Field
                          type='text'
                          name='email'
                          className='left-input'
                          value={
                            formik.values.email
                              ? formik.values.email
                              : data.email
                          }
                        />
                        <br />
                        <ErrorMessage name='email'>
                          {(msg) => (
                            <small className='error-message'>{msg}</small>
                          )}
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
                          <option
                            value={
                              formik.values.level
                                ? formik.values.level
                                : data.level
                            }
                          >
                            {data.level}
                          </option>
                          <option value='0'>0</option>
                          <option value='1'>1</option>
                          <option value='2'>2</option>
                          <option value='3'>3</option>
                          <option value='4'>4</option>
                        </Field>
                        <br />
                        <ErrorMessage name='level'>
                          {(msg) => (
                            <small className='error-message'>{msg}</small>
                          )}
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
                          <option
                            value={
                              formik.values.role
                                ? formik.values.role
                                : data.role
                            }
                          >
                            {data.role}
                          </option>
                          <option value='Board of Directors'>
                            Board of Directors
                          </option>
                          <option value='CEO'>CEO</option>
                          <option value='CTO'>CTO</option>
                          <option value='Staff Director'>Staff Director</option>
                          <option value='Volunteer Director'>
                            Volunteer Director
                          </option>
                          <option value='Finance Director'>
                            Finance Director
                          </option>
                          <option value='Communications Director'>
                            Communications Director
                          </option>
                          <option value='Fundraising Director'>
                            Fundraising Director
                          </option>
                          <option value='Program Director'>
                            Program Director
                          </option>
                          <option value='Operations Director'>
                            Operations Director
                          </option>
                        </Field>
                        <br />
                        <ErrorMessage name='role'>
                          {(msg) => (
                            <small className='error-message'>{msg}</small>
                          )}
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
                          <option
                            value={
                              formik.values.reports_to
                                ? formik.values.reports_to
                                : data.reports_to
                            }
                          >
                            {data.reports_to}
                          </option>
                          <option value='Board of Directors'>
                            Board of Directors
                          </option>
                          <option value='CEO'>CEO</option>
                          <option value='CTO'>CTO</option>
                          <option value='Staff Director'>Staff Director</option>
                          <option value='Volunteer Director'>
                            Volunteer Director
                          </option>
                          <option value='Finance Director'>
                            Finance Director
                          </option>
                          <option value='Communications Director'>
                            Communications Director
                          </option>
                          <option value='Fundraising Director'>
                            Fundraising Director
                          </option>
                          <option value='Program Director'>
                            Program Director
                          </option>
                          <option value='Operations Director'>
                            Operations Director
                          </option>
                        </Field>
                        <br />
                        <ErrorMessage name='reports_to'>
                          {(msg) => (
                            <small className='error-message'>{msg}</small>
                          )}
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
                          Update Staff
                        </small>
                      </button>
                    </Grid>
                  </Form>
                );
            }}
            
          </Formik>
        </Box>
      </Container>
    </>
  );
}

export default EditStaff;
