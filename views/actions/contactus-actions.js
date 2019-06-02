import { CONTACTUS_START, CONTACTUS_FAIL,
  CONTACTUS_SUCCESS,CONTACT_RESET_MESSAGE } from '../constants/actionTypes';

const contactUsStart = () => {
  return {
    type: CONTACTUS_START
  };
};

const contactUsFail = message => {
  return {
    type: CONTACTUS_FAIL,
    payload: message
  };
};

const contactUsSuccess = user => {
  return {
    type: CONTACTUS_SUCCESS,
    payload: user
  };
};
const resetMessage = () => {
  return {
    type: CONTACT_RESET_MESSAGE
  };
};

export const contactus = (user, cb) => dispatch => {

  dispatch(contactUsStart());
  fetch('/api/v1/contactus',
    { method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: user,
      credentials: 'same-origin'
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      dispatch(contactUsSuccess(data));
      cb();
      setTimeout(() => {
        dispatch(resetMessage());
      },2000);
    })
    .catch(err => {
      dispatch(contactUsFail(err.message));
    });
};
