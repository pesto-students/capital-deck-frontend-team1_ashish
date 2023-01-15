import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Layout/LandingLayout/Navbar/Navbar';
import Footer from './components/Layout/LandingLayout/Footer/Footer';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ErrorPage from './pages/ErrorPage';
import Dashboard from './Dashboard';
import './App.css';

const App = () => {
  const location = useLocation();
  let appClass = 'app';
  let innerPageInd = false;
  if (location.pathname === '/login' || location.pathname === '/signup') {
    appClass = 'app login-bg';
  } else if (location.pathname === '/') {
    appClass = 'app home-bg';
  } else if (
    location.pathname === '/dashboard' ||
    location.pathname === '/dashboard/income' ||
    location.pathname === '/dashboard/expense' ||
    location.pathname === '/dashboard/alert' ||
    location.pathname === '/dashboard/category' ||
    location.pathname === '/dashboard/userprofile'
  ) {
    appClass = 'app app-bg';
    innerPageInd = true;
  } else if (location.pathname.includes('/dashboard/') === true) {
    innerPageInd = true;
  } else {
    appClass = 'app login-bg';
  }

  return (
    <div className={appClass}>
      {!innerPageInd ? <Navbar /> : <></>}
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard/*' element={<Dashboard />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      {!innerPageInd ? <Footer /> : <></>}
    </div>
  );
};

export default App;
