import React from 'react';
import '../common_css/App.css';
import DashTotalExpense from '../components/Dashboard/DashTotalExpense/DashTotalExpense';
import QuickExpense from '../components/Dashboard/QuickExpense/QuickExpense';
import QuickIncome from '../components/Dashboard/QuickIncome/QuickIncome';
import DashTotalIncome from '../components/Dashboard/DashTotalIncome/DashTotalIncome';

const Userboard = () => {
  return (
    <div className='app-container'>
      <div className='dash-upper-container'>
        <div className='dash-upper-first'>
          <DashTotalExpense />
        </div>
        <div className='dash-upper-second'>
          <div>
            <QuickExpense />
          </div>
          <div>
            <QuickIncome />
          </div>
        </div>
        <div className='dash-upper-third'>
          <DashTotalIncome />
        </div>
      </div>
      <div className='dash-middle-container'>
        <div className='dash-middle-first'>21</div>
        <div className='dash-middle-second'>22</div>
        <div className='dash-middle-third'>23</div>
      </div>
      <div className='dash-lower-container'>
        <div className='dash-lower-first'>31</div>
        <div className='dash-lower-second'>32</div>
        <div className='dash-lower-third'>33</div>
      </div>
    </div>
  );
};

export default Userboard;
