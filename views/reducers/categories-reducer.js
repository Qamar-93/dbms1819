import {
  CATEGORIES_FETCH_START,
  CATEGORIES_FETCH_SUCCESS,
  CATEGORIES_FETCH_FAILURE,
  CATEGORIES_CREATE_START,
  CATEGORIES_CREATE_SUCCESS,
  CATEGORIES_CREATE_FAILURE
} from '../constants/actionTypes';

const initialState = {
  categories: [],
  error: undefined,
  isFetching: false,
  createError: undefined,
  createIsFetching: false
};

const category = (state = initialState, { type, payload }) => {
  switch (type) {
    case CATEGORIES_FETCH_START: {
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    }
    case CATEGORIES_FETCH_SUCCESS: {
      return {
        ...state,
        categories: payload,
        isFetching: false
      };
    }
    case CATEGORIES_FETCH_FAILURE: {
      return {
        ...state,
        error: payload,
        isFetching: false
      };
    }
    case CATEGORIES_CREATE_START: {
      return {
        ...state,
        createError: undefined,
        createIsFetching: true
      };
    }
    case CATEGORIES_CREATE_SUCCESS: {
      const newCategories = [payload, ...state.categories];

      return {
        ...state,
        categories: newCategories,
        createIsFetching: false,
        createError: undefined
      };
    }
    case CATEGORIES_CREATE_FAILURE: {
      return {
        ...state,
        createError: payload,
        createIsFetching: false
      };
    }
    default:
      return state;
  }
};

export default category;
