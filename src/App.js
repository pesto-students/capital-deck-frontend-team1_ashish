import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Layout/Navbar/Navbar';
import Footer from './components/Layout/Footer/Footer';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

const App = () => {
  const location = useLocation();
  let appClass = 'app';
  if (location.pathname === '/login' || location.pathname === '/signup') {
    appClass = 'app login-bg';
  } else {
    appClass = 'app home-bg';
  }

  return (
    <div className={appClass}>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path='*' element={<LandingPage />} /> -- For 404 redirection will be changed later
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
