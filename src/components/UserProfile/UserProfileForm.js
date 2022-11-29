/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, DatePicker, Radio, Upload, message as MessageNot } from 'antd';
import dayjs from 'dayjs';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { getUser, updateUser, reset } from '../../features/users/userSlice';
// import { getUpdatedUser } from '../../features/auth/authSlice';
import Spinner from '../Common/Spinner';
import './UserProfileForm.css';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    MessageNot.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    MessageNot.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const UserProfileForm = () => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [form] = Form.useForm();
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { mydata, isLoading, isError, message, isSuccess } = useSelector((state) => state.users);

  useEffect(() => {
    form.setFieldsValue({
      name: mydata.name,
      email: mydata.email,
      password: '',
      dob: dayjs(mydata.dob),
      gender: mydata.gender,
      contactno: mydata.contact_no
    });
  }, [mydata]);

  useEffect(() => {
    if (isError) {
      MessageNot.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getUser());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const handlerUserSubmit = (values) => {
    const data = {
      id: mydata._id,
      name: values.name,
      email: values.email,
      password: values.password,
      dob: dayjs(values.dob).format('YYYY-MM-DD'),
      contactno: values.contactno,
      gender: values.gender
    };
    dispatch(updateUser(data));

    if (isError) {
      MessageNot.error(message);
    }

    if (isSuccess) {
      // dispatch(getUpdatedUser());
      MessageNot.success('Updated!!!');
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  const formItemLayout =
    width > 480
      ? {
          labelCol: {
            span: 6
          },
          wrapperCol: {
            span: 16
          }
        }
      : {
          labelCol: {
            span: 8
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
    <div className='app-userprofile-form'>
      <div className='userprofile-form'>
        <Form
          {...formItemLayout}
          layout='horizontal'
          autoComplete='off'
          form={form}
          onFinish={handlerUserSubmit}>
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
            label='Name'
            name='name'
            className='antd-user-form-mod'
            rules={[
              {
                required: true,
                message: 'Please enter your name!'
              }
            ]}>
            <Input className='antd-user-form-item-mod' />
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
            <Input className='antd-user-form-item-mod' />
          </Form.Item>
          <Form.Item
            label='Password'
            name='password'
            className='antd-user-form-mod'
            rules={[
              {
                message: 'Please input your password!'
              }
            ]}>
            <Input.Password
              className='antd-user-form-item-mod'
              placeholder='Enter new password'
              autoComplete='new-password'
            />
          </Form.Item>
          <Form.Item label='Date of Birth' name='dob' className='antd-user-form-mod'>
            <DatePicker className='antd-user-form-item-mod' />
          </Form.Item>
          <Form.Item label='Contact' name='contactno' className='antd-user-form-mod'>
            <Input className='antd-user-form-item-mod' />
          </Form.Item>
          <Form.Item label='Gender' name='gender' className='antd-user-form-mod'>
            <Radio.Group className='antd-user-form-item-mod'>
              <Radio value='MALE'>Male</Radio>
              <Radio value='FEMALE'>Female</Radio>
              <Radio value='OTHER'>Other</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item className='antd-user-form-button-mod'>
            <Button htmlType='submit' className='save-user-button'>
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UserProfileForm;
