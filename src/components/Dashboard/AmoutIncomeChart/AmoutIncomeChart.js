/* eslint-disable array-callback-return */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { message as MessageNot } from 'antd';
import { getAmountIncomesSummary, reset } from '../../../features/incomes/incomeSlice';
import Spinner from '../../Common/Spinner';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import './AmoutIncomeChart.css';

const AmoutIncomeChart = () => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { incomeamoutsummmary, isLoading, isError, message } = useSelector(
    (state) => state.incomes
  );

  useEffect(() => {
    if (isError) {
      MessageNot.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getAmountIncomesSummary());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const chartlabels = [];
  const chartdata = [];
  let chartWidth = 300;
  let chartMargin = 0;

  if (width < 1280) {
    chartWidth = 200;
  } else {
    chartWidth = 300;
  }
  chartMargin = 0;

  incomeamoutsummmary.map((item) => {
    chartlabels.push(item.categoryname);
    chartdata.push(item.totalamount);
  });

  const data = {
    labels: chartlabels,
    datasets: [
      {
        data: chartdata,
        label: 'Leads',
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgb(61, 61, 61, 0.2)'
        ],
        borderColor: [
          'rgba(255, 159, 64, 1)',
          'rgb(61, 61, 61, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'left'
      }
    }
  };

  return (
    <div style={{ marginTop: `${chartMargin}px` }}>
      <p className='card-title'>Income Ratio</p>
      <Pie data={data} options={options} height={150} width={chartWidth} />
    </div>
  );
};

export default AmoutIncomeChart;
