import React, { useState, useContext } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import '../App.css';
import logo from './logo.jpeg';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { AppContext } from '../context';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
 const initialValues = { email: '', password: '' };
 const { setAccessToken} = useContext(AppContext);
 const [ message , setMessage] = useState('');
 const navigate = useNavigate();
 const onSubmit = async (values, formik) => {
   try {
     const config = {
       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
     };
     const response = await axios.post(
       'http://localhost:4000/api/users',
       values,
       config
     );
     if (response.status === 201) {
       setAccessToken(response.data.token);
       navigate('/', { replace: true });
     }
     formik.setSubmitting(false);
   } catch (error) {
     setMessage(error.response.data.error);
   }
 };

 const validationSchema = Yup.object({
   email: Yup.string().required('Required').email('Invalid email address'),
   password: Yup.string().required('Required'),
 });

 const [type, setType] = useState('password');
 const [icon, setIcon] = useState(<VisibilityOffIcon />);

 const showPasswordhandler = () => {
   if (type === 'password') {
     setType('text');
     setIcon(<VisibilityIcon />);
   } else {
     setType('password');
     setIcon(<VisibilityOffIcon />);
   }
 };
 return (
   <>
     <Grid container className='login-container'>
       <Grid md={5} className='ima-ge-container'>
         <img className='ima-ge' src={logo} alt='logo' />
       </Grid>

       <Grid md={6} xs={12} className='form-container-login'>
         <Formik
           initialValues={initialValues}
           onSubmit={onSubmit}
           validationSchema={validationSchema}
         >
           {(formik) => {
             return (
               <Form>
                 <div className='Logo-container-login-smallScreen'>
                   <img className='Logo-login' src={logo} alt='logo' />
                   <h4>BIOKEEPER</h4>
                 </div>
                 <h1>Sign up</h1>
                 <small style={{color:'purple'}}>{message}</small>
                 <div className='input-container'>
                   <label htmlFor='email'>Enter Email</label> <br />
                   <Field
                     className='input-field'
                     type='email'
                     name='email'
                     id='email'
                   />
                   <ErrorMessage name='email'>
                     {(msg) => <p>{msg}</p>}
                   </ErrorMessage>
                 </div>

                 <div className='input-container'>
                   <div className='Forgot-Plink'>
                     <label htmlFor='password'>Enter Password</label> <br />
                   </div>
                   <Field
                     className='input-field'
                     type={type}
                     name='password'
                     id='password'
                   />
                   <ErrorMessage name='password'>
                     {(msg) => <p>{msg}</p>}
                   </ErrorMessage>
                   <div
                     onClick={showPasswordhandler}
                     className='Visibility-icon-login'
                   >
                     {icon}
                   </div>
                 </div>

                 <button className='login-button' type='submit'>
                   Sign up
                 </button>
                 <br />
                 <br />
                 <small style={{ fontSize: '12px', fontWeight: '500' }}>
                   Already have an account?{' '}
                   <Link
                     to='/login'
                     style={{ textDecoration: 'none', color: 'dodgerblue' }}
                   >
                     Sign in
                   </Link>
                 </small>
               </Form>
             );
           }}
         </Formik>
       </Grid>
     </Grid>
     <div>
       <small style={{ color: 'purple', fontSize: '12px' }}> {message}</small>
     </div>
   </>
 );
}

export default Register;
