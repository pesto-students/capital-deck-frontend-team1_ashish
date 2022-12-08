import React, { useState } from 'react';
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

  return (
    <div className='app-container'>
      <div className='module-upper-container'>
        <ExpenseSearch
          searchExpenseData={searchExpenseData}
          setSearchExpenseData={setSearchExpenseData}
        />
      </div>
      <div className='module-middle-container'>
        <ExpenseSummary searchExpenseData={searchExpenseData} />
      </div>
      <div className='module-lower-container'>
        <ExpenseList searchExpenseData={searchExpenseData} />
      </div>
    </div>
  );
};

export default Expense;
