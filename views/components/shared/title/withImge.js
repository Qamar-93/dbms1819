import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const HeaderWithImge = ({ title, src, alt }) => (
  <header className='container whithImge__row'>
    <div className=''>
      <h1 className='withoutImge__title'>{title}</h1>
    </div>
    <div className='withImge__side-img'>
      <img
        className='withImge__img'
        src={src}
        alt={alt}
      />
    </div>
  </header>
);

HeaderWithImge.propTypes = {
  title: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string
};

export default HeaderWithImge;
