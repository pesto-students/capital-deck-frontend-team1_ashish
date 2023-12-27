import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { message as MessageNot } from 'antd';
import { FundTwoTone, ArrowUpOutlined } from '@ant-design/icons';
import { getIncomesSummary, reset } from '../../../features/incomes/incomeSlice';
import Spinner from '../../Common/Spinner';
import './DashTotalIncome.css';

const DashTotalIncome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { incomesummary, isLoading, isError, message } = useSelector((state) => state.incomes);

  let totalIncome = 0;
  let lastIncome = 0;
  let lastIncomePer = 0;
  if (incomesummary.length !== 0) {
    if (incomesummary.currentincome.length !== 0) {
      totalIncome = incomesummary.currentincome[0].income_amount;
    }
    if (incomesummary.lastincome.length !== 0) {
      lastIncome = incomesummary.lastincome[0].income_amount;
    }
    if (lastIncome > 0) {
      lastIncomePer = ((totalIncome - lastIncome) / lastIncome) * 100;
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
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='dash-total-income'>
      <span className='summary-title'>
        <FundTwoTone twoToneColor='#73ca5d' />
        Total Income
        <i style={{ marginLeft: '25px' }}>Current Month</i>
      </span>
      <span className='summary-data'>{totalIncome.toFixed(2)} ₹</span>
      <span className='summary-percent'>
        <ArrowUpOutlined />
        {lastIncomePer.toFixed(2)} % <i>from last month</i>
      </span>
    </div>
  );
};

export default DashTotalIncome;
