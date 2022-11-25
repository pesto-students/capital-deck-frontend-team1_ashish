/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, DatePicker, Radio, message, Upload } from 'antd';
import './UserProfileForm.css';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const UserProfileForm = () => {
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    dobobj: null,
    gender: '',
    contact: ''
  });
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [form] = Form.useForm();

  const onDateChange = (date, dateString) => {
    setUserProfile({
      ...userProfile,
      dob: dateString,
      dobobj: date
    });
  };

  const formItemLayout = {
    labelCol: {
      span: 6
    },
    wrapperCol: {
      span: 16
    }
  };

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8
        }}>
        Upload
      </div>
    </div>
  );

  return (
    <div className='userprofile-form'>
      <Form {...formItemLayout} layout='horizontal' form={form}>
        <Upload
          name='avatar'
          listType='picture-card'
          className='avatar-uploader'
          showUploadList={false}
          action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
          beforeUpload={beforeUpload}
          onChange={handleChange}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt='avatar'
              style={{
                width: '100%'
              }}
            />
          ) : (
            uploadButton
          )}
        </Upload>
        <Form.Item
          label='User Name'
          name='name'
          className='antd-user-form-mod'
          rules={[
            {
              required: true,
              message: 'Please enter your name!'
            }
          ]}>
          <Input
            value={userProfile.name}
            className='antd-user-form-item-mod'
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
          className='antd-user-form-mod'
          rules={[
            {
              required: true,
              message: 'Please enter your email!',
              type: 'email'
            }
          ]}>
          <Input
            value={userProfile.email}
            className='antd-user-form-item-mod'
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
          className='antd-user-form-mod'
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}>
          <Input.Password
            value={userProfile.password}
            className='antd-user-form-item-mod'
            onChange={(e) => {
              setUserProfile({
                ...userProfile,
                password: e.target.value
              });
            }}
          />
        </Form.Item>
        <Form.Item label='Date of Birth' className='antd-user-form-mod'>
          <DatePicker
            className='antd-user-form-item-mod'
            value={userProfile.dobobj}
            onChange={onDateChange}
          />
        </Form.Item>
        <Form.Item label='Gender' className='antd-user-form-mod'>
          <Radio.Group
            className='antd-user-form-item-mod'
            onChange={(e) => {
              setUserProfile({ ...userProfile, gender: e.target.value });
            }}
            value={userProfile.gender}>
            <Radio value='M'> Male </Radio>
            <Radio value='F'> Female </Radio>
            <Radio value='O'> Other </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='Contact' name='message' className='antd-user-form-mod'>
          <Input
            value={userProfile.contact}
            className='antd-user-form-item-mod'
            onChange={(e) => {
              setUserProfile({
                ...userProfile,
                contact: e.target.value
              });
            }}
          />
        </Form.Item>
        <Form.Item className='antd-user-form-button-mod'>
          <Button htmlType='submit' className='save-user-button'>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserProfileForm;
