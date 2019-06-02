import {
  EDITNEWS_START,
  EDITNEWS_FAIL,
  EDITNEWS_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  news: {},
  error: undefined
};

const editNews = (state = initialState, action) => {
  switch (action.type) {
    case EDITNEWS_START: {
      return {
        ...state,
        isFetching: true
      };
    }
    case EDITNEWS_SUCCESS: {
      return {
        ...state,
        news: action.payload,
        isFetching: false
      };
    }
    case EDITNEWS_FAIL: {
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

export default editNews;
