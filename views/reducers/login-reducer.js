import {
  LOGIN_START,
  LOGIN_FAIL,
  LOGIN_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  isLoggedIn: false,
  user: {},
  error: undefined
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_START: {
      return {
        ...state,
        isFetching: true
      };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        isFetching: false
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        isFetching: false,
        isLoggedIn: false,
        error: action.payload
      };
    }
    default:
      return state;
  }
};

export default login;
