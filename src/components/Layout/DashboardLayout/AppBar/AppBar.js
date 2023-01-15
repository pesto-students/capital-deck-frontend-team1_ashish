import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout, reset } from '../../../../features/auth/authSlice';
import { baseUploadURL } from '../../../../util/BaseUrl';
import './AppBar.css';
import logo from '../../../../assets/capital-deck-logo.svg';
import profile from '../../../../assets/member1.svg';

const AppBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const { user } = useSelector((state) => state.auth);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <div className='appbar-container'>
      <span className='appbar-logo'>
        <Link to='/dashboard' onClick={() => setActiveTab('/dashboard')}>
          <img src={logo} alt='Logo' height={32} width={180} />
        </Link>
      </span>
      <span className='appbar-user'>
        <span className='userprofile_image'>
          {user && user.file_path ? (
            <img
              src={`${baseUploadURL}${user.file_path}`}
              alt='User Profile'
              height={60}
              width={60}
            />
          ) : (
            <img src={profile} alt='User Profile' height={60} width={60} />
          )}
        </span>
        <p>{user && user.name}</p>
      </span>
      <span className='appbar-list'>
        <span className='appbar-list-main'>
          <Link
            to='/dashboard'
            className={`${activeTab === '/dashboard' ? 'dashboard-active' : ''}`}
            onClick={() => setActiveTab('/dashboard')}>
            <i className='las la-icons' />
            <span>Dashboard</span>
          </Link>
          <Link
            to='/dashboard/income'
            className={`${activeTab === '/dashboard/income' ? 'dashboard-active' : ''}`}
            onClick={() => setActiveTab('/dashboard/income')}>
            <i className='las la-wallet' />
            <span>Incomes</span>
          </Link>
          <Link
            to='/dashboard/expense'
            className={`${activeTab === '/dashboard/expense' ? 'dashboard-active' : ''}`}
            onClick={() => setActiveTab('/dashboard/expense')}>
            <i className='las la-money-bill-wave' />
            <span>Expenses</span>
          </Link>
          <Link
            to='/dashboard/alert'
            className={`${activeTab === '/dashboard/alert' ? 'dashboard-active' : ''}`}
            onClick={() => setActiveTab('/dashboard/alert')}>
            <i className='las la-bell' />
            <span>Capital Alert</span>
          </Link>
        </span>
        <span className='appbar-list-util'>
          <Link
            to='/dashboard/category'
            className={`${activeTab === '/dashboard/category' ? 'dashboard-active' : ''}`}
            onClick={() => setActiveTab('/dashboard/category')}>
            <i className='las la-clipboard-list' />
            <span>Category</span>
          </Link>
          <Link
            to='/dashboard/userprofile'
            className={`${activeTab === '/dashboard/userprofile' ? 'dashboard-active' : ''}`}
            onClick={() => setActiveTab('/dashboard/userprofile')}>
            <i className='las la-user' />
            <span>Profile</span>
          </Link>
        </span>
      </span>
      <span className='appbar-logout'>
        <Link to='#' onClick={(e) => handleLogout(e)}>
          <i className='las la-sign-out-alt' />
          <span>Logout</span>
        </Link>
      </span>
    </div>
  );
};

export default AppBar;
