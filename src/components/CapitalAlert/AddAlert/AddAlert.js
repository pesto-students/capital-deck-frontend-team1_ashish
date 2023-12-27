import React, { useState, useEffect } from 'react';
import { Form, Input, Radio, Select, InputNumber, Button, message as MessageNot } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getCategoriesByExpense,
  getCategoriesByIncome,
  reset
} from '../../../features/categories/categorySlice';
import { createAlert } from '../../../features/alerts/alertSlice';
import Spinner from '../../Common/Spinner';

const AddAlert = (props) => {
  const { mode, setModalOpen, modalId, data } = props;
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [categoryOption, setCategoryOption] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categoriesByExpense, categoriesByIncome, isError, message, isLoading } = useSelector(
    (state) => state.categories
  );

  useEffect(() => {
    if (isError) {
      MessageNot.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getCategoriesByExpense());
    dispatch(getCategoriesByIncome());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    if (mode === 'E') {
      const filteredData = data.filter((item) => {
        return item._id === modalId;
      });

      let categoryId = '';
      if (filteredData[0].notify_type === 'EXCEED' || filteredData[0].notify_type === 'MONTHLY') {
        setComponentDisabled(true);
        categoryId = '';
      } else {
        setComponentDisabled(false);
        categoryId = filteredData[0].category_id;
      }

      if (filteredData[0].category_type === 'EXPENSE') {
        setCategoryOption(categoriesByExpense);
      } else if (filteredData[0].category_type === 'INCOME') {
        setCategoryOption(categoriesByIncome);
      } else {
        setCategoryOption([]);
      }

      form.setFieldsValue({
        title: filteredData[0].alert_title,
        notificationtype: filteredData[0].notify_type,
        type: filteredData[0].category_type,
        category: categoryId,
        amount: filteredData[0].amount_max
      });
    }
  }, [modalId]);

  if (isLoading) {
    return <Spinner />;
  }

  const onRadioHandler = (value) => {
    if (value === 'EXCEED' || value === 'MONTHLY') {
      setComponentDisabled(true);
    } else {
      setComponentDisabled(false);
    }
    form.setFieldsValue({
      type: '',
      category: '',
      amount: ''
    });
    setCategoryOption([]);
  };

  const onTypeHandler = () => {
    form.setFieldsValue({
      category: ''
    });
    if (form.getFieldValue('type') === 'EXPENSE') {
      setCategoryOption(categoriesByExpense);
    } else if (form.getFieldValue('type') === 'INCOME') {
      setCategoryOption(categoriesByIncome);
    } else {
      setCategoryOption([]);
    }
  };

  const handlerRuleSubmit = (values) => {
    if (values.title === '') {
      MessageNot.error('Title can not be blank !!!');
      return;
    }
    if (values.notificationtype === '' || values.notificationtype === undefined) {
      MessageNot.error('Select atleast one notification type !!!');
      return;
    }
    if (values.notificationtype === 'CONDITION') {
      if (values.type === '') {
        MessageNot.error('Income/Expense can not be blank !!!');
        return;
      }
      if (values.category === '') {
        MessageNot.error('Category can not be blank !!!');
        return;
      }
      if (values.amount === '') {
        MessageNot.error('Amount can not be blank !!!');
        return;
      }
    }

    const newdata = {
      alerttitle: values.title,
      amountmax: values.amount,
      notifytype: values.notificationtype,
      categorytype: values.type,
      categoryid: values.category
    };

    dispatch(createAlert(newdata));
    MessageNot.success('Alert added successfully!!!');
    form.resetFields();
    setModalOpen(false);
  };

  return (
    <div className='rule-form'>
      <Form layout='vertical' autoComplete='off' form={form} onFinish={handlerRuleSubmit}>
        <Form.Item
          label='Title'
          name='title'
          className='antd-rule-form-mod'
          rules={[
            {
              required: true,
              message: 'Please enter Rule name!'
            }
          ]}>
          <Input className='antd-rule-form-item-mod' />
        </Form.Item>
        <Form.Item name='notificationtype'>
          <Radio.Group
            className='notify-type-group'
            onChange={(e) => onRadioHandler(e.target.value)}>
            <Radio value='EXCEED'>Notify when Expenses exceed Income</Radio>
            <Radio value='MONTHLY'>Notify Monthly Summary</Radio>
            <Radio value='CONDITION'>Notify when match Condition</Radio>
          </Radio.Group>
        </Form.Item>
        <div className='notify-form'>
          <Form.Item label='Income/Expense' name='type'>
            <Select
              onChange={onTypeHandler}
              disabled={componentDisabled}
              style={{
                width: '100%'
              }}
              options={[
                { label: 'Income', value: 'INCOME' },
                { label: 'Expense', value: 'EXPENSE' }
              ]}
            />
          </Form.Item>
          <Form.Item label='Category' name='category'>
            <Select
              disabled={componentDisabled}
              options={
                categoryOption &&
                categoryOption.map((item) => ({
                  label: item != undefined ? item.category_name : '',
                  value: item != undefined ? item._id : ''
                }))
              }
            />
          </Form.Item>
          <Form.Item label='Amount Limit (₹)' name='amount'>
            <InputNumber
              disabled={componentDisabled}
              style={{
                width: '100%'
              }}
              min='0'
              step='0.01'
              stringMode
            />
          </Form.Item>
        </div>
        {mode === 'E' ? (
          <></>
        ) : (
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
        )}
      </Form>
    </div>
  );
};

export default AddAlert;
