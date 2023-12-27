import React, { useState } from 'react';
import { ArrowDownOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import AddExpense from '../../Expense/AddExpense';
import './QuickExpense.css';

const QuickExpense = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className='quick-expense'
        onClick={() => {
          setModalOpen(true);
        }}>
        <span className='btn-icon'>
          <ArrowDownOutlined style={{ color: '#db5858' }} />
        </span>
        <span className='btn-text'>Add Expense</span>
      </div>
      <Modal
        className='app-modal'
        title='Add Expense'
        centered
        footer={[]}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}>
        <AddExpense mode='A' setModalOpen={setModalOpen} />
      </Modal>
    </>
  );
};

export default QuickExpense;
