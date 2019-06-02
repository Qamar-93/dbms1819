import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

class Access extends Component {
  render() {
    return (
      <section className='accessDenied' >
        <div className='container'>
          <div className='access-container'>
            <div className='access-img'>
              <img src='/img/key.png' alt='Access Denied Image' />
            </div>
            <div>
              <h3>Access Denied</h3>
              <p>Please <Link to='/login'>Login</Link></p>
            </div>
          </div>
        </div>
      </section>

    );
  }
}

export default Access;
