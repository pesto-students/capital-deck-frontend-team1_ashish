import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../../../assets/capital-deck-logo.svg';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let navMenuInd = 'H';
  if (location.pathname === '/login') {
    navMenuInd = 'L';
  } else if (location.pathname === '/signup') {
    navMenuInd = 'S';
  }

  useEffect(() => {
    const header = document.querySelector('.navbar-container');
    if (window.pageYOffset > 0) {
      header.classList.add('stickyNav');
    } else {
      header.classList.remove('stickyNav');
    }
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 70) {
        header.classList.add('stickyNav');
      } else {
        header.classList.remove('stickyNav');
      }
    });
  });

  return (
    <div className='navbar-container'>
      <span className='nav-logo'>
        <Link to='/'>
          <img src={logo} alt='Logo' height={50} width={200} />
        </Link>
      </span>
      <div className='nav-menu'>
        {navMenuInd === 'H' ? (
          <>
            <a href='#Home'>Home</a>
            <a href='#Team'>Our Team</a>
            <a href='#Feedback'>Conatact Us</a>
            <button
              type='button'
              onClick={() => {
                navigate('/login');
              }}>
              Login
            </button>
            <button
              type='button'
              onClick={() => {
                navigate('/signup');
              }}>
              Sign Up
            </button>
          </>
        ) : (
          <>
            <button
              type='button'
              onClick={() => {
                navigate('/login');
              }}>
              Login
            </button>
            <button
              type='button'
              onClick={() => {
                navigate('/signup');
              }}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
