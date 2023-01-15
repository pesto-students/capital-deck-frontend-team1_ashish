import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { message as MessageNot } from 'antd';
import { FundTwoTone } from '@ant-design/icons';
import { getExpensesSummary, reset } from '../../../features/expenses/expenseSlice';
import Spinner from '../../Common/Spinner';
import './ExpenseSummary.css';

const ExpenseSummary = (props) => {
  const { searchExpenseData } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { expensesummary, isLoading, isError, message } = useSelector((state) => state.expenses);

  let totalExpense = 0;
  let lastExpense = 0;
  let avgExpense = 0;

  if (expensesummary.length !== 0) {
    if (expensesummary.totalexpense.length !== 0) {
      totalExpense = expensesummary.totalexpense[0].expense_amount;
    }
    if (expensesummary.lastexpense.length !== 0) {
      lastExpense = expensesummary.lastexpense[0].expense_amount;
    }
    if (expensesummary.averageexpense.length !== 0) {
      let total = 0;
      let count = 0;
      expensesummary.averageexpense.map((item) => {
        total += item.expense_amount;
        count += 1;
      });

      avgExpense = total / count;
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
  }, [user, navigate, isError, message, dispatch, searchExpenseData]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='module-summary-container'>
      <div>
        <span className='summary-title'>
          <FundTwoTone twoToneColor='#db5858' />
          Total Expenses
        </span>
        <span className='summary-data'>{totalExpense.toFixed(2)} ₹</span>
      </div>
      <div>
        <span className='summary-title'>
          <FundTwoTone twoToneColor='#db5858' />
          Last Month Expenses
        </span>
        <span className='summary-data'>{lastExpense.toFixed(2)} ₹</span>
      </div>
      <div>
        <span className='summary-title'>
          <FundTwoTone twoToneColor='#db5858' />
          Average Expenses (Monthy)
        </span>
        <span className='summary-data'>{avgExpense.toFixed(2)} ₹</span>
      </div>
    </div>
  );
};

export default ExpenseSummary;
