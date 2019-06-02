import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const HeaderWithouImge = ({ title }) => (
  <header className='container withoutImge__header'>
    <h1 className='withoutImge__title'>{title}</h1>
  </header>
);

HeaderWithouImge.propTypes = {
  title: PropTypes.string
};

export default HeaderWithouImge;
