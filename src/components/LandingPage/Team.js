import React from 'react';
import './Team.css';
import characterImg from '../../assets/character.svg';
import member1Icon from '../../assets/member1.svg';
import member2Icon from '../../assets/member2.svg';

const Team = () => {
  return (
    <div id='Team' className='team-section'>
      <h1 className='team-header'>Our Team</h1>
      <div className='team-container'>
        <div className='team-member'>
          <div>
            <span className='active-member'>
              <img src={member1Icon} width='80' height='80' alt='character' />
            </span>
            <span>
              <p>Harshit Patel</p>
              <p className='character-role'> - Full Stack Developer</p>
            </span>
          </div>
          <div>
            <span>
              <img src={member2Icon} width='80' height='80' alt='character' />
            </span>
            <span>
              <p>Salman Zafar</p>
              <p className='character-role'> - Full Stack Developer</p>
            </span>
          </div>
        </div>
        <div>
          <img src={characterImg} width='250' height='250' alt='character' />
        </div>
      </div>
    </div>
  );
};

export default Team;
