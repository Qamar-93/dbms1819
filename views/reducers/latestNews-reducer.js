import {
  LATEST_NEWS_START,
  LATEST_NEWS_SUCCESS,
  LATEST_NEWS_FAILURE

} from '../constants/actionTypes';

const initialState = {
  news: [],
  error: undefined,
  isFetching: false
};

const latestNews = (state = initialState, action) => {
  switch (action.type) {
    case LATEST_NEWS_START: {
      return {
        ...state,
        isFetching: true
      };
    }
    case LATEST_NEWS_SUCCESS: {
      return {
        ...state,
        news: action.payload,
        isFetching: false
      };
    }
    case LATEST_NEWS_FAILURE: {
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

export default latestNews;
