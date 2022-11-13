import React from 'react';
import './Feedback.css';
import { TextField, Button } from '@mui/material';
import logo from '../../assets/capital-deck-logo-d.svg';
import locationIcon from '../../assets/location-icon.svg';
import websiteIcon from '../../assets/web-logo.svg';
import mailIcon from '../../assets/mail-icon.svg';

const Feedback = () => {
  const formStyle = {
    margin: '15px 0px'
  };
  const formBtnStyle = {
    margin: '10px 0px 10px',
    backgroundColor: '#E3E3E3',
    fontWeight: 'bold',
    borderRadius: '8px',
    width: '120px',
    color: '#093E74'
  };

  return (
    <div id='Feedback' className='feedback-section'>
      <div className='feedback-address'>
        <div>
          <img src={logo} height='100' width='200' alt='Logo' />
        </div>
        <div>
          <img src={locationIcon} height='50' width='50' alt='Location Icon' />
          <p>9191 Mayfield Dr. Eau Claire, WI 54701</p>
        </div>
        <div>
          <img src={websiteIcon} height='50' width='50' alt='Website Icon' />
          <p>www.capitaldeck.netlify.com</p>
        </div>
        <div>
          <img src={mailIcon} height='50' width='50' alt='Mail Icon' />
          <p>info@capitaldeck.com</p>
        </div>
      </div>
      <div className='feedback-form'>
        <p className='form-label'>Give us a Message</p>
        <form>
          <TextField
            style={formStyle}
            variant='outlined'
            required
            fullWidth
            id='name'
            label='Your Name'
          />
          <TextField
            style={formStyle}
            variant='outlined'
            required
            fullWidth
            name='password'
            label='Your Email'
            type='email'
            id='email'
          />
          <TextField
            style={formStyle}
            variant='outlined'
            multiline
            rows={2}
            required
            fullWidth
            label='Message'
          />
        </form>
        <div>
          <Button style={formBtnStyle} type='submit' fullWidth variant='contained' color='primary'>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
