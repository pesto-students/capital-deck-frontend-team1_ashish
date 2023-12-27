import React, { useState, useEffect } from 'react';
import { message as MessageNot, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import AddAlert from '../AddAlert/AddAlert';
import Spinner from '../../Common/Spinner';
import { getAlerts, deleteAlert, reset } from '../../../features/alerts/alertSlice';
import './AlertList.css';

const CapitalAlert = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalId, setModalId] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { alerts, isError, message, isLoading, isSuccess } = useSelector((state) => state.alerts);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      MessageNot.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getAlerts());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const deleteAlertHandler = (id) => {
    dispatch(deleteAlert(id));

    if (isError) {
      MessageNot.error(message);
    }

    if (isSuccess) {
      MessageNot.success('Category deleted successfully!!!');
    }
  };

  const viewAlertHandler = (id) => {
    setModalOpen(true);
    setModalId(id);
  };

  return (
    <div className='alert-main-container'>
      <div className='alert-container'>
        {alerts &&
          alerts.map((item) => {
            return (
              <div key={item._id} className='alert-card'>
                <h3>{item.alert_title}</h3>
                <p>{dayjs(item.createdAt).format('YYYY-MM-DD HH:MM')}</p>
                <span className='alert-card-button'>
                  <button
                    type='button'
                    className='viewbtn'
                    onClick={() => viewAlertHandler(item._id)}>
                    View
                  </button>
                  <button
                    type='button'
                    className='deletebtn'
                    onClick={() => deleteAlertHandler(item._id)}>
                    Delete
                  </button>
                </span>
              </div>
            );
          })}
      </div>
      <Modal
        className='app-modal'
        title='Alert'
        centered
        footer={[]}
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setModalId(0);
        }}>
        <AddAlert mode='E' setModalOpen={setModalOpen} modalId={modalId} data={alerts} />
      </Modal>
    </div>
  );
};

export default CapitalAlert;
