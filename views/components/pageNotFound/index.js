import React, { Component } from 'react';

import './index.css';

class PageNotFound extends Component {
  render() {

    return (
      <section className='pageNotFound' >
        <div className='error'>
          <h1>404</h1>
          <p>We are sorry but it looks like that page doesn't exist</p>
        </div>
      </section>

    );
  }
}

export default (PageNotFound);
