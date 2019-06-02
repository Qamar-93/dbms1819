import {
  SINGLE_NEWS_START,
  SINGLE_NEWS_FAIL,
  SINGLE_NEWS_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  error: undefined,
  news: {
    id: undefined,
    title: '',
    description: '',
    newsdate: '',
    url: ''
  }
};

const singleNews = (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_NEWS_START: {
      return {
        ...state,
        isFetching: true
      };
    }
    case SINGLE_NEWS_SUCCESS: {
      return {
        ...state,
        news: action.payload,
        isFetching: false
      };
    }
    case SINGLE_NEWS_FAIL: {
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    }
    default:
      return state;
  }
};

export default singleNews;
