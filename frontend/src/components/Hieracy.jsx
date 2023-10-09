import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import avatar from './avatar.jpeg';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SouthIcon from '@mui/icons-material/South';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../context';


const Hieracy = () => {
  const [data, setData] = useState('');
  const [message, setMessage] = useState('')
  const { accessToken, setStaffId } = useContext(AppContext);
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
          `http://localhost:4000/api/staff`,
          config
        );
        if (response.status === 200) {
          setData(response.data);
          
        }
      } catch (error) {
        setMessage(error.response.data.error);
      }
    };
    fetchData();
  }, []);
  const attachStaffId = (staffid) => {
    setStaffId(staffid);
  };
  
  const Card = ({ firstname, lastname, email, role, id, attachStaffId }) => {
    return (
      <div className='card'>
        <div style={{ textAlign: 'center', margin: 'auto' }}>
          <div>
            <img src={avatar} height='50px' weight='50px' alt='avatar' />
            <Link
              to={`/staff/${id}`}
              style={{ textDecoration: 'none' }}
              onClick={() => attachStaffId(id)}
            >
              <EditIcon
                style={{
                  color: 'green',
                  fontSize: '18px',
                  marginRight: '2%',
                  marginBottom: '8%',
                }}
              />
            </Link>
            <Link to={`/deletestaff/${id}`} style={{ textDecoration: 'none' }}>
              <DeleteForeverIcon
                style={{ color: 'red', fontSize: '18px', marginBottom: '8%' }}
                onClick={() => attachStaffId(id)}
              />
            </Link>
          </div>
          <small
            style={{ fontWeight: '700', fontSize: '15px', marginRight: '3%' }}
          >
            {firstname}
          </small>
          <small style={{ fontWeight: '700', fontSize: '15px' }}>
            {lastname}
          </small>
          <br />
          <small style={{ color: 'grey', fontWeight: '500' }}>{role}</small>
          <br />
          <small
            style={{
              color: 'grey',
              fontSize: '12px',
              fontWeight: '500',
            }}
          >
            {email}
          </small>
        </div>
      </div>
    );
  };

  return (
    <>
      <Container className='hieracy-container'>
        <Box className='cards-container'>
          {data.length === 0 ? (
            <Grid item xs={4} md={6} className='creationgrid'>
              <h4>No staff available</h4>
              <Link to='/addstaff' className='creation-link'>
                <small>Add Staff</small>
              </Link>
            </Grid>
          ) : (
            <>
              <Grid item xs={4} md={6} className='creationgrid'>
                <Link to='/addstaff' className='creation-link'>
                  <small>Add Staff</small>
                </Link>
              </Grid>
              <Grid item xs={6} md={8} className='hieracial-grid'>
                {data && data.length !== 0
                  ? data
                      .filter((employee) => employee.level === '0')
                      .map((employee) => (
                        <Card
                          firstname={employee.firstname}
                          lastname={employee.lastname}
                          role={employee.role}
                          email={employee.email}
                          id={employee._id}
                          attachStaffId={attachStaffId}
                        />
                      ))
                  : null}
              </Grid>
              <Grid item xs={6} md={8} className='hieracial-grid'>
                {data && data.length !== 0
                  ? data
                      .filter((employee) => employee.level === '1')
                      .map((employee) => (
                        <Card
                          firstname={employee.firstname}
                          lastname={employee.lastname}
                          role={employee.role}
                          email={employee.email}
                          id={employee._id}
                          attachStaffId={attachStaffId}
                        />
                      ))
                  : null}
              </Grid>
              <Grid item xs={6} md={8} className='hieracial-grid'>
                {data && data.length !== 0
                  ? data
                      .filter((employee) => employee.level === '2')
                      .map((employee) => (
                        <Card
                          firstname={employee.firstname}
                          lastname={employee.lastname}
                          role={employee.role}
                          email={employee.email}
                          id={employee._id}
                          attachStaffId={attachStaffId}
                        />
                      ))
                  : null}
              </Grid>
              <Grid item xs={6} md={8} className='hieracial-grid'>
                {data && data.length !== 0
                  ? data
                      .filter((employee) => employee.level === '3')
                      .map((employee) => (
                        <Card
                          firstname={employee.firstname}
                          lastname={employee.lastname}
                          role={employee.role}
                          email={employee.email}
                          id={employee._id}
                          attachStaffId={attachStaffId}
                        />
                      ))
                  : null}
              </Grid>
            </>
          )}
        </Box>
      </Container>
    </>
  );
 
}

export default Hieracy;
