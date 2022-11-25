/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout, reset } from '../../../features/auth/authSlice';
import './AppBar.css';
import logo from '../../../assets/capital-deck-logo.svg';
import profile from '../../../assets/member1.svg';

const AppBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <div className='appbar-container'>
      <span className='appbar-logo'>
        <Link to='/dashboard'>
          <img src={logo} alt='Logo' height={32} width={180} />
        </Link>
      </span>
      <span className='appbar-user'>
        <span className='userprofile_image'>
          <img src={profile} alt='User Profile' height={60} width={60} />
        </span>
        <p>{user && user.name}</p>
      </span>
      <span className='appbar-list'>
        <span className='appbar-list-main'>
          <Link to='/dashboard'>
            <i className='las la-icons' />
            <span>Dashboard</span>
          </Link>
          <Link to='/dashboard/income'>
            <i className='las la-wallet' />
            <span>Incomes</span>
          </Link>
          <Link to='/dashboard/expense'>
            <i className='las la-money-bill-wave' />
            <span>Expenses</span>
          </Link>
          <Link to='/dashboard/summary'>
            <i className='lab la-wpforms' />
            <span>All Summary</span>
          </Link>
          <Link to='/dashboard/alert'>
            <i className='las la-bell' />
            <span>Capital Alert</span>
          </Link>
        </span>
        <span className='appbar-list-util'>
          <Link to='/dashboard/category'>
            <i className='las la-clipboard-list' />
            <span>Category</span>
          </Link>
          <Link to='/dashboard/userprofile'>
            <i className='las la-user' />
            <span>Profile</span>
          </Link>
        </span>
      </span>
      <span className='appbar-logout'>
        <Link to='#' onClick={handleLogout}>
          <i className='las la-sign-out-alt' />
          <span>Logout</span>
        </Link>
      </span>
    </div>
  );
};

export default AppBar;
