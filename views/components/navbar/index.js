import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import './index.css';
import classnames from 'classnames';

import * as navbarActions from '../../actions/navbar-actions.js';

class Navbar extends Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggle() {
    const { toggleNav } = this.props;
    toggleNav();
  }
  handleChange(lang) {
    return () => {
      const { langChange } = this.props;
      langChange(lang);
    };
  }

  render() {
    const { navShown, hasNav, getTrans, lang } = this.props;
    const menuClass = classnames({
      navbar: true,
      showNav: navShown,
      rtl: lang === 'Ar'
    });
    if (hasNav) {
      return (
        <div className={menuClass}>
          <div className='container' >
            <nav>
              <div className='navbar__offset'></div>
              <div className='navbar__brand'>
                <NavLink exact to='/'><img src='img/logo.png' alt='GIRIH'/></NavLink>
              </div>
              <div className='navItems'>
                <ul>
                  <NavLink exact className='navbar__link-home' to='/'><li onClick={this.toggle}>
                    {getTrans('HOME')}</li></NavLink>
                  <NavLink to='/services'><li onClick={this.toggle}>
                    {getTrans('OUR SERVICES')}</li></NavLink>
                  <NavLink to='/portfolio'><li onClick={this.toggle}>
                    {getTrans('PORTFOLIO')}</li></NavLink>
                  <NavLink to='/news'><li onClick={this.toggle}>
                    {getTrans('NEWS')}</li></NavLink>
                  <NavLink to='/shop'><li onClick={this.toggle}>
                    {getTrans('SHOP')}</li></NavLink>
                  <NavLink to='/aboutUs'><li onClick={this.toggle}>
                    {getTrans('ABOUT US')}</li></NavLink>
                  <NavLink to='/contactus'><li onClick={this.toggle}>
                    {getTrans('CONTACT US')}</li></NavLink>
                  <NavLink to='/join'><li onClick={this.toggle}>
                    {getTrans('JOIN US')}</li></NavLink>
                </ul>
                <button className='navButton' onClick = {this.toggle}>
                  <FontAwesome name='bars' />
                </button>
                <div
                  className={`languageSelector languageSelector-${lang}`}>
                  <span
                    className='languageSelector__en'
                    onClick={this.handleChange('En')}>
                    En</span>
                  <span className='languageSelector__ar' onClick={this.handleChange('Ar')}>
                    ع</span>
                </div>
              </div>
            </nav>
          </div>
        </div>
      );
    }

    return (
      <div></div>
    );
  }
}

Navbar.propTypes = {
  toggleNav: PropTypes.func,
  navShown: PropTypes.bool,
  hasNav: PropTypes.bool,
  langChange: PropTypes.func,
  getTrans: PropTypes.func,
  lang: PropTypes.string
};

const mapStateToProps = state => {
  return {
    navShown: state.navbar.navShown,
    hasNav: state.navbar.hasNav,
    lang: state.navbar.lang
  };
};

export default connect(mapStateToProps, navbarActions)(Navbar);
