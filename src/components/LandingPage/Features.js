import React from 'react';
import './Features.css';
import featureBudget from '../../assets/featureBudget.svg';
import featureChart from '../../assets/featureChart.svg';
import featureAlert from '../../assets/featureAlert.svg';
import featureCategory from '../../assets/featureCategory.svg';

const Features = () => {
  return (
    <div className='feature-section'>
      <h1 className='feature-header'>Our Features</h1>
      <div className='features-container'>
        <div>
          <img src={featureBudget} height='50' width='50' alt='budget-icon' />
          <h3>Budgeting</h3>
          <p>You can set budget rules for your expenses.</p>
        </div>
        <div>
          <img src={featureChart} height='50' width='50' alt='report-icon' />
          <h3>Easy Report</h3>
          <p>Track your Finances in Graphical representation.</p>
        </div>
        <div>
          <img src={featureAlert} height='50' width='50' alt='alert-icon' />
          <h3>Spend Alerts</h3>
          <p>Get summary alerts of your finances.</p>
        </div>
        <div>
          <img src={featureCategory} height='50' width='50' alt='category-icon' />
          <h3>Categorize Spends</h3>
          <p>Similar expenditures can be grouped together to analyze the finance.</p>
        </div>
      </div>
    </div>
  );
};

export default Features;
