/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Layout/Navbar/Navbar';
import Footer from './components/Layout/Footer/Footer';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ErrorPage from './pages/ErrorPage';
import Dashboard from './pages/Dashboard';
import './App.css';

const App = () => {
  const location = useLocation();
  let appClass = 'app';
  let innerPageInd = false;
  if (location.pathname === '/login' || location.pathname === '/signup') {
    appClass = 'app login-bg';
  } else if (location.pathname === '/') {
    appClass = 'app home-bg';
  } else if (location.pathname === '/dashboard') {
    innerPageInd = true;
  } else {
    appClass = 'app login-bg';
  }

  return (
    <div className={appClass}>
      {!innerPageInd ? <Navbar /> : <></>}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      {!innerPageInd ? <Footer /> : <></>}
    </div>
  );
};

export default App;
