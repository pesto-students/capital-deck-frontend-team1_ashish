import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { message as MessageNot } from 'antd';
import { getExpensesSummary, reset } from '../../../features/expenses/expenseSlice';
import { getIncomesSummary } from '../../../features/incomes/incomeSlice';
import Spinner from '../../Common/Spinner';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import './ExpenseIncomeBar.css';

function toMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', {
    month: 'short'
  });
}

const ExpenseIncomeBar = () => {
  const { width } = useWindowDimensions();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { expensesummary, isLoading, isError, message } = useSelector((state) => state.expenses);
  const { incomesummary } = useSelector((state) => state.incomes);

  let chartWidth = 350;
  if (width < 340) {
    chartWidth = 200;
  } else if (width < 510) {
    chartWidth = 250;
  } else if (width < 680) {
    chartWidth = 350;
  } else if (width < 820) {
    chartWidth = 200;
  } else if (width < 1280) {
    chartWidth = 250;
  } else {
    chartWidth = 350;
  }

  useEffect(() => {
    if (isError) {
      MessageNot.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getExpensesSummary());
    dispatch(getIncomesSummary());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  let expenseLength = 0;
  let incomeLength = 0;
  const monthData = [];
  const chartDataExpense = [];
  const chartDataIncome = [];

  if (expensesummary.length !== 0) {
    if (expensesummary.averageexpense.length !== 0) {
      expenseLength = expensesummary.averageexpense?.length;
    }
  }
  if (incomesummary.length !== 0) {
    if (incomesummary.averageincome.length !== 0) {
      incomeLength = incomesummary.averageincome?.length;
    }
  }

  if (expenseLength > incomeLength) {
    expensesummary.averageexpense?.map((item) => {
      monthData.push(toMonthName(item._id.month));
    });
  } else {
    incomesummary.averageincome?.map((item) => {
      monthData.push(toMonthName(item._id.month));
    });
  }

  for (let i = 0; i < monthData.length; i += 1) {
    if (expensesummary.averageexpense && expensesummary.averageexpense[i]) {
      chartDataExpense.push(expensesummary.averageexpense[i].expense_amount);
    } else {
      chartDataExpense.push(0);
    }
    if (incomesummary.averageincome && incomesummary.averageincome[i]) {
      chartDataIncome.push(incomesummary.averageincome[i].income_amount);
    } else {
      chartDataIncome.push(0);
    }
  }

  const data = {
    labels: monthData,
    datasets: [
      {
        label: 'Expense',
        data: chartDataExpense,
        axis: 'y',
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 99, 132)',
          'rgb(255, 99, 132)',
          'rgb(255, 99, 132)',
          'rgb(255, 99, 132)',
          'rgb(255, 99, 132)'
        ],
        borderWidth: 1
      },
      {
        label: 'Income',
        data: chartDataIncome,
        axis: 'y',
        fill: false,
        backgroundColor: [
          'rgba(115, 202, 93, 0.2)',
          'rgba(115, 202, 93, 0.2)',
          'rgba(115, 202, 93, 0.2)',
          'rgba(115, 202, 93, 0.2)',
          'rgba(115, 202, 93, 0.2)',
          'rgba(115, 202, 93, 0.2)'
        ],
        borderColor: [
          'rgb(115, 202, 93)',
          'rgb(115, 202, 93)',
          'rgb(115, 202, 93)',
          'rgb(115, 202, 93)',
          'rgb(115, 202, 93)',
          'rgb(115, 202, 93)'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <p className='card-title'>Finance Comparison</p>
      <Bar data={data} options={options} height={150} width={chartWidth} />
    </div>
  );
};

export default ExpenseIncomeBar;
