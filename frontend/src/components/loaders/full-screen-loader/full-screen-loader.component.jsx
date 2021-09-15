import React from 'react';
import './full-screen-loader.styles.scss';

const FullScreenLoader = () => {
  return (
    <div className='container'>
      <div className='wrapper'>
        <div className='circle'></div>
        <div className='circle'></div>
        <div className='circle'></div>
        <div className='shadow'></div>
        <div className='shadow'></div>
        <div className='shadow'></div>
        <span>Cargando</span>
      </div>
    </div>
  );
};

export default FullScreenLoader;
