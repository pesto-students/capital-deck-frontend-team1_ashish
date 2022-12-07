/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Space, Table, Card, message as MessageNot, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteExpense } from '../../../features/expenses/expenseSlice';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import AddExpense from '../AddExpense';
import './ExpenseList.css';

const { Meta } = Card;

const ExpenseList = (props) => {
  const { data } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalId, setModalId] = useState(0);
  const { height, width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { isError, message, isSuccess } = useSelector((state) => state.expenses);

  let yScroll = 300;

  if (height <= 700) {
    yScroll = 270;
  } else {
    yScroll = 300;
  }

  const deleteExpenseHandler = (id) => {
    dispatch(deleteExpense(id));

    if (isError) {
      MessageNot.error(message);
    }

    if (isSuccess) {
      MessageNot.success('Expense deleted successfully!!!');
    }
  };

  const editExpenseHandler = (id) => {
    setModalOpen(true);
    setModalId(id);
  };

  const columns = [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'index',
      width: '50px',
      render: (text, record, index) => index + 1
    },
    {
      title: 'Name',
      dataIndex: 'expense_title',
      sorter: (a, b) => a.expense_title.length - b.expense_title.length
    },
    {
      title: 'Category',
      dataIndex: 'category_id',
      render: (record) => (
        <i
          style={{
            color: record?.color,
            backgroundColor: `${record?.color}1c`,
            padding: '5px',
            borderRadius: '15px'
          }}>
          {record?.category_name}
        </i>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'expense_amount',
      render: (record) => `${record} ₹`,
      sorter: (a, b) => a.expense_amount - b.expense_amount
    },
    {
      title: 'Date',
      dataIndex: 'expense_date',
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.expense_date) - new Date(b.expense_date)
    },
    {
      title: 'Action',
      key: 'action',
      width: '100px',
      render: (record) => (
        <Space size='large'>
          <span className='table_button'>
            <EditOutlined onClick={() => editExpenseHandler(record._id)} />
          </span>
          <span className='table_button'>
            <DeleteOutlined onClick={() => deleteExpenseHandler(record._id)} />
          </span>
        </Space>
      )
    }
  ];

  return (
    <div>
      {width <= 680 ? (
        <div className='module-grid-container'>
          {data &&
            data.map((item) => {
              return (
                <Card
                  className='module-grid-card'
                  actions={[
                    <EditOutlined key='edit' onClick={() => editExpenseHandler(item._id)} />,
                    <DeleteOutlined key='delete' onClick={() => deleteExpenseHandler(item._id)} />
                  ]}>
                  <Meta className='meda-card' title='Date:' description={item.expense_date} />
                  <Meta
                    className='meda-card'
                    title='Amount:'
                    description={`${item.expense_amount} ₹`}
                  />
                  <Meta
                    className='meda-card'
                    title='Category:'
                    description={item.category_id.category_name}
                  />
                  <Meta className='meda-card' title='Name:' description={item.expense_title} />
                  <i
                    className='table_color'
                    style={{ backgroundColor: item.category_id.color, width: '60px' }}
                  />
                </Card>
              );
            })}
        </div>
      ) : (
        <div className='module-list-container'>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              pageSize: 10
            }}
            scroll={{
              y: yScroll
            }}
            size='small'
          />
        </div>
      )}
      <Modal
        className='app-modal'
        title='Expenses'
        centered
        footer={[]}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setModalId(0);
        }}>
        <AddExpense mode='E' setModalOpen={setModalOpen} modalId={modalId} data={data} />
      </Modal>
    </div>
  );
};

export default ExpenseList;
