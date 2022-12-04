/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useRef } from 'react';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  DatePicker,
  InputNumber,
  Divider,
  Select,
  Space,
  Button,
  Upload,
  message
} from 'antd';
import './AddExpense.css';

const props = {
  name: 'file',
  multiple: false,
  headers: {
    authorization: 'authorization-text'
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};
const AddExpense = ({ mode }) => {
  const [form] = Form.useForm();
  const [items, setItems] = useState(['jack', 'lucy']);
  const [name, setName] = useState('');
  const inputRef = useRef(null);
  const onNameChange = (event) => {
    setName(event.target.value);
  };
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };
  const onOk = (value) => {
    console.log('onOk: ', value);
  };
  console.log(mode);

  const handlerExpenseSubmit = () => {};
  return (
    <div className='app-form'>
      <Form layout='vertical' autoComplete='off' form={form} onFinish={handlerExpenseSubmit}>
        <Form.Item label='Date'>
          <DatePicker
            style={{
              width: '100%'
            }}
            showTime
            onChange={onChange}
            onOk={onOk}
          />
        </Form.Item>
        <Form.Item
          label='Name'
          rules={[
            {
              required: true,
              message: 'Please enter expense name!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Amount'
          rules={[
            {
              required: true,
              message: 'Please enter expense amount!'
            }
          ]}>
          <InputNumber
            style={{
              width: '100%'
            }}
            min='0'
            step='0.01'
            onChange={onChange}
            stringMode
          />
        </Form.Item>
        <Form.Item label='Category'>
          <Select
            style={{
              width: '100%'
            }}
            placeholder='custom dropdown render'
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider
                  style={{
                    margin: '8px 0'
                  }}
                />
                <Space
                  style={{
                    padding: '0 8px 4px'
                  }}>
                  <Input
                    placeholder='Please enter item'
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                  />
                  <Button type='text' icon={<PlusOutlined />} onClick={addItem}>
                    Add item
                  </Button>
                </Space>
              </>
            )}
            options={items.map((item) => ({
              label: item,
              value: item
            }))}
          />
        </Form.Item>
        <Form.Item label='Upload Attachment'>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Choose file</Button>
          </Upload>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddExpense;
