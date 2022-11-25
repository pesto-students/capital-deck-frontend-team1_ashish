/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import './Navbar.css';
import logo from '../../../assets/capital-deck-logo.svg';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const navHamburgerRef = useRef();
  const navContainerRef = useRef();
  const overlayRef = useRef();
  const { width } = useWindowDimensions();

  let navMenuInd = 'H';
  if (location.pathname === '/login') {
    navMenuInd = 'L';
  } else if (location.pathname === '/signup') {
    navMenuInd = 'S';
  } else if (location.pathname === '/') {
    navMenuInd = 'H';
  } else {
    navMenuInd = 'E';
  }

  useEffect(() => {
    const header = document.querySelector('.navbar-container');
    if (window.pageYOffset > 0) {
      header.classList.add('stickyNav');
    } else {
      header.classList.remove('stickyNav');
    }

    const sections = document.querySelectorAll('.section');
    const navLi = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 70) {
        header.classList.add('stickyNav');
      } else {
        header.classList.remove('stickyNav');
      }

      let current = '';
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
          current = section.getAttribute('id');
        }
      });

      navLi.forEach((li) => {
        li.classList.remove('active');
        if (li.getAttribute('href') === `#${current}`) {
          li.classList.add('active');
        }
      });
    });
  });

  const hamburgerClickHandler = () => {
    if (menuOpen) {
      navHamburgerRef.current.classList.remove('hamburgerClose');
      navContainerRef.current.classList.add('mobileMenuClose');
      overlayRef.current.classList.remove('overlay');
      setTimeout(() => {
        navContainerRef.current.classList.remove('mobileMenuOpen');
      });
      setMenuOpen(false);
    } else {
      navHamburgerRef.current.classList.add('hamburgerClose');
      navContainerRef.current.classList.add('mobileMenuOpen');
      navContainerRef.current.classList.remove('mobileMenuClose');
      overlayRef.current.classList.add('overlay');

      setMenuOpen(true);
    }
  };

  const Handleoverlay = () => {
    navHamburgerRef.current.classList.remove('hamburgerClose');
    navContainerRef.current.classList.add('mobileMenuClose');
    overlayRef.current.classList.remove('overlay');
    setTimeout(() => {
      navContainerRef.current.classList.remove('mobileMenuOpen');
    });
    setMenuOpen(false);
  };

  const HandleTabClick = () => {
    if (width <= 960) {
      Handleoverlay();
    }
  };

  return (
    <>
      <div className='navbar-container'>
        <span className='nav-logo'>
          <Link to='/'>
            <img src={logo} alt='Logo' height={60} width={220} />
          </Link>
        </span>
        <div className='nav-menu hamburgerClose' ref={navContainerRef}>
          <span className='nav-mob-logo'>
            <Link
              to='/'
              onClick={() => {
                HandleTabClick();
              }}>
              <img src={logo} alt='Logo' height={60} width={220} />
            </Link>
          </span>
          {navMenuInd === 'L' ? (
            <button
              type='button'
              onClick={() => {
                navigate('/signup');
                HandleTabClick();
              }}>
              Sign Up
            </button>
          ) : navMenuInd === 'S' ? (
            <button
              type='button'
              onClick={() => {
                navigate('/login');
                HandleTabClick();
              }}>
              Login
            </button>
          ) : navMenuInd === 'H' ? (
            <>
              <a
                className='active'
                href='#Home'
                onClick={() => {
                  HandleTabClick();
                }}>
                Home
              </a>
              <a
                href='#Team'
                onClick={() => {
                  HandleTabClick();
                }}>
                Our Team
              </a>
              <a
                href='#Feedback'
                onClick={() => {
                  HandleTabClick();
                }}>
                Contact Us
              </a>
              <button
                type='button'
                onClick={() => {
                  navigate('/login');
                  HandleTabClick();
                }}>
                Login
              </button>
              <button
                type='button'
                onClick={() => {
                  navigate('/signup');
                  HandleTabClick();
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
                  HandleTabClick();
                }}>
                Login
              </button>
              <button
                type='button'
                onClick={() => {
                  navigate('/signup');
                  HandleTabClick();
                }}>
                Sign Up
              </button>
            </>
          )}
        </div>
        <div className='hamburger' ref={navHamburgerRef} onClick={hamburgerClickHandler}>
          <div className='hamburger__Open' />
        </div>
      </div>
      <div ref={overlayRef} onClick={Handleoverlay} />
    </>
  );
};

export default Navbar;
