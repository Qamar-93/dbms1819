import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeFooter, addFooter } from '../../actions/footer-actions.js';
import * as navbarActions from '../../actions/navbar-actions.js';
import Header from './header';
import Services from './services';
import LatestProject from './latestProject';
import LatestNews from './latestNews';

import './index.css';

class Home extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(lang) {
    return () => {
      const { langChange } = this.props;
      langChange(lang);
    };
  }

  render() {

    return (
      <div className='home'>
        <Header />
        <Services />
        <LatestProject />
        <LatestNews />
      </div>
    );
  }
}

Home.propTypes = {
  removeNav: PropTypes.func,
  removeFooter: PropTypes.func,
  addNav: PropTypes.func,
  addFooter: PropTypes.func,
  langChange: PropTypes.func,
  getTrans: PropTypes.func,
  lang: PropTypes.string
};

const mapDispatchToProps = {
  ...navbarActions,
  removeFooter,
  addFooter
};
const mapStateToProps = state => {
  return {
    lang: state.navbar.lang
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
