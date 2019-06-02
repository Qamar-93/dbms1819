import {
  NAV_TOGGLE,
  NAV_REMOVE,
  NAV_ADD,
  LANG_CHANGE
} from '../constants/actionTypes';
import * as translator from '../../translator.json';
export const toggleNav = () => {
  return {
    type: NAV_TOGGLE
  };
};
export const removeNav = () => {
  return {
    type: NAV_REMOVE
  };
};

export const addNav = () => {
  return {
    type: NAV_ADD
  };
};

export const langChange = lang => {
  return {
    type: LANG_CHANGE,
    payload: lang
  };
};
export const getTrans = text => (dispatch, getState) => {
  const lang = getState().navbar.lang.toLowerCase();
  if (lang === 'en')
    return text;
  else if (translator[text.toLowerCase()])
    return translator[text.toLowerCase()][lang];
  else
    return text;
};
