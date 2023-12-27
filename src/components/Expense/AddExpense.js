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
  getCategoriesByExpense,
  reset,
  createCategoryForExpense
} from '../../features/categories/categorySlice';
import { createExpense, updateExpense } from '../../features/expenses/expenseSlice';
import Spinner from '../Common/Spinner';
import { baseUploadURL } from '../../util/BaseUrl';

const fileprops = {
  name: 'file',
  multiple: false,
  headers: {
    authorization: 'authorization-text'
  }
};

const AddExpense = (props) => {
  const { mode, setModalOpen, modalId, data } = props;
  const [form] = Form.useForm();
  const [newItem, setNewItem] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categoriesByExpense, isError, message } = useSelector((state) => state.categories);
  const { isLoading } = useSelector((state) => state.expenses);
  const [attachment, setAttachment] = useState({ path: '', name: '' });

  useEffect(() => {
    if (mode === 'E') {
      const filteredData = data.filter((item) => {
        return item._id === modalId;
      });

      if (filteredData[0].file_path) {
        setAttachment({
          ...attachment,
          path: filteredData[0].file_path,
          name: filteredData[0].file_name
        });
      }
      form.setFieldsValue({
        date: dayjs(filteredData[0].expense_date),
        name: filteredData[0].expense_title,
        amount: filteredData[0].expense_amount,
        category: filteredData[0].category_id?._id,
        upload: ''
      });
    }
  }, [modalId]);

  useEffect(() => {
    if (isError) {
      MessageNot.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getCategoriesByExpense());
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
      createCategoryForExpense({
        categoryname: newItem,
        categorytype: 'EXPENSE',
        categorydesc: '',
        color: '#FA3E3E'
      })
    );
    setNewItem('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handlerExpenseSubmit = (values) => {
    if (values.date === '') {
      MessageNot.error('Date can not be blank !!!');
      return;
    }
    if (values.name === '') {
      MessageNot.error('Name can not be blank !!!');
      return;
    }
    if (values.amount === '') {
      MessageNot.error('Amount can not be blank !!!');
      return;
    }

    let attachement = '';
    if (values.upload) {
      attachement = values.upload.file.originFileObj;
    }
    const newdata = {
      date: dayjs(values.date).format('YYYY-MM-DD HH:MM'),
      name: values.name,
      amount: values.amount,
      categoryid: values.category,
      file: attachement
    };

    if (mode === 'E') {
      newdata.expenseid = modalId;
      dispatch(updateExpense(newdata));
      MessageNot.success('Expense updated successfully!!!');
    } else {
      dispatch(createExpense(newdata));
      MessageNot.success('Expense added successfully!!!');
    }
    form.resetFields();
    setAttachment({
      ...attachment,
      path: '',
      name: ''
    });
    setModalOpen(false);
  };

  return (
    <div className='app-form'>
      <Form layout='vertical' autoComplete='off' form={form} onFinish={handlerExpenseSubmit}>
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
              message: 'Please enter expense name!'
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
              message: 'Please enter expense amount!'
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
            options={categoriesByExpense.map((item) => ({
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
        <Form.Item>
          {attachment.path !== '' ? (
            <a target='_blank' href={`${baseUploadURL}${attachment.path}`} rel='noreferrer'>
              {attachment.name}
            </a>
          ) : (
            <></>
          )}
        </Form.Item>
        <Form.Item className='modal-button'>
          <Button
            style={{
              margin: '0 8px'
            }}
            onClick={() => {
              setAttachment({
                ...attachment,
                path: '',
                name: ''
              });
              setModalOpen(false);
            }}>
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

export default AddExpense;
