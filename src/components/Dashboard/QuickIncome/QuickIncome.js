import React, { useState } from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import AddIncome from '../../Income/AddIncome';
import './QuickIncome.css';

const QuickIncome = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className='quick-income'
        onClick={() => {
          setModalOpen(true);
        }}>
        <span className='btn-icon'>
          <ArrowUpOutlined style={{ color: '#73ca5d' }} />
        </span>
        <span className='btn-text'>Add Income</span>
      </div>
      <Modal
        className='app-modal'
        title='Add Income'
        centered
        footer={[]}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}>
        <AddIncome mode='A' setModalOpen={setModalOpen} />
      </Modal>
    </>
  );
};

export default QuickIncome;
