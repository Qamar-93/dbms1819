import {
  SINGLE_NEWS_START,
  SINGLE_NEWS_SUCCESS,
  SINGLE_NEWS_FAILURE,
  EDITNEWS_START,
  EDITNEWS_FAIL,
  DELETE_NEWS_START,
  DELETE_NEWS_SUCCESS,
  DELETE_NEWS_FAILURE
} from '../constants/actionTypes';
import * as newsListActions from './newsList-actions';
export const singleNewsStart = () => {
  return {
    type: SINGLE_NEWS_START
  };
};

export const singleNewsSuccess = project => {
  return {
    type: SINGLE_NEWS_SUCCESS,
    payload: project
  };
};

export const singleNewsFailure = message => {
  return {
    type: SINGLE_NEWS_FAILURE,
    payload: message
  };
};

export const fetchSingleNews = id => dispatch => {
  dispatch(singleNewsStart());
  fetch(`/api/v1/news/${id}`, {
    credentials: 'same-origin'
  })
    .then(res => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }

      return res.json();
    })
    .then(data => dispatch(singleNewsSuccess(data)))
    .catch(err => dispatch(singleNewsFailure(err.message)));
};

/******************* EDIT News */
const editNewsStart = () => {
  return {
    type: EDITNEWS_START
  };
};

const editNewsFail = err => {
  return {
    type: EDITNEWS_FAIL,
    payload: err
  };
};

const editNewsSuccess = news => {
  return {
    type: SINGLE_NEWS_SUCCESS,
    payload: news
  };
};

export const editNews = (news, id) => dispatch => {
  dispatch(editNewsStart());
  fetch(`/api/v1/editNews/${id}`,
    { method: 'post',
      headers: { Accept: 'application/json' },
      body: news,
      credentials: 'same-origin'
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      dispatch(editNewsSuccess(data));
    })
    .catch(err => {
      dispatch(editNewsFail(err.message));
    });
};

const deleteNewsStart = () => {
  return {
    type: DELETE_NEWS_START
  };
};

const deleteNewsFail = err => {
  return {
    type: DELETE_NEWS_FAILURE,
    payload: err
  };
};

const deleteNewsSuccess = id => {
  return {
    type: DELETE_NEWS_SUCCESS,
    payload: id
  };
};

export const deleteNews = news_id => dispatch => {
  dispatch(deleteNewsStart());
  fetch(`/api/v1/news/${news_id}/delete`,
    { credentials: 'same-origin'
    })
    .then(res => {
      return res.json();
    })
    .then(() => {
      dispatch(deleteNewsSuccess(news_id));
    })
    .catch(err => {
      dispatch(deleteNewsFail(err.message));
    });
};
