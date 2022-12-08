/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Space, Table, Card, message as MessageNot, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteIncome } from '../../../features/incomes/incomeSlice';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import AddIncome from '../AddIncome';
import './IncomeList.css';

const { Meta } = Card;

const IncomeList = (props) => {
  const { data } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalId, setModalId] = useState(0);
  const { height, width } = useWindowDimensions();
  const dispatch = useDispatch();
  const { isError, message, isSuccess } = useSelector((state) => state.incomes);

  let yScroll = 300;

  if (height <= 700) {
    yScroll = 270;
  } else {
    yScroll = 300;
  }

  const deleteIncomeHandler = (id) => {
    dispatch(deleteIncome(id));

    if (isError) {
      MessageNot.error(message);
    }

    if (isSuccess) {
      MessageNot.success('Income deleted successfully!!!');
    }
  };

  const editIncomeHandler = (id) => {
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
      dataIndex: 'income_title',
      sorter: (a, b) => a.income_title.length - b.income_title.length
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
      dataIndex: 'income_amount',
      render: (record) => `${record} ₹`,
      sorter: (a, b) => a.income_amount - b.income_amount
    },
    {
      title: 'Date',
      dataIndex: 'income_date',
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.income_date) - new Date(b.income_date)
    },
    {
      title: 'Action',
      key: 'action',
      width: '100px',
      render: (record) => (
        <Space size='large'>
          <span className='table_button'>
            <EditOutlined onClick={() => editIncomeHandler(record._id)} />
          </span>
          <span className='table_button'>
            <DeleteOutlined onClick={() => deleteIncomeHandler(record._id)} />
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
                    <EditOutlined key='edit' onClick={() => editIncomeHandler(item._id)} />,
                    <DeleteOutlined key='delete' onClick={() => deleteIncomeHandler(item._id)} />
                  ]}>
                  <Meta className='meda-card' title='Date:' description={item.income_date} />
                  <Meta
                    className='meda-card'
                    title='Amount:'
                    description={`${item.income_amount} ₹`}
                  />
                  <Meta
                    className='meda-card'
                    title='Category:'
                    description={item.category_id.category_name}
                  />
                  <Meta className='meda-card' title='Name:' description={item.income_title} />
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
        title='Incomes'
        centered
        footer={[]}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setModalId(0);
        }}>
        <AddIncome mode='E' setModalOpen={setModalOpen} modalId={modalId} data={data} />
      </Modal>
    </div>
  );
};

export default IncomeList;
