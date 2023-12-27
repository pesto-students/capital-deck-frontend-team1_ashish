import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { message as MessageNot } from 'antd';
import { getAmountExpensesSummary, reset } from '../../../features/expenses/expenseSlice';
import Spinner from '../../Common/Spinner';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import './AmoutExpenseChart.css';

const AmoutExpenseChart = () => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { expenseamoutsummmary, isLoading, isError, message } = useSelector(
    (state) => state.expenses
  );

  useEffect(() => {
    if (isError) {
      MessageNot.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getAmountExpensesSummary());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const chartlabels = [];
  const chartdata = [];
  const chartcolor = [];
  const chartcolorlight = [];
  let chartWidth = 300;
  let chartMargin = 0;

  if (width < 420) {
    chartWidth = 200;
  } else if (width < 580) {
    chartWidth = 300;
  } else if (width < 680) {
    chartWidth = 400;
  } else if (width < 1280) {
    chartWidth = 200;
  } else {
    chartWidth = 300;
  }
  chartMargin = 0;

  expenseamoutsummmary &&
    expenseamoutsummmary.map((item) => {
      chartlabels.push(item.categoryname);
      chartdata.push(item.totalamount);
      chartcolor.push(item.color);
      chartcolorlight.push(`${item.color}1c`);
    });

  const data = {
    labels: chartlabels,
    datasets: [
      {
        data: chartdata,
        label: 'Leads',
        backgroundColor: chartcolorlight,
        borderColor: chartcolor,
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    legend: {
      display: true,
      position: 'left'
    }
  };

  return (
    <div style={{ marginTop: `${chartMargin}px` }}>
      <p className='card-title'>Expense Ratio</p>
      <Pie data={data} options={options} height={150} width={chartWidth} />
    </div>
  );
};

export default AmoutExpenseChart;
