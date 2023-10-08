import React from 'react'
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Formik, Form, Field, ErrorMessage, formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../context';
import { useNavigate } from 'react-router-dom';


const DeleteStaff = () => {
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
   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await axios.get(
           `http://localhost:4000/api/staff/${staffId}`,
           config
         );
         if (response.status === 200) {
           setData(response.data);
           console.log(response.data);
         }
       } catch (error) {
         setMessage(error.response.data.message);
       }
     };
     fetchData();
   }, []);

   const initialValues = {};
   const onSubmit = async (values, formik) => {
     try {
       const response = await axios.delete(
         `http://localhost:4000/api/staff/${staffId}`,
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
       setMessage(error.response.data.message);
     }
   };
   return (
     <>
       <Container className='hieracy-container'>
         <Box className='creation-container'>
           <Grid style={{ display: 'flex' }}>
             <h4
               style={{
                 fontWeight: '600',
                 marginTop: '2%',
                 marginBottom: '2%',
               }}
             >
               Staff Delete
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
           >
             {(formik) => {
               return (
                 <Form>
                   <Grid item xs={6} md={8} className='staffcreation-grid'>
                     <div className='left-div'>
                       <p>Staff First name</p>
                       <small className='input-label'>{data.firstname}</small>
                     </div>
                     <div className='right-div'>
                       <p>Staff Last name</p>
                       <small className='input-label'>{data.lastname}</small>
                     </div>
                   </Grid>
                   <Grid item xs={6} md={8} className='staffcreation-grid'>
                     <div className='left-div'>
                       <p>Staff Email</p>
                       <small className='input-label'>{data.email}</small>
                     </div>
                     <div className='right-div'>
                       <p>Staff Level</p>
                       <small className='input-label'>{data.level}</small>
                     </div>
                   </Grid>
                   <Grid item xs={6} md={8} className='staffcreation-grid'>
                     <div className='left-div'>
                       <p>Staff Role</p>
                       <small className='input-label'>{data.role}</small>
                     </div>
                     <div className='right-div'>
                       <p>Staff Reports to</p>
                       <small className='input-label'>{data.reports_to}</small>
                     </div>
                   </Grid>
                   <Grid item xs={6} md={8} className='staffcreation-grid'>
                     <button
                       type='submit'
                       className='submit-btn'
                       style={{
                         backgroundColor: '#C21807',
                         border: '1px solid red',
                       }}
                     >
                       <small
                         style={{
                           color: '#F0F3F5',
                           fontWeight: '800',
                           fontSize: '12px',
                         }}
                       >
                         Delete Staff
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

export default DeleteStaff;