import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message as MessageNot } from 'antd';
import { register, reset } from '../../features/auth/authSlice';
import Spinner from '../Common/Spinner';
import '../../common_css/Form.css';

const SignUpForm = () => {
  const [formInput, setFormInput] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    dob: ''
  });
  const [form] = Form.useForm();
  const formItemLayout = null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      MessageNot.error(message);
    }

    if (isSuccess || user) {
      navigate('/dashboard');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleSubmit = () => {
    if (formInput.password !== formInput.cpassword) {
      MessageNot.error('Passwords do not match');
    } else {
      dispatch(register(formInput));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='form-container'>
      <p className='login-form-label'>Sign Up</p>
      <Form {...formItemLayout} layout='vertical' form={form} onFinish={handleSubmit}>
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
          label='Confirm Password'
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
    </div>
  );
};

export default SignUpForm;
