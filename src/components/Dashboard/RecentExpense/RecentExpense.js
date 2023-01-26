import React, { useEffect } from 'react';
import { Table, message as MessageNot } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../../Common/Spinner';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import { getRecentExpenses, reset } from '../../../features/expenses/expenseSlice';
import './RecentExpense.css';

const RecentExpense = () => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { recentexpense, isError, message, isLoading } = useSelector((state) => state.expenses);
  const { user } = useSelector((state) => state.auth);

  const yScroll = 150;

  const columns = [
    {
      title: 'Name',
      dataIndex: 'expense_title'
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
      width: 100,
      render: (record) => `${record} ₹`
    }
  ];

  if (width > 600) {
    columns.push({
      title: 'Date',
      dataIndex: 'expense_date'
    });
  }

  useEffect(() => {
    if (isError) {
      MessageNot.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getRecentExpenses());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='dash-list-container'>
      <p className='card-recent-title'>Recent 5 Expenses</p>
      <Table
        columns={columns}
        dataSource={recentexpense}
        pagination={false}
        scroll={{
          y: yScroll
        }}
        size='small'
      />
    </div>
  );
};

export default RecentExpense;
