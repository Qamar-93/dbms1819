import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import './index.css';
import * as navbarActions from '../../actions/navbar-actions.js';
import * as staticContent from '../../../staticContent.json';

class Footer extends Component {

  render() {
    const { getTrans, lang } = this.props;
    const footerClass = classnames({
      rtl: lang === 'Ar'
    });

    return (
      <div className={footerClass}>
        <footer className='footer'>
          <div className='container row footer__content'>
            <p className='footer__logo'>{getTrans('GIRIH')}</p>
            <div className='footer__nav'>
              <ul className='footer__nav-items'>
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
              <div className='footer__quotation'>
                <p className='footer__quote'>{staticContent.homepage.footer[lang.toLowerCase()]}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  };
}
Footer.propTypes = {
  getTrans: PropTypes.func,
  lang: PropTypes.string
};
const mapStateToProps = state => {
  return {
    lang: state.navbar.lang
  };
};
export default connect(mapStateToProps,navbarActions)(Footer);
