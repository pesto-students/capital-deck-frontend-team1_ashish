/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input, Radio, message as MessageNot } from 'antd';
import { createCategory } from '../../../features/categories/categorySlice';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import './CategoryForm.css';

const CategoryForm = () => {
  const [formInput, setFormInput] = useState({
    categoryname: '',
    categorytype: 'INCOME',
    categorydesc: '',
    color: '#FA3E3E'
  });
  const [form] = Form.useForm();
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { isError, message, isSuccess } = useSelector((state) => state.categories);

  let formlayout = '';
  if (width > 680) {
    formlayout = 'vertical';
  } else {
    formlayout = 'horizontal';
  }

  const handleNewItem = () => {
    if (formInput.categoryname === '') {
      MessageNot.error('Category name can not be blank !!!');
    } else {
      dispatch(createCategory(formInput));

      if (isError) {
        MessageNot.error(message);
      }

      if (isSuccess) {
        MessageNot.success('Category added successfully!!!');
        form.resetFields();
      }
    }
  };

  return (
    <div className='cat-form-container '>
      <Form
        layout={formlayout}
        form={form}
        onFinish={handleNewItem}
        initialValues={{
          layout: formlayout
        }}>
        <div className='cat-form-title'>Add Category</div>
        <div className='cat-form-control'>
          <div className='cat-form-left'>
            <div className='cat-form-firstrow'>
              <Form.Item name='category' label='Category' className='title-control-item'>
                <Input
                  value={formInput.categoryname}
                  onChange={(e) => {
                    setFormInput({
                      ...formInput,
                      categoryname: e.target.value
                    });
                  }}
                />
              </Form.Item>
              <Form.Item label='Type' name='type'>
                <Radio.Group
                  defaultValue={formInput.categorytype}
                  buttonStyle='solid'
                  value={formInput.categorytype}
                  onChange={(e) => {
                    setFormInput({
                      ...formInput,
                      categorytype: e.target.value
                    });
                  }}>
                  <Radio.Button value='INCOME'>Income</Radio.Button>
                  <Radio.Button value='EXPENSE'>Expense</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label='Color' name='color' className='color-picker-item'>
                <input
                  type='color'
                  name='color'
                  className='color-picker'
                  readOnly
                  value={formInput.color}
                  onChange={(e) => {
                    setFormInput({
                      ...formInput,
                      color: e.target.value
                    });
                  }}
                />
                <i className='las la-eye-dropper' />
              </Form.Item>
            </div>
            <div className='cat-form-secondrow'>
              <Form.Item label='Description' className='desc-form-item'>
                <Input.TextArea
                  rows={2}
                  value={formInput.categorydesc}
                  onChange={(e) => {
                    setFormInput({
                      ...formInput,
                      categorydesc: e.target.value
                    });
                  }}
                />
              </Form.Item>
            </div>
          </div>
          <div className='cat-form-right'>
            <Button htmlType='submit' className='add-cat-button'>
              Add
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CategoryForm;
