/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-nested-ternary */
import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AddAlert from '../../CapitalAlert/AddAlert';
import AddExpense from '../../Expense/AddExpense';

const AppModuleHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const location = useLocation();
  let title = 'Dashboard';
  let addButtonTitle = 'Add';
  let addButtonReq = false;
  let modalCode = '';

  if (location.pathname === '/dashboard/income') {
    title = 'Incomes';
    addButtonTitle = 'Add Income';
    addButtonReq = true;
    modalCode = 'INCOME';
  } else if (location.pathname === '/dashboard/expense') {
    title = 'Expenses';
    addButtonTitle = 'Add Expense';
    addButtonReq = true;
    modalCode = 'EXPENSE';
  } else if (location.pathname === '/dashboard/summary') {
    title = 'All Summary';
  } else if (location.pathname === '/dashboard/alert') {
    title = 'Capital Alert';
    addButtonTitle = 'Add Alert';
    addButtonReq = true;
    modalCode = 'ALERT';
  } else if (location.pathname === '/dashboard/category') {
    title = 'Category';
  } else if (location.pathname === '/dashboard/userprofile') {
    title = 'User Profile';
  } else {
    title = 'Dashboard';
  }

  return (
    <div className='app-title'>
      <span className='app-title-label'>{title}</span>
      {addButtonReq ? (
        <Button
          className='add-button'
          onClick={() => {
            setModalOpen(true);
          }}>
          {addButtonTitle}
        </Button>
      ) : (
        <></>
      )}
      <Modal
        className='app-modal'
        title={addButtonTitle}
        centered
        footer={[
          <Button key='back' onClick={() => setModalOpen(false)}>
            Cancel
          </Button>,
          <Button style={{ background: '#1a5a9b' }} key='submit' type='primary'>
            Save
          </Button>
        ]}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}>
        {modalCode === 'INCOME' ? (
          <AddAlert />
        ) : modalCode === 'EXPENSE' ? (
          <AddExpense mode='A' />
        ) : modalCode === 'ALERT' ? (
          <AddAlert />
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
};

export default AppModuleHeader;
