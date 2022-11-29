import React, { useState } from 'react';
import { Button, Card } from 'antd';
import './AlertList.css';

const RuleList = [
  {
    rule: 'Rule 1',
    date: '18-11-2022',
    desc: 'Monthly Limit'
  },
  {
    rule: 'Rule 2',
    date: '22-11-2022',
    desc: 'Weekly Limit'
  },
  {
    rule: 'Rule 3',
    date: '22-11-2022',
    desc: 'Weekly Limit'
  },
  {
    rule: 'Rule 4',
    date: '22-11-2022',
    desc: 'Weekly Limit'
  },
  {
    rule: 'Rule 5',
    date: '22-11-2022',
    desc: 'Weekly Limit'
  }
];

const CapitalAlert = () => {
  const [alert] = useState(RuleList);
  return (
    <div className='alert-main-container'>
      <div className='alert-container'>
        {alert &&
          alert.map((el) => {
            return (
              <Card className='alert-card' style={{ width: 200 }}>
                <h1>{el.rule}</h1>
                <h3>{el.date}</h3>
                <div className='alert-btn'>
                  <Button className='alert-delete'>Delete</Button>
                  <Button className='alert-edit'>Edit</Button>
                </div>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default CapitalAlert;
