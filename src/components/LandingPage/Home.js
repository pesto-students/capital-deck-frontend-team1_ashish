import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import screenImg from '../../assets/screens.svg';
import bgshadeImg from '../../assets/vector18.svg';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div id='Home' className='home-container'>
      <div className='home-overviewscreen'>
        <div className='home-container-bgImage'>
          <img src={bgshadeImg} width='1153' height='637' alt='bg-shade' />
        </div>
        <div className='overview-container'>
          <h1>
            <p>Spend, save, and give</p> toward what&apos;s important in life
          </h1>
          <p>
            Capital Deck is a Finance Management Tool for the modern age. This keeps you in sync
            with your finances and track spendings.
          </p>
          <button
            type='button'
            onClick={() => {
              navigate('/signup');
            }}>
            Join Us Now
          </button>
        </div>
        <div className='screen-container'>
          <img src={screenImg} alt='screen' height={400} width={600} />
        </div>
      </div>
    </div>
  );
};

export default Home;
