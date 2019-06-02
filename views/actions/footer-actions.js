import {
  FOOTER_REMOVE,
  FOOTER_ADD
} from '../constants/actionTypes';

export const removeFooter = () => {
  return {
    type: FOOTER_REMOVE
  };
};

export const addFooter = () => {
  return {
    type: FOOTER_ADD
  };
};
