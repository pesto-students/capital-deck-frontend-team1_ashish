/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import '../../common_css/Form.css';

const LoginForm = () => {
  const [formInput, setFormInput] = useState({ email: '', password: '' });
  const [form] = Form.useForm();
  const formItemLayout = null;

  return (
    <div className='form-container'>
      <p className='login-form-label'>Login</p>
      <Form {...formItemLayout} layout='vertical' form={form}>
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
      </Form>
    </div>
  );
};

export default LoginForm;
