import React, { useState, useEffect } from 'react';
import { Space, Table, Card, message as MessageNot, Modal, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../Common/Spinner';
import { deleteIncome, getIncomes, reset } from '../../../features/incomes/incomeSlice';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import AddIncome from '../AddIncome';
import './IncomeList.css';

const { Meta } = Card;

const IncomeList = (props) => {
  const { searchIncomeData } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [modalId, setModalId] = useState(0);
  const { height, width } = useWindowDimensions();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { incomes, isError, message, isSuccess, isLoading } = useSelector((state) => state.incomes);
  const { user } = useSelector((state) => state.auth);

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

  const cancel = () => {
    return false;
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
            <Popconfirm
              title='Are you sure to delete this income?'
              description='Are you sure to delete this income?'
              onConfirm={() => deleteIncomeHandler(record._id)}
              onCancel={cancel}
              placement='left'
              okText='Yes'
              cancelText='No'>
              <DeleteOutlined />
            </Popconfirm>
          </span>
        </Space>
      )
    }
  ];

  useEffect(() => {
    if (isError) {
      MessageNot.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getIncomes(searchIncomeData));

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch, searchIncomeData]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {width <= 680 ? (
        <div className='module-grid-container'>
          {incomes &&
            incomes.map((item) => {
              return (
                <Card
                  key={item._id}
                  className='module-grid-card'
                  actions={[
                    <EditOutlined key='edit' onClick={() => editIncomeHandler(item._id)} />,
                    <Popconfirm
                      title='Are you sure to delete this income?'
                      description='Are you sure to delete this income?'
                      onConfirm={() => deleteIncomeHandler(item._id)}
                      onCancel={cancel}
                      placement='top'
                      okText='Yes'
                      cancelText='No'
                      key='delete'>
                      <DeleteOutlined />
                    </Popconfirm>
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
                    description={item.category_id?.category_name}
                  />
                  <Meta className='meda-card' title='Name:' description={item.income_title} />
                  <i
                    className='table_color'
                    style={{ backgroundColor: item.category_id?.color, width: '60px' }}
                  />
                </Card>
              );
            })}
        </div>
      ) : (
        <div className='module-list-container'>
          <Table
            columns={columns}
            dataSource={incomes}
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
        <AddIncome mode='E' setModalOpen={setModalOpen} modalId={modalId} data={incomes} />
      </Modal>
    </div>
  );
};

export default IncomeList;
