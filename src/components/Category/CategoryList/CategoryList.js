import React from 'react';
import { Space, Table, Card, message as MessageNot, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { deleteCategory } from '../../../features/categories/categorySlice';
import useWindowDimensions from '../../../hooks/useWindowDimensions';
import './CategoryList.css';

const { Meta } = Card;

const CategoryList = (props) => {
  const { data, formInput, setFormInput, setFormMode } = props;
  const { height, width } = useWindowDimensions();
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

  const cancel = () => {
    return false;
  };

  const editCategoryHandler = (id) => {
    const filteredData = data.filter((item) => {
      return item._id === id;
    });

    setFormMode('E');

    setFormInput({
      ...formInput,
      categoryid: id,
      categoryname: filteredData[0].category_name,
      categorytype: filteredData[0].category_type,
      categorydesc: filteredData[0].category_desc,
      color: filteredData[0].color
    });
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
            <EditOutlined onClick={() => editCategoryHandler(record._id)} />
          </span>
          <span className='table_button'>
            <Popconfirm
              title='Are you sure to delete this category?'
              description='Are you sure to delete this category?'
              onConfirm={() => deleteCategoryHandler(record._id)}
              onCancel={cancel}
              placement='left'
              okText='Yes'
              cancelText='No'>
              <DeleteOutlined />
            </Popconfirm>
          </span>
        </Space>
      )
    }
  ];

  return (
    <div>
      {width <= 680 ? (
        <div className='cat-grid-container'>
          {data &&
            data.map((item) => {
              return (
                <Card
                  key={item._id}
                  className='cat-grid-card'
                  actions={[
                    <EditOutlined key='edit' onClick={() => editCategoryHandler(item._id)} />,
                    <DeleteOutlined key='delete' onClick={() => deleteCategoryHandler(item._id)} />
                  ]}>
                  <Meta className='meda-card' title='Category:' description={item.category_name} />
                  <Meta className='meda-card' title='Type:' description={item.category_type} />
                  <Meta
                    className='meda-card'
                    title='Description:'
                    description={item.category_desc}
                  />
                  <i
                    className='table_color'
                    style={{ backgroundColor: item.color, width: '60px' }}
                  />
                </Card>
              );
            })}
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default CategoryList;
