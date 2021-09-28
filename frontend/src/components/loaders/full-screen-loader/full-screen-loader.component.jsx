import React from 'react';
import './full-screen-loader.styles.scss';

const FullScreenLoader = () => {
  return (
    <div className='container'>
      <div id='circle2' />
      <div data-text='Cargando' id='loadingText' />

      {/* <div className='wrapper'>
        <div className='circle'></div>
        <div className='circle'></div>
        <div className='circle'></div>
        <div className='shadow'></div>
        <div className='shadow'></div>
        <div className='shadow'></div>
        <span>Cargando</span>
      </div> */}
    </div>
  );
};

export default FullScreenLoader;
