import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { message as MessageNot } from 'antd';
import { FundTwoTone, ArrowDownOutlined } from '@ant-design/icons';
import { getExpensesSummary, reset } from '../../../features/expenses/expenseSlice';
import Spinner from '../../Common/Spinner';
import './DashTotalExpense.css';

const DashTotalExpense = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { expensesummary, isLoading, isError, message } = useSelector((state) => state.expenses);

  let totalExpense = 0;
  let lastExpense = 0;
  let lastExpensePer = 0;
  if (expensesummary.length !== 0) {
    if (expensesummary.currentexpense.length !== 0) {
      totalExpense = expensesummary.currentexpense[0].expense_amount;
    }
    if (expensesummary.lastexpense.length !== 0) {
      lastExpense = expensesummary.lastexpense[0].expense_amount;
    }

    if (lastExpense > 0) {
      lastExpensePer = ((totalExpense - lastExpense) / lastExpense) * 100;
    }
  }

  useEffect(() => {
    if (isError) {
      MessageNot.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getExpensesSummary());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='dash-total-expense'>
      <span className='summary-title'>
        <FundTwoTone twoToneColor='#db5858' />
        Total Expense
        <i style={{ marginLeft: '25px' }}>Current Month</i>
      </span>
      <span className='summary-data'>{totalExpense.toFixed(2)} ₹</span>
      <span className='summary-percent'>
        <ArrowDownOutlined /> {lastExpensePer.toFixed(2)} % <i>from last month</i>
      </span>
    </div>
  );
};

export default DashTotalExpense;
