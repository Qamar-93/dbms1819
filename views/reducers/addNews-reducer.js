import {
  ADDNEWS_START,
  ADDNEWS_FAIL,
  ADDNEWS_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  news: {},
  error: undefined
};

const addNews = (state = initialState, action) => {
  switch (action.type) {
    case ADDNEWS_START: {
      return {
        ...state,
        isFetching: true
      };
    }
    case ADDNEWS_SUCCESS: {
      return {
        ...state,
        news: action.payload,
        isFetching: false
      };
    }
    case ADDNEWS_FAIL: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default addNews;
