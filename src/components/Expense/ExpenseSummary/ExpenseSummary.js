/* eslint-disable array-callback-return */
import React from 'react';
import { FundTwoTone } from '@ant-design/icons';
import './ExpenseSummary.css';

const ExpenseSummary = (props) => {
  const { data } = props;
  let totalExpense = 0;
  let lastExpense = 0;
  let avgExpense = 0;

  if (data.length !== 0) {
    if (data.totalexpense.length !== 0) {
      totalExpense = data.totalexpense[0].expense_amount;
    }
    if (data.lastexpense.length !== 0) {
      lastExpense = data.lastexpense[0].expense_amount;
    }
    if (data.averageexpense.length !== 0) {
      let total = 0;
      let count = 0;
      data.averageexpense.map((item) => {
        total += item.expense_amount;
        count += 1;
      });

      avgExpense = total / count;
    }
  }

  return (
    <div className='module-summary-container'>
      <div>
        <span className='summary-title'>
          <FundTwoTone twoToneColor='#eb2f96' />
          Total Expenses
        </span>
        <span className='summary-data'>{totalExpense.toFixed(2)} ₹</span>
      </div>
      <div>
        <span className='summary-title'>
          <FundTwoTone twoToneColor='#eb2f96' />
          Last Month Expenses
        </span>
        <span className='summary-data'>{lastExpense.toFixed(2)} ₹</span>
      </div>
      <div>
        <span className='summary-title'>
          <FundTwoTone twoToneColor='#eb2f96' />
          Average Expenses (Monthy)
        </span>
        <span className='summary-data'>{avgExpense.toFixed(2)} ₹</span>
      </div>
    </div>
  );
};

export default ExpenseSummary;
