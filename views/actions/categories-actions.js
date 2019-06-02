import {
  CATEGORIES_FETCH_START,
  CATEGORIES_FETCH_SUCCESS,
  CATEGORIES_FETCH_FAILURE,
  CATEGORIES_CREATE_START,
  CATEGORIES_CREATE_SUCCESS,
  CATEGORIES_CREATE_FAILURE
} from '../constants/actionTypes';

const categoriesFetchStart = () => {
  return {
    type: CATEGORIES_FETCH_START
  };
};

const categoriesFetchSuccess = categories => {
  return {
    type: CATEGORIES_FETCH_SUCCESS,
    payload: categories
  };
};

const categoriesFetchFailure = message => {
  return {
    type: CATEGORIES_FETCH_FAILURE,
    payload: message
  };
};
const categoriesPostStart = () => {
  return {
    type: CATEGORIES_CREATE_START
  };
};

const categoriesPostSuccess = categories => {
  return {
    type: CATEGORIES_CREATE_SUCCESS,
    payload: categories
  };
};

const categoriesPostFailure = message => {
  return {
    type: CATEGORIES_CREATE_FAILURE,
    payload: message
  };
};

export const fetchCategories = () => dispatch => {
  dispatch(categoriesFetchStart());
  fetch('/api/v1/categories',{
    credentials: 'same-origin'
  })
    .then(res => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }

      return res.json();
    })
    .then(data => dispatch(categoriesFetchSuccess(data)))
    .catch(err => dispatch(categoriesFetchFailure(err.message)));
};
export const addCategory = (data, closeModal) => dispatch => {
  dispatch(categoriesPostStart());
  fetch('/api/v1/dashboard/addCategory',
    { method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: data,
      credentials: 'same-origin'
    })
    .then(res => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }

      return res.json();
    })
    .then(category => {
      dispatch(categoriesPostSuccess(category));
      closeModal();
    })
    .catch(err => dispatch(categoriesPostFailure(err.message)));
};
