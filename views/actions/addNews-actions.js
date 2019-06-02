import { ADDNEWS_START, ADDNEWS_FAIL, ADDNEWS_SUCCESS } from '../constants/actionTypes';

const addNewsStart = () => {
  return {
    type: ADDNEWS_START
  };
};

const addNewsFail = err => {
  return {
    type: ADDNEWS_FAIL,
    payload: err
  };
};

const addNewsSuccess = user => {
  return {
    type: ADDNEWS_SUCCESS,
    payload: user
  };
};

export const addNews = news => dispatch => {
  dispatch(addNewsStart());
  fetch('/api/v1/dashboard/addNews',
    { method: 'post',
      headers: { Accept: 'application/json' },
      body: news,
      credentials: 'same-origin'
    })
    .then(res => {
      return res.json();
    })
    .then(data => dispatch(addNewsSuccess(data)))
    .catch(err => dispatch(addNewsFail(err.message)));
};
