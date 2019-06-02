import {
  ADDSERVICE_START,
  ADDSERVICE_FAIL,
  ADDSERVICE_SUCCESS,
  CONTACT_RESET_MESSAGE
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  service: {},
  error: undefined,
  isSuccess: false
};

const addService = (state = initialState, action) => {
  switch (action.type) {
    case ADDSERVICE_START: {
      return {
        ...state,
        isFetching: true
      };
    }
    case ADDSERVICE_SUCCESS: {
      return {
        ...state,
        service: action.payload,
        isFetching: false,
        isSuccess: true
      };
    }
    case ADDSERVICE_FAIL: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case CONTACT_RESET_MESSAGE: {
      return {
        ...state,
        isSuccess: false
      };
    }
    default:
      return state;
  }
};

export default addService;
