import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { message as MessageNot } from 'antd';
import { getCategories, reset } from '../features/categories/categorySlice';
import CategoryForm from '../components/Category/CategoryForm/CategoryForm';
import CategoryList from '../components/Category/CategoryList/CategoryList';
import CategoryGrid from '../components/Category/CategoryGrid/CategoryGrid';
import Spinner from '../components/Common/Spinner';
import useWindowDimensions from '../hooks/useWindowDimensions';
import '../common_css/App.css';

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
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
        <CategoryForm />
      </div>
      <div className='cat-lower-container'>
        {width <= 680 ? <CategoryGrid data={categories} /> : <CategoryList data={categories} />}
      </div>
    </div>
  );
};

export default Category;
