/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Button, Form, Input, DatePicker, Radio } from 'antd';
import '../../common_css/Form.css';

function UserProfile() {
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    dobobj: null,
    gender: '',
    contact: ''
  });
  const [form] = Form.useForm();
  const formItemLayout = null;

  const onDateChange = (date, dateString) => {
    setUserProfile({
      ...userProfile,
      dob: dateString,
      dobobj: date
    });
  };

  return (
    <div className='user-form form-container'>
      <p className='user-label form-label'>User Profile</p>
      <Form {...formItemLayout} layout='vertical' form={form}>
        <Form.Item
          label='User Name'
          name='name'
          className='antd-log-form-item-mod'
          rules={[
            {
              required: true,
              message: 'Please enter your name!'
            }
          ]}>
          <Input
            value={userProfile.name}
            className='antd-log-form-item-textbox-mod'
            onChange={(e) => {
              setUserProfile({
                ...userProfile,
                name: e.target.value
              });
            }}
          />
        </Form.Item>
        <Form.Item
          label='Email'
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
            value={userProfile.email}
            className='antd-log-form-item-textbox-mod'
            onChange={(e) => {
              setUserProfile({
                ...userProfile,
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
              message: 'Please input your password!'
            }
          ]}>
          <Input.Password
            value={userProfile.password}
            className='antd-log-form-item-textbox-mod'
            onChange={(e) => {
              setUserProfile({
                ...userProfile,
                password: e.target.value
              });
            }}
          />
        </Form.Item>
        <Form.Item label='Date of Birth' className='antd-log-form-item-mod'>
          <DatePicker
            className='antd-log-form-item-textbox-mod'
            value={userProfile.dobobj}
            onChange={onDateChange}
          />
        </Form.Item>
        <Form.Item label='Gender' className='antd-log-form-item-mod'>
          <Radio.Group
            className='antd-log-form-item-textbox-mod'
            onChange={(e) => {
              setUserProfile({ ...userProfile, gender: e.target.value });
            }}
            value={userProfile.gender}>
            <Radio value='M'> Male </Radio>
            <Radio value='F'> Female </Radio>
            <Radio value='O'> Other </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='Contact' name='message' className='antd-log-form-item-mod'>
          <Input
            value={userProfile.contact}
            className='antd-log-form-item-textbox-mod'
            onChange={(e) => {
              setUserProfile({
                ...userProfile,
                contact: e.target.value
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' className='login-button'>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default UserProfile;
