import {
  JOINUS_START,
  JOINUS_ADD_FILE,
  JOINUS_REMOVE_FILE,
  JOINUS_FAIL,
  JOINUS_SUCCESS } from '../constants/actionTypes';

const joinusStart = () => {
  return {
    type: JOINUS_START
  };
};

const joinusFail = err => {
  return {
    type: JOINUS_FAIL,
    payload: err
  };
};

const joinusSuccess = user => {
  return {
    type: JOINUS_SUCCESS,
    payload: user
  };
};
const joinUsAddFile = path => {
  return {
    type: JOINUS_ADD_FILE,
    payload: path
  };
};
const joinUsDeleteFile = () => {
  return {
    type: JOINUS_REMOVE_FILE
  };
};

export const joinus = (user,cb) => dispatch => {
  dispatch(joinusStart());
  fetch('/api/v1/upload',
    { method: 'post',
      headers: { Accept: 'application/json' },
      body: user,
      credentials: 'same-origin'
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      dispatch(joinusSuccess(data));
      cb();
    })
    .catch(error => dispatch(joinusFail(error.message)));
};

export const addFile = path => dispatch => {
  dispatch(joinUsAddFile(path));
};
export const deleteFile = () => dispatch => {
  dispatch(joinUsDeleteFile());
};
