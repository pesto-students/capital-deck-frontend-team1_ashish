import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FloatButton, Modal } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';
import Userboard from './pages/Userboard';
import UserProfile from './pages/UserProfile';
import Income from './pages/Income';
import Expense from './pages/Expense';
import Alert from './pages/Alert';
import Category from './pages/Category';
import Calculator from './components/Calculator/Calculator';
import AppBar from './components/Layout/DashboardLayout/AppBar/AppBar';
import MobAppBar from './components/Layout/DashboardLayout/MobAppBar/MobAppBar';
import AppModuleHeader from './components/Layout/DashboardLayout/AppModuleHeader';
import useWindowDimensions from './hooks/useWindowDimensions';
import './Dashboard.css';

const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false);
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
          <Route path='/alert' element={<Alert />} />
          <Route path='/category' element={<Category />} />
        </Routes>
        <FloatButton
          icon={
            <CalculatorOutlined
              style={{
                backgroundColor: '#ffffff'
              }}
            />
          }
          onClick={() => {
            setModalOpen(true);
          }}
        />
        <Modal
          title='Calculator'
          centered
          footer={[]}
          open={modalOpen}
          width={300}
          onOk={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}>
          <Calculator />
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
