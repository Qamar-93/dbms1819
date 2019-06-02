import {
  NEWSLIST_START,
  NEWSLIST_FAIL,
  NEWSLIST_SUCCESS,
  DELETE_NEWS_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  error: undefined,
  list: []
};

const newsList = (state = initialState, action) => {
  switch (action.type) {
    case NEWSLIST_START: {
      return {
        ...state,
        isFetching: true
      };
    }
    case NEWSLIST_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isFetching: false
      };
    }
    case NEWSLIST_FAIL: {
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    }
    case DELETE_NEWS_SUCCESS: {
      const newList = state.list.filter(news => news.id!== action.payload);

      return {
        ...state,
        list: newList
      };
    }
    default:
      return state;
  }
};

export default newsList;
