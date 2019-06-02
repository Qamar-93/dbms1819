import {
  CONTACTUS_START,
  CONTACTUS_FAIL,
  CONTACTUS_SUCCESS,
  CONTACT_RESET_MESSAGE
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  error: undefined,
  isSuccess: false,
  user: {}
};

const contactus = (state = initialState, action) => {
  switch (action.type) {
    case CONTACTUS_START: {
      return {
        ...state,
        isFetching: true
      };
    }
    case CONTACTUS_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isSuccess: true,
        isFetching: false
      };
    }
    case CONTACTUS_FAIL: {
      return {
        ...state,
        error: action.payload,
        isFetching: false
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

export default contactus;
