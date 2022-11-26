import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Userboard from './pages/Userboard';
import UserProfile from './pages/UserProfile';
import Income from './pages/Income';
import Expense from './pages/Expense';
import Summary from './pages/Summary';
import Alert from './pages/Alert';
import Category from './pages/Category';
import AppBar from './components/Layout/DashboardLayout/AppBar/AppBar';
import MobAppBar from './components/Layout/DashboardLayout/MobAppBar/MobAppBar';
import AppModuleHeader from './components/Layout/DashboardLayout/AppModuleHeader';
import useWindowDimensions from './hooks/useWindowDimensions';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate, dispatch]);

  return (
    <div className='dashboard-container'>
      {width <= 960 ? <MobAppBar /> : <AppBar />}
      <div className='app-main-container'>
        <AppModuleHeader />
        <Routes>
          <Route path='/' element={<Userboard />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/income' element={<Income />} />
          <Route path='/expense' element={<Expense />} />
          <Route path='/summary' element={<Summary />} />
          <Route path='/alert' element={<Alert />} />
          <Route path='/category' element={<Category />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
