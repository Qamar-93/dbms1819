import cookie from 'react-cookies';
import {
  NAV_TOGGLE,
  NAV_REMOVE,
  NAV_ADD,
  LANG_CHANGE
} from '../constants/actionTypes';
const language= cookie.load('lang');
const initialState = {
  navShown: false,
  hasNav: true,
  lang: language || 'Ar'
};

const navbar = (state = initialState, action) => {
  switch (action.type) {
    case NAV_TOGGLE: {
      return {
        ...state,
        navShown: !state.navShown
      };
    }
    case LANG_CHANGE: {
      cookie.save('lang', action.payload);

      return {
        ...state,
        lang: action.payload
      };
    }
    case NAV_REMOVE: {
      return {
        ...state,
        hasNav: false
      };
    }
    case NAV_ADD: {
      return {
        ...state,
        hasNav: true
      };
    }
    default:
      return state;
  }
};

export default navbar;
