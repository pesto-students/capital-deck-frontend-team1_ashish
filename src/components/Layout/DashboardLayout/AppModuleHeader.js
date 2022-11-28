import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import AddAlert from '../../CapitalAlert/AddAlert';

const AppModuleHeader = () => {
  const location = useLocation();
  let title = 'Dashboard';
  let addButton = '';

  const [modalOpen, setModalOpen] = useState(false);

  if (location.pathname === '/dashboard/income') {
    title = 'Incomes';
  } else if (location.pathname === '/dashboard/expense') {
    title = 'Expenses';
  } else if (location.pathname === '/dashboard/summary') {
    title = 'All Summary';
  } else if (location.pathname === '/dashboard/alert') {
    title = 'Capital Alert';
    addButton = 'Add Rule';
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
      <Button
        className='add-button'
        onClick={() => {
          setModalOpen(true);
        }}>
        {addButton}
      </Button>
      <Modal
        title='Add Rule'
        centered
        footer={[
          <Button key='back'>Cancel</Button>,
          <Button style={{ background: '#285ac5' }} key='submit' type='primary'>
            Save
          </Button>
        ]}
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}>
        <AddAlert />
      </Modal>
    </div>
  );
};

export default AppModuleHeader;
