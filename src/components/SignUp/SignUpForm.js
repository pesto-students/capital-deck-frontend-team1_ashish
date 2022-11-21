/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import '../../common_css/Form.css';

const SignUpForm = () => {
  const [formInput, setFormInput] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  });
  const [form] = Form.useForm();
  const formItemLayout = null;

  return (
    <div className='form-container'>
      <p className='login-form-label'>Sign Up</p>
      <Form {...formItemLayout} layout='vertical' form={form}>
        <Form.Item
          label='Name'
          name='name'
          className='antd-log-form-item-mod'
          rules={[
            {
              required: true,
              message: 'Please enter your name!'
            }
          ]}>
          <Input
            className='antd-log-form-item-textbox-mod'
            value={formInput.name}
            onChange={(e) => {
              setFormInput({
                ...formInput,
                name: e.target.value
              });
            }}
          />
        </Form.Item>
        <Form.Item
          label='Email Address'
          name='email'
          className='antd-log-form-item-mod'
          rules={[
            {
              required: true,
              message: 'Please enter your email!',
              type: 'email'
            }
          ]}>
          <Input
            className='antd-log-form-item-textbox-mod'
            value={formInput.email}
            onChange={(e) => {
              setFormInput({
                ...formInput,
                email: e.target.value
              });
            }}
          />
        </Form.Item>
        <Form.Item
          label='Password'
          name='password'
          className='antd-log-form-item-mod'
          rules={[
            {
              required: true,
              message: 'Please enter your password!'
            }
          ]}>
          <Input.Password
            className='antd-log-form-item-textbox-mod'
            value={formInput.password}
            onChange={(e) => {
              setFormInput({
                ...formInput,
                password: e.target.value
              });
            }}
          />
        </Form.Item>
        <Form.Item
          label='Comfirm Password'
          name='cpassword'
          className='antd-log-form-item-mod'
          rules={[
            {
              required: true,
              message: 'Please enter your confirm password!'
            }
          ]}>
          <Input.Password
            className='antd-log-form-item-textbox-mod'
            value={formInput.cpassword}
            onChange={(e) => {
              setFormInput({
                ...formInput,
                cpassword: e.target.value
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' className='login-button'>
            SIGNUP
          </Button>
        </Form.Item>
      </Form>
      {/* <Grid align='center'>
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
      </Grid> */}
    </div>
  );
};

export default SignUpForm;
