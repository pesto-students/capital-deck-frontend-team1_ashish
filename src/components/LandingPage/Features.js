import React from 'react';
import './Features.css';

const Features = () => {
  return (
    <section id='Home' className='section feature-section'>
      <h1 className='feature-header'>Our Features</h1>
      <div className='features-container'>
        <div>
          <span className='icon-background'>
            <i className='las la-calculator' />
          </span>
          <h3>Budgeting</h3>
          <p>You can set budget rules for your expenses.</p>
        </div>
        <div>
          <span className='icon-background'>
            <i className='las la-chart-bar' />
          </span>
          <h3>Easy Report</h3>
          <p>Track your Finances in Graphical representation.</p>
        </div>
        <div>
          <span className='icon-background'>
            <i className='las la-bell' />
          </span>
          <h3>Spend Alerts</h3>
          <p>Get summary alerts of your finances.</p>
        </div>
        <div>
          <span className='icon-background'>
            <i className='las la-list' />
          </span>
          <h3>Categorize Spends</h3>
          <p>Similar expenditures can be grouped together to analyze the finance.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
