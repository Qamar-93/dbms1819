import {
  FOOTER_REMOVE,
  FOOTER_ADD
} from '../constants/actionTypes';

const initialState = {
  hasFooter: true
};

const footer = (state = initialState, action) => {
  switch (action.type) {
    case FOOTER_REMOVE: {
      return {
        ...state,
        hasFooter: false
      };
    }
    case FOOTER_ADD: {
      return {
        ...state,
        hasFooter: true
      };
    }
    default:
      return state;
  }
};

export default footer;
