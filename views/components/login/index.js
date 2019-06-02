import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../loading/index';
import { Redirect } from 'react-router-dom';

import './index.css';
import * as loginActions from '../../actions/login-actions';

class Login extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const data = {
      password: e.target.password.value,
      userName: e.target.username.value
    };
    this.props.login(JSON.stringify(data));
  }
  render() {
    const { isFetching, error, isLoggedIn } = this.props;

    if (isLoggedIn) return <Redirect to='/dashboard' />;

    return (
      <section className='login' >
        <div className='container'>
          { isFetching ? (
            <div className='overlayLoading'><Loading /></div>
          ) : (
            <div></div>
          )}
          <h3>Login</h3>
          <div className='login__container row'>
            <form id='loginForm' onSubmit={this.onSubmit}>
              { error ? (
                <div className='errorNote'>{error}</div>
              ) : (
                <div></div>
              )}
              <label htmlFor='username'>Username
                <input type='text' name='username' required/>
              </label>
              <label htmlFor='password'>Password
                <input type='password' name='password' required/>
              </label>
              <button type='submit' className='btn'>Login</button>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  user: PropTypes.object,
  error: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  isFetching: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isFetching: state.login.isFetching,
    isLoggedIn: state.login.isLoggedIn,
    user: state.login.user,
    error: state.login.error
  };
};

export default connect(mapStateToProps, loginActions)(Login);
