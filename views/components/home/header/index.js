import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as navbarActions from '../../../actions/navbar-actions.js';
import * as staticContent from '../../../../staticContent.json';

import './index.css';

class Header extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.scrollDown = this.scrollDown.bind(this);
  }

  handleChange(lang) {
    return () => {
      const { langChange } = this.props;
      langChange(lang);
    };
  }
  scrollDown() {
    document.querySelector('.home-services__description').scrollIntoView({
      behavior: 'smooth'
    });
  }

  render() {
    const { getTrans,lang } = this.props;

    return (
      <section className='header'>
        <div className='container' >
          <div className='header__content'>
            <div className='header__container'>
              <h1 className='header__quote'>{staticContent.homepage.header[lang.toLowerCase()]}</h1>
              <Link to='/contactus' className='header__button'>{getTrans('Call us now')}</Link>
            </div>
            <a className='downArrow' onClick={this.scrollDown}>
              <i className='fa fa-angle-down'></i></a>
          </div>
        </div>
      </section>
    );
  }
}

Header.propTypes = {
  removeNav: PropTypes.func,
  removeFooter: PropTypes.func,
  addNav: PropTypes.func,
  addFooter: PropTypes.func,
  langChange: PropTypes.func,
  getTrans: PropTypes.func,
  lang: PropTypes.string
};

const mapStateToProps = state => {
  return {
    lang: state.navbar.lang
  };
};
export default connect(mapStateToProps, navbarActions)(Header);
