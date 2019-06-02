import {
  LATEST_NEWS_START,
  LATEST_NEWS_SUCCESS,
  LATEST_NEWS_FAILURE
} from '../constants/actionTypes';

export const latestNewsStart = () => {
  return {
    type: LATEST_NEWS_START
  };
};

export const latestNewsSuccess = news => {
  return {
    type: LATEST_NEWS_SUCCESS,
    payload: news
  };
};

export const latestNewsFailure = message => {
  return {
    type: LATEST_NEWS_FAILURE,
    payload: message
  };
};

export const fetchLatestNews = () => dispatch => {
  dispatch(latestNewsStart());
  fetch('/api/v1/news/recent',{
    credentials: 'same-origin'
  })
    .then(res => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }

      return res.json();
    })
    .then(data => dispatch(latestNewsSuccess(data)))
    .catch(err => dispatch(latestNewsFailure(err.message)));
};
