/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { Button, Form, Input, message } from 'antd';
import axios from 'axios';
import { baseURL } from '../../util/BaseUrl';
import logo from '../../assets/capital-deck-logo-d.svg';
import locationIcon from '../../assets/location-icon.svg';
import websiteIcon from '../../assets/web-logo.svg';
import mailIcon from '../../assets/mail-icon.svg';
import './Feedback.css';

const Feedback = () => {
  const [formInput, setFormInput] = useState({ name: '', email: '', message: '' });
  const [form] = Form.useForm();
  const formItemLayout = null;

  const handleSubmit = () => {
    axios.post(`${baseURL}/feedback`, formInput).then((response) => {
      if (response.status === 200) {
        message.success('Thank you for sharing this with us');
        form.resetFields();
      } else {
        message.error(response.message);
        form.resetFields();
      }
    });
  };

  return (
    <section id='Feedback' className='section feedback-section'>
      <div className='feedback-address'>
        <div className='feedback-logo'>
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
        <p className='form-label'>Give us a message</p>
        <Form {...formItemLayout} layout='vertical' form={form} onFinish={handleSubmit}>
          <Form.Item
            label='Your Name'
            name='name'
            className='antd-form-item-mod'
            rules={[
              {
                required: true,
                message: 'Please enter your name!'
              }
            ]}>
            <Input
              value={formInput.name}
              className='antd-form-item-textbox-mod'
              onChange={(e) => {
                setFormInput({
                  ...formInput,
                  name: e.target.value
                });
              }}
            />
          </Form.Item>
          <Form.Item
            label='Your Email'
            name='email'
            className='antd-form-item-mod'
            rules={[
              {
                required: true,
                message: 'Please enter your email!',
                type: 'email'
              }
            ]}>
            <Input
              value={formInput.email}
              className='antd-form-item-textbox-mod'
              onChange={(e) => {
                setFormInput({
                  ...formInput,
                  email: e.target.value
                });
              }}
            />
          </Form.Item>
          <Form.Item label='Message' name='message' className='antd-form-item-mod'>
            <Input.TextArea
              rows={3}
              value={formInput.message}
              onChange={(e) => {
                setFormInput({
                  ...formInput,
                  message: e.target.value
                });
              }}
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' className='submit-button'>
              SEND
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};

export default Feedback;
