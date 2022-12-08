/* eslint-disable array-callback-return */
import React from 'react';
import { FundTwoTone } from '@ant-design/icons';
import './IncomeSummary.css';

const IncomeSummary = (props) => {
  const { data } = props;
  let totalIncome = 0;
  let lastIncome = 0;
  let avgIncome = 0;

  if (data.length !== 0) {
    if (data.totalincome.length !== 0) {
      totalIncome = data.totalincome[0].income_amount;
    }
    if (data.lastincome.length !== 0) {
      lastIncome = data.lastincome[0].income_amount;
    }
    if (data.averageincome.length !== 0) {
      let total = 0;
      let count = 0;
      data.averageincome.map((item) => {
        total += item.income_amount;
        count += 1;
      });

      avgIncome = total / count;
    }
  }

  return (
    <div className='module-summary-container'>
      <div>
        <span className='summary-title'>
          <FundTwoTone twoToneColor='#eb2f96' />
          Total Incomes
        </span>
        <span className='summary-data'>{totalIncome.toFixed(2)} ₹</span>
      </div>
      <div>
        <span className='summary-title'>
          <FundTwoTone twoToneColor='#eb2f96' />
          Last Month Incomes
        </span>
        <span className='summary-data'>{lastIncome.toFixed(2)} ₹</span>
      </div>
      <div>
        <span className='summary-title'>
          <FundTwoTone twoToneColor='#eb2f96' />
          Average Incomes (Monthy)
        </span>
        <span className='summary-data'>{avgIncome.toFixed(2)} ₹</span>
      </div>
    </div>
  );
};

export default IncomeSummary;
