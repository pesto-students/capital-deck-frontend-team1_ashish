import React from 'react';
import { useLocation } from 'react-router-dom';

const AppModuleHeader = () => {
  const location = useLocation();
  let title = 'Dashboard';

  if (location.pathname === '/dashboard/income') {
    title = 'Incomes';
  } else if (location.pathname === '/dashboard/expense') {
    title = 'Expenses';
  } else if (location.pathname === '/dashboard/summary') {
    title = 'All Summary';
  } else if (location.pathname === '/dashboard/alert') {
    title = 'Capital Alert';
  } else if (location.pathname === '/dashboard/category') {
    title = 'Category';
  } else if (location.pathname === '/dashboard/userprofile') {
    title = 'User Profile';
  } else {
    title = 'Dashboard';
  }

  return (
    <div className='app-title'>
      <span className='app-title-label'>{title}</span>
    </div>
  );
};

export default AppModuleHeader;
