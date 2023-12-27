import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, message as MessageNot } from 'antd';
import { login, reset } from '../../features/auth/authSlice';
import Spinner from '../Common/Spinner';
import '../../common_css/Form.css';

const LoginForm = () => {
  const [formInput, setFormInput] = useState({ email: '', password: '' });
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
    dispatch(login(formInput));
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    const demoLogin = { email: 'pestoproject@demomail.com', password: 'Pesto@123' };
    dispatch(login(demoLogin));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='form-container'>
      <p className='login-form-label'>Login</p>
      <Form {...formItemLayout} layout='vertical' form={form} onFinish={handleSubmit}>
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
        <Form.Item>
          <Button htmlType='submit' className='login-button'>
            LOGIN
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            htmlType='submit'
            className='demo-button login-button'
            onClick={(e) => handleDemoSubmit(e)}>
            DEMO
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
