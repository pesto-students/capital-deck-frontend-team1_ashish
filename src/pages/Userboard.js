import React from 'react';
import '../common_css/App.css';
import DashTotalExpense from '../components/Dashboard/DashTotalExpense/DashTotalExpense';
import QuickExpense from '../components/Dashboard/QuickExpense/QuickExpense';
import QuickIncome from '../components/Dashboard/QuickIncome/QuickIncome';
import DashTotalIncome from '../components/Dashboard/DashTotalIncome/DashTotalIncome';
import AmoutExpenseChart from '../components/Dashboard/AmoutExpenseChart/AmoutExpenseChart';
import AmoutIncomeChart from '../components/Dashboard/AmoutIncomeChart/AmoutIncomeChart';
import ExpenseIncomeBar from '../components/Dashboard/ExpenseIncomeBar/ExpenseIncomeBar';
import RecentExpense from '../components/Dashboard/RecentExpense/RecentExpense';
import RecentIncome from '../components/Dashboard/RecentIncome/RecentIncome';

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
        <div className='dash-middle-first'>
          <AmoutExpenseChart />
        </div>
        <div className='dash-middle-second'>
          <ExpenseIncomeBar />
        </div>
        <div className='dash-middle-third'>
          <AmoutIncomeChart />
        </div>
      </div>
      <div className='dash-lower-container'>
        <div className='dash-lower-first'>
          <RecentExpense />
        </div>
        <div className='dash-lower-second'>
          <RecentIncome />
        </div>
      </div>
    </div>
  );
};

export default Userboard;
