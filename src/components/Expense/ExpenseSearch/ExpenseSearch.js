import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Select, DatePicker, Button, message as MessageNot } from 'antd';
import { FilterOutlined, UndoOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getCategoriesByExpense, reset } from '../../../features/categories/categorySlice';
import Spinner from '../../Common/Spinner';
import './ExpenseSearch.css';

const { RangePicker } = DatePicker;

const ExpenseSearch = (props) => {
  const { searchExpenseData, setSearchExpenseData } = props;
  const [dates, setDates] = useState(['', '']);
  const [value, setValue] = useState(null);
  const [categoryVal, setCategoryVal] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categoriesByExpense, isError, message } = useSelector((state) => state.categories);
  const { isLoading } = useSelector((state) => state.expenses);

  useEffect(() => {
    if (isError) {
      MessageNot.error(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getCategoriesByExpense());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const onSearchHandler = () => {
    let fromDate = '';
    let toDate = '';
    if (dates[0] !== '') {
      fromDate = dayjs(dates[0]).format('YYYY-MM-DD');
    }
    if (dates[1] !== '') {
      toDate = dayjs(dates[1]).format('YYYY-MM-DD');
    }

    setSearchExpenseData({
      ...searchExpenseData,
      categoryid: categoryVal,
      fromdate: fromDate,
      todate: toDate
    });
  };

  const onResetSearch = () => {
    setCategoryVal(0);
    setDates(['', '']);
    setValue(null);
    setSearchExpenseData({
      ...searchExpenseData,
      categoryid: 0,
      fromdate: '',
      todate: ''
    });
  };

  return (
    <div className='module-search-container'>
      <div>
        <Select
          placeholder='Categories'
          value={categoryVal || undefined}
          style={{
            width: 200
          }}
          onChange={(val) => {
            setCategoryVal(val);
          }}
          options={categoriesByExpense.map((item) => ({
            label: item.category_name,
            value: item._id
          }))}
        />
        <RangePicker
          value={dates || value}
          onChange={(val) => setValue(val)}
          onCalendarChange={(val) => setDates(val)}
          defaultValue={['', '']}
          style={{
            marginLeft: 25
          }}
        />
      </div>
      <div>
        <Button icon={<UndoOutlined />} onClick={onResetSearch} />
        <Button
          type='primary'
          className='search-btn'
          icon={<FilterOutlined />}
          onClick={onSearchHandler}
        />
      </div>
    </div>
  );
};

export default ExpenseSearch;
