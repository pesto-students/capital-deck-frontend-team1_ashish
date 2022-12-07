import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { message as MessageNot } from 'antd';
import { getExpenses, getExpensesSummary, reset } from '../features/expenses/expenseSlice';
import Spinner from '../components/Common/Spinner';
import ExpenseSummary from '../components/Expense/ExpenseSummary/ExpenseSummary';
import ExpenseList from '../components/Expense/ExpenseList/ExpenseList';
import ExpenseSearch from '../components/Expense/ExpenseSearch/ExpenseSearch';
import '../common_css/App.css';

const Expense = () => {
  const [searchExpenseData, setSearchExpenseData] = useState({
    categoryid: 0,
    fromdate: '',
    todate: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { expensesummary, expenses, isLoading, isError, message } = useSelector(
    (state) => state.expenses
  );

  useEffect(() => {
    if (isError) {
      MessageNot.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getExpenses(searchExpenseData));
    dispatch(getExpensesSummary());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch, searchExpenseData]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='app-container'>
      <div className='module-upper-container'>
        <ExpenseSearch
          searchExpenseData={searchExpenseData}
          setSearchExpenseData={setSearchExpenseData}
        />
      </div>
      <div className='module-middle-container'>
        <ExpenseSummary data={expensesummary} />
      </div>
      <div className='module-lower-container'>
        <ExpenseList data={expenses} />
      </div>
    </div>
  );
};

export default Expense;
