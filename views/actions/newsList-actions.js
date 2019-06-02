import {
  NEWSLIST_START,
  NEWSLIST_SUCCESS,
  NEWSLIST_FAILURE
} from '../constants/actionTypes';

export const newsListStart = () => {
  return {
    type: NEWSLIST_START
  };
};

export const newsListSuccess = list => {
  return {
    type: NEWSLIST_SUCCESS,
    payload: list
  };
};

export const newsListFailure = message => {
  return {
    type: NEWSLIST_FAILURE,
    payload: message
  };
};

export const fetchNewsList = () => dispatch => {
  dispatch(newsListStart());
  fetch('/api/v1/news',{
    credentials: 'same-origin'
  })
    .then(res => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }

      return res.json();
    })
    .then(data => dispatch(newsListSuccess(data)))
    .catch(err => dispatch(newsListFailure(err.message)));
};
