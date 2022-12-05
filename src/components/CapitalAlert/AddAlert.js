import React, { useState } from 'react';
import { Form, Input, Radio, Select } from 'antd';

const AddAlert = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [form] = Form.useForm();

  const onRadioHandler = (value) => {
    if (value === 'E' || value === 'M') {
      setComponentDisabled(true);
    } else {
      setComponentDisabled(false);
    }
  };

  const handlerRuleSubmit = () => {};

  return (
    <div className='rule-form'>
      <Form layout='vertical' autoComplete='off' form={form} onFinish={handlerRuleSubmit}>
        <Form.Item
          label='Name'
          name='name'
          className='antd-rule-form-mod'
          rules={[
            {
              required: true,
              message: 'Please enter Rule name!'
            }
          ]}>
          <Input className='antd-rule-form-item-mod' />
        </Form.Item>
        <Radio.Group className='notify-type-group' onChange={(e) => onRadioHandler(e.target.value)}>
          <Radio value='E'>Notify when Expenses exceed Income</Radio>
          <Radio value='M'>Notify Monthly Summary</Radio>
          <Radio value='O'>Notify when match Condition</Radio>
        </Radio.Group>
        <div className='notify-form'>
          <Form.Item label='Income/Expense'>
            <Select disabled={componentDisabled}>
              <Select.Option value='INCOME'>Income</Select.Option>
              <Select.Option value='EXPENSE'>Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Category'>
            <Select disabled={componentDisabled}>
              <Select.Option value='demo'>Category 1</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Amount Limit'>
            <Input disabled={componentDisabled} />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddAlert;
