import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { message as MessageNot } from 'antd';
import { getIncomes, getIncomesSummary, reset } from '../features/incomes/incomeSlice';
import Spinner from '../components/Common/Spinner';
import IncomeSummary from '../components/Income/IncomeSummary/IncomeSummary';
import IncomeList from '../components/Income/IncomeList/IncomeList';
import IncomeSearch from '../components/Income/IncomeSearch/IncomeSearch';
import '../common_css/App.css';

const Income = () => {
  const [searchIncomeData, setSearchIncomeData] = useState({
    categoryid: 0,
    fromdate: '',
    todate: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { incomesummary, incomes, isLoading, isError, message } = useSelector(
    (state) => state.incomes
  );

  useEffect(() => {
    if (isError) {
      MessageNot.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getIncomes(searchIncomeData));
    dispatch(getIncomesSummary());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch, searchIncomeData]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='app-container'>
      <div className='module-upper-container'>
        <IncomeSearch
          searchIncomeData={searchIncomeData}
          setSearchIncomeData={setSearchIncomeData}
        />
      </div>
      <div className='module-middle-container'>
        <IncomeSummary data={incomesummary} />
      </div>
      <div className='module-lower-container'>
        <IncomeList data={incomes} />
      </div>
    </div>
  );
};

export default Income;
