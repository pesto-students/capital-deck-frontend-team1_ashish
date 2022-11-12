import React from 'react';
import { Grid, Paper, TextField, Button } from '@mui/material';
import '../../common_css/Form.css';

const SignUpForm = () => {
  const paperStyle = {
    padding: '25px 30px 40px',
    width: '300px',
    margin: 'auto auto',
    borderRadius: '8px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)'
  };
  const formStyle = {
    margin: '15px 0px'
  };
  const formBtnStyle = {
    margin: '20px 0px 10px 0px',
    backgroundColor: '#285AC5',
    fontWeight: 'bold',
    borderRadius: '8px'
  };

  return (
    <div className='form-container'>
      <Grid align='center'>
        <Paper elevation={20} style={paperStyle}>
          <p className='form-label'>Sign Up</p>
          <form>
            <TextField
              style={formStyle}
              variant='outlined'
              required
              fullWidth
              id='firstName'
              label='First Name'
              name='firstName'
            />
            <TextField
              style={formStyle}
              variant='outlined'
              required
              fullWidth
              id='lastName'
              label='Last Name'
              name='lastName'
            />
            <TextField
              style={formStyle}
              variant='outlined'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
            />
            <TextField
              style={formStyle}
              variant='outlined'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
            />
            <TextField
              style={formStyle}
              variant='outlined'
              required
              fullWidth
              name='cpassword'
              label='Confirm Password'
              type='password'
              id='cpassword'
            />
          </form>
          <div>
            <Button
              style={formBtnStyle}
              type='submit'
              fullWidth
              variant='contained'
              color='primary'>
              Sign Up
            </Button>
          </div>
        </Paper>
      </Grid>
    </div>
  );
};

export default SignUpForm;
