import React from 'react';
import './style.css'
import poster from '../../images/афиша.jpg'

const Home = () => {
  return (
    <div className='main' id='home'>
      <div className='poster'>
        <img src={poster} width='500px' alt='poster'/>
      </div>
    </div>
  );
};

export default Home;