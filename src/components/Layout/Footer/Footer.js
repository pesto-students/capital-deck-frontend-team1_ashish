import React from 'react';
import { useLocation } from 'react-router-dom';
import './Footer.css';
import facebookicon from '../../../assets/fb-icon.svg';
import twittericon from '../../../assets/twitter-icon.svg';
import instaicon from '../../../assets/insta-icon.svg';

const Footer = () => {
  const location = useLocation();
  let footerClass = 'footer-container';
  if (location.pathname === '/login' || location.pathname === '/signup') {
    footerClass = 'footer-container footer-bg-trans';
  } else {
    footerClass = 'footer-container footer-bg';
  }

  return (
    <div className={footerClass}>
      <div className='footer-copyright'>
        <span>© Capital</span> Deck | 2022
      </div>
      <div className='footer-app-menu'>
        <a href='/'>
          <img src={facebookicon} alt='Logo' height={20} width={20} />
        </a>
        <a href='/'>
          <img src={twittericon} alt='Logo' height={20} width={20} />
        </a>
        <a href='/'>
          <img src={instaicon} alt='Logo' height={20} width={20} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
