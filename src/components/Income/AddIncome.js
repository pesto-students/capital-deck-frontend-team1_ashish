/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useRef, useEffect } from 'react';
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
  message as MessageNot
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  getCategoriesByIncome,
  reset,
  createCategoryForIncome
} from '../../features/categories/categorySlice';
import { createIncome } from '../../features/incomes/incomeSlice';
import Spinner from '../Common/Spinner';

const fileprops = {
  name: 'file',
  multiple: false,
  headers: {
    authorization: 'authorization-text'
  }
};

const AddIncome = (props) => {
  const { setModalOpen } = props;
  const [form] = Form.useForm();
  const [newItem, setNewItem] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categoriesByIncome, isError, message } = useSelector((state) => state.categories);
  const { isLoading } = useSelector((state) => state.incomes);

  useEffect(() => {
    if (isError) {
      MessageNot.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getCategoriesByIncome());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const addItem = (e) => {
    e.preventDefault();
    dispatch(
      createCategoryForIncome({
        categoryname: newItem,
        categorytype: 'INCOME',
        categorydesc: '',
        color: '#FA3E3E'
      })
    );
    setNewItem('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handlerIncomeSubmit = (values) => {
    if (values.date === '') {
      MessageNot.error('Date can not be blank !!!');
    }
    if (values.name === '') {
      MessageNot.error('Name can not be blank !!!');
    }
    if (values.amount === '') {
      MessageNot.error('Amount can not be blank !!!');
    }

    let attachement = '';
    if (values.upload) {
      attachement = values.upload.file.originFileObj;
    }
    const data = {
      date: dayjs(values.date).format('YYYY-MM-DD HH:MM'),
      name: values.name,
      amount: values.amount,
      categoryid: values.category,
      file: attachement
    };

    dispatch(createIncome(data));
    MessageNot.success('Income added successfully!!!');
    form.resetFields();
    setModalOpen(false);
  };

  return (
    <div className='app-form'>
      <Form layout='vertical' autoComplete='off' form={form} onFinish={handlerIncomeSubmit}>
        <Form.Item label='Date' name='date'>
          <DatePicker
            style={{
              width: '100%'
            }}
            showTime
          />
        </Form.Item>
        <Form.Item
          label='Name'
          name='name'
          rules={[
            {
              required: true,
              message: 'Please enter income name!'
            }
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label='Amount (₹)'
          name='amount'
          rules={[
            {
              required: true,
              message: 'Please enter income amount!'
            }
          ]}>
          <InputNumber
            style={{
              width: '100%'
            }}
            min='0'
            step='0.01'
            stringMode
          />
        </Form.Item>
        <Form.Item label='Category' name='category'>
          <Select
            style={{
              width: '100%'
            }}
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
                    placeholder='Enter new category'
                    ref={inputRef}
                    value={newItem}
                    onChange={(event) => {
                      setNewItem(event.target.value);
                    }}
                  />
                  <Button type='text' icon={<PlusOutlined />} onClick={addItem}>
                    Add
                  </Button>
                </Space>
              </>
            )}
            options={categoriesByIncome.map((item) => ({
              label: item.category_name,
              value: item._id
            }))}
          />
        </Form.Item>
        <Form.Item label='Upload Attachment' name='upload'>
          <Upload {...fileprops}>
            <Button icon={<UploadOutlined />}>Choose file</Button>
          </Upload>
        </Form.Item>
        <Form.Item className='modal-button'>
          <Button
            style={{
              margin: '0 8px'
            }}
            onClick={() => setModalOpen(false)}>
            Exit
          </Button>
          <Button htmlType='submit' className='modal-save'>
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddIncome;
