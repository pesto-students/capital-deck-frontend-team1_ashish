import React, { useState } from 'react';
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

  return (
    <div className='app-container'>
      <div className='module-upper-container'>
        <IncomeSearch
          searchIncomeData={searchIncomeData}
          setSearchIncomeData={setSearchIncomeData}
        />
      </div>
      <div className='module-middle-container'>
        <IncomeSummary searchIncomeData={searchIncomeData} />
      </div>
      <div className='module-lower-container'>
        <IncomeList searchIncomeData={searchIncomeData} />
      </div>
    </div>
  );
};

export default Income;
