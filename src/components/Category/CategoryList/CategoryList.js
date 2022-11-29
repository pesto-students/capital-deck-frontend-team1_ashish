/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Space, Table, message as MessageNot } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCategory } from '../../../features/categories/categorySlice';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import './CategoryList.css';

const CategoryList = ({ data }) => {
  const { height } = useWindowDimensions();
  const dispatch = useDispatch();
  const { isError, message, isSuccess } = useSelector((state) => state.categories);

  let yScroll = 220;

  if (height <= 700) {
    yScroll = 180;
  } else {
    yScroll = 220;
  }

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));

    if (isError) {
      MessageNot.error(message);
    }

    if (isSuccess) {
      MessageNot.success('Category deleted successfully!!!');
    }
  };

  const columns = [
    {
      title: 'No.',
      dataIndex: 'no',
      key: 'index',
      width: '50px',
      render: (text, record, index) => index + 1
    },
    {
      title: '',
      dataIndex: 'color',
      width: '50px',
      render: (record) => <i className='table_color' style={{ backgroundColor: record }} />
    },
    {
      title: 'Category',
      dataIndex: 'category_name',
      sorter: (a, b) => a.category_name.length - b.category_name.length
    },
    {
      title: 'Type',
      dataIndex: 'category_type',
      filters: [
        {
          text: 'Income',
          value: 'INCOME'
        },
        {
          text: 'Expense',
          value: 'EXPENSE'
        }
      ],
      onFilter: (value, record) => record.category_type.indexOf(value) === 0
    },
    {
      title: 'Description',
      dataIndex: 'category_desc'
    },
    {
      title: 'Action',
      key: 'action',
      width: '100px',
      render: (record) => (
        <Space size='large'>
          <span className='table_button'>
            <EditOutlined />
          </span>
          <span className='table_button'>
            <DeleteOutlined onClick={() => deleteCategoryHandler(record._id)} />
          </span>
        </Space>
      )
    }
  ];

  return (
    <div className='cat-list-container'>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          pageSize: 10
        }}
        scroll={{
          y: yScroll
        }}
        size='small'
      />
    </div>
  );
};

export default CategoryList;
