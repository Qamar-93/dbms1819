import { LOGIN_START, LOGIN_FAIL, LOGIN_SUCCESS } from '../constants/actionTypes';

const loginStart = () => {
  return {
    type: LOGIN_START
  };
};

const loginFail = err => {
  return {
    type: LOGIN_FAIL,
    payload: err.message
  };
};

const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user
  };
};

export const login = user => dispatch => {

  dispatch(loginStart());
  fetch('/api/v1/login',
    {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }, body: user
    })
    .then(res => {
      if (res.status === 401)
        throw new Error('Invalid username or password!');

      if (res.status >= 400)
        throw new Error('Bad response from server');

      return res.json();
    })
    .then(data => {
      dispatch(loginSuccess(data));
    })
    .catch(err => {
      dispatch(loginFail(err));
    });
};
