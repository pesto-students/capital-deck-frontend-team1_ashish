import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { message as MessageNot } from 'antd';
import { FundTwoTone } from '@ant-design/icons';
import { getIncomesSummary, reset } from '../../../features/incomes/incomeSlice';
import Spinner from '../../Common/Spinner';
import './IncomeSummary.css';

const IncomeSummary = (props) => {
  const { searchIncomeData } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { incomesummary, isLoading, isError, message } = useSelector((state) => state.incomes);

  let totalIncome = 0;
  let lastIncome = 0;
  let avgIncome = 0;

  if (incomesummary.length !== 0) {
    if (incomesummary.totalincome.length !== 0) {
      totalIncome = incomesummary.totalincome[0].income_amount;
    }
    if (incomesummary.lastincome.length !== 0) {
      lastIncome = incomesummary.lastincome[0].income_amount;
    }
    if (incomesummary.averageincome.length !== 0) {
      let total = 0;
      let count = 0;
      incomesummary.averageincome.map((item) => {
        total += item.income_amount;
        count += 1;
      });

      avgIncome = total / count;
    }
  }

  useEffect(() => {
    if (isError) {
      MessageNot.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getIncomesSummary());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch, searchIncomeData]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='module-summary-container'>
      <div>
        <span className='summary-title'>
          <FundTwoTone twoToneColor='#73ca5d' />
          Total Incomes
        </span>
        <span className='summary-data'>{totalIncome.toFixed(2)} ₹</span>
      </div>
      <div>
        <span className='summary-title'>
          <FundTwoTone twoToneColor='#73ca5d' />
          Last Month Incomes
        </span>
        <span className='summary-data'>{lastIncome.toFixed(2)} ₹</span>
      </div>
      <div>
        <span className='summary-title'>
          <FundTwoTone twoToneColor='#73ca5d' />
          Average Incomes (Monthy)
        </span>
        <span className='summary-data'>{avgIncome.toFixed(2)} ₹</span>
      </div>
    </div>
  );
};

export default IncomeSummary;
