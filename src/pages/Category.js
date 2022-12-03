import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { message as MessageNot } from 'antd';
import { getCategories, reset } from '../features/categories/categorySlice';
import CategoryForm from '../components/Category/CategoryForm/CategoryForm';
import CategoryList from '../components/Category/CategoryList/CategoryList';
import Spinner from '../components/Common/Spinner';
import '../common_css/App.css';

const Category = () => {
  const [formInput, setFormInput] = useState({
    categoryid: 0,
    categoryname: '',
    categorytype: 'INCOME',
    categorydesc: '',
    color: '#FA3E3E'
  });
  const [formMode, setFormMode] = useState('A');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categories, isLoading, isError, message } = useSelector((state) => state.categories);

  useEffect(() => {
    if (isError) {
      MessageNot.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getCategories());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='app-container'>
      <div className='cat-upper-container'>
        <CategoryForm
          formInput={formInput}
          setFormInput={setFormInput}
          formMode={formMode}
          setFormMode={setFormMode}
        />
      </div>
      <div className='cat-lower-container'>
        <CategoryList
          data={categories}
          formInput={formInput}
          setFormInput={setFormInput}
          setFormMode={setFormMode}
        />
      </div>
    </div>
  );
};

export default Category;
