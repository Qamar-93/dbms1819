import {
  APLICANTS_START,
  APLICANTS_FAIL,
  APLICANTS_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  error: undefined,
  list: []
};

const aplicantsList = (state = initialState, action) => {
  switch (action.type) {
    case APLICANTS_START: {
      return {
        ...state,
        isFetching: true
      };
    }
    case APLICANTS_SUCCESS: {
      return {
        ...state,
        list: action.payload,
        isFetching: false
      };
    }
    case APLICANTS_FAIL: {
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

export default aplicantsList;
