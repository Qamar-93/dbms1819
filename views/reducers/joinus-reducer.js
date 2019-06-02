import {
  JOINUS_ADD_FILE,
  JOINUS_REMOVE_FILE,
  JOINUS_START,
  JOINUS_FAIL,
  JOINUS_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  error: undefined,
  isSuccess: false,
  user: {},
  files: {}
};

const joinus = (state = initialState, { type, payload }) => {
  switch (type) {
    case JOINUS_ADD_FILE: {
      return {
        ...state,
        files: payload
      };
    }
    case JOINUS_REMOVE_FILE: {
      return {
        ...state,
        files: {}
      };
    }
    case JOINUS_START: {
      return {
        ...state,
        isFetching: true
      };
    }
    case JOINUS_SUCCESS: {
      return {
        ...state,
        user: payload,
        isSuccess: true,
        isFetching: false
      };
    }
    case JOINUS_FAIL: {
      return {
        ...state,
        isFetching: false,
        error: payload
      };
    }
    default:
      return state;
  }
};

export default joinus;
