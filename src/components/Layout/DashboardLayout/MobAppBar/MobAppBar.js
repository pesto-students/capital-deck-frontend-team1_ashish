import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logout, reset } from '../../../../features/auth/authSlice';
import useWindowDimensions from '../../../../hooks/useWindowDimensions';
import { baseUploadURL } from '../../../../util/BaseUrl';
import './MobAppBar.css';
import logo from '../../../../assets/capital-deck-logo.svg';
import profile from '../../../../assets/member1.svg';

const MobAppBar = () => {
  const [mobMenuOpen, setMobMenuOpen] = useState(false);
  const navMobHamburgerRef = useRef();
  const overlayMobRef = useRef();
  const navMobContainerRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const { width } = useWindowDimensions();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const header = document.querySelector('.mob-appbar-container');
    if (window.pageYOffset > 0) {
      header.classList.add('mob-stickyNav');
    } else {
      header.classList.remove('mob-stickyNav');
    }

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 30) {
        header.classList.add('mob-stickyNav');
      } else {
        header.classList.remove('mob-stickyNav');
      }
    });
  });

  const mobHamburgerClickHandler = () => {
    if (mobMenuOpen) {
      navMobHamburgerRef.current.classList.remove('mob-hamburgerClose');
      overlayMobRef.current.classList.remove('mob-overlay');
      navMobContainerRef.current.classList.add('innerMobileMenuClose');
      setTimeout(() => {
        navMobContainerRef.current.classList.remove('innerMobileMenuOpen');
      });
      setMobMenuOpen(false);
    } else {
      navMobHamburgerRef.current.classList.add('mob-hamburgerClose');
      overlayMobRef.current.classList.add('mob-overlay');
      navMobContainerRef.current.classList.add('innerMobileMenuOpen');
      navMobContainerRef.current.classList.remove('innerMobileMenuClose');
      setMobMenuOpen(true);
    }
  };

  const mobHandleOverlay = () => {
    navMobHamburgerRef.current.classList.remove('mob-hamburgerClose');
    navMobContainerRef.current.classList.add('innerMobileMenuClose');
    overlayMobRef.current.classList.remove('mob-overlay');
    setTimeout(() => {
      navMobContainerRef.current.classList.remove('innerMobileMenuOpen');
    });
    setMobMenuOpen(false);
  };

  const mobHandleTabClick = () => {
    if (width <= 960) {
      mobHandleOverlay();
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    mobHandleTabClick();
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <>
      <div className='mob-appbar-container'>
        <span className='mob-appbar-logo'>
          <Link to='/dashboard' onClick={() => setActiveTab('/dashboard')}>
            <img src={logo} alt='Logo' height={32} width={180} />
          </Link>
        </span>
        <div className='mob-hamburger' ref={navMobHamburgerRef} onClick={mobHamburgerClickHandler}>
          <div className='mob-hamburger__Open' />
        </div>
      </div>
      <div className='mob-appbar-container innerMobileMenuClose' ref={navMobContainerRef}>
        <span className='mob-appbar-logo'>
          <Link
            to='/dashboard'
            onClick={() => {
              mobHandleTabClick();
              setActiveTab('/dashboard');
            }}>
            <img src={logo} alt='Logo' height={32} width={180} />
          </Link>
        </span>
        <span className='mob-appbar-user'>
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
        <span className='mob-appbar-list'>
          <span className='mob-appbar-list-main'>
            <Link
              to='/dashboard'
              className={`${activeTab === '/dashboard' ? 'mob-dashboard-active' : ''}`}
              onClick={() => {
                mobHandleTabClick();
                setActiveTab('/dashboard');
              }}>
              <i className='las la-icons' />
              <span>Dashboard</span>
            </Link>
            <Link
              to='/dashboard/income'
              className={`${activeTab === '/dashboard/income' ? 'mob-dashboard-active' : ''}`}
              onClick={() => {
                mobHandleTabClick();
                setActiveTab('/dashboard/income');
              }}>
              <i className='las la-wallet' />
              <span>Incomes</span>
            </Link>
            <Link
              to='/dashboard/expense'
              className={`${activeTab === '/dashboard/expense' ? 'mob-dashboard-active' : ''}`}
              onClick={() => {
                mobHandleTabClick();
                setActiveTab('/dashboard/expense');
              }}>
              <i className='las la-money-bill-wave' />
              <span>Expenses</span>
            </Link>
            <Link
              to='/dashboard/alert'
              className={`${activeTab === '/dashboard/alert' ? 'mob-dashboard-active' : ''}`}
              onClick={() => {
                mobHandleTabClick();
                setActiveTab('/dashboard/alert');
              }}>
              <i className='las la-bell' />
              <span>Capital Alert</span>
            </Link>
          </span>
          <span className='mob-appbar-list-util'>
            <Link
              to='/dashboard/category'
              className={`${activeTab === '/dashboard/category' ? 'mob-dashboard-active' : ''}`}
              onClick={() => {
                mobHandleTabClick();
                setActiveTab('/dashboard/category');
              }}>
              <i className='las la-clipboard-list' />
              <span>Category</span>
            </Link>
            <Link
              to='/dashboard/userprofile'
              className={`${activeTab === '/dashboard/userprofile' ? 'mob-dashboard-active' : ''}`}
              onClick={() => {
                mobHandleTabClick();
                setActiveTab('/dashboard/userprofile');
              }}>
              <i className='las la-user' />
              <span>Profile</span>
            </Link>
          </span>
        </span>
        <span className='mob-appbar-logout'>
          <Link to='#' onClick={(e) => handleLogout(e)}>
            <i className='las la-sign-out-alt' />
            <span>Logout</span>
          </Link>
        </span>
      </div>
      <div ref={overlayMobRef} onClick={mobHandleOverlay} />
    </>
  );
};

export default MobAppBar;
