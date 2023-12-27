import React, { useEffect } from 'react';
import { Table, message as MessageNot } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../Common/Spinner';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { getRecentIncomes, reset } from '../../../features/incomes/incomeSlice';
import './RecentIncome.css';

const RecentIncome = () => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recentincome, isError, message, isLoading } = useSelector((state) => state.incomes);
  const { user } = useSelector((state) => state.auth);

  const yScroll = 150;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'income_title'
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
      width: 100,
      render: (record) => `${record} ₹`
    }
  ];

  if (width > 600) {
    columns.push({
      title: 'Date',
      dataIndex: 'income_date'
    });
  }

  useEffect(() => {
    if (isError) {
      MessageNot.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getRecentIncomes());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='dash-list-container'>
      <p className='card-recent-title'>Recent 5 Incomes</p>
      <Table
        columns={columns}
        dataSource={recentincome}
        pagination={false}
        scroll={{
          y: yScroll
        }}
        size='small'
      />
    </div>
  );
};

export default RecentIncome;
