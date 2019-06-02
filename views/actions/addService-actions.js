import { ADDSERVICE_START, ADDSERVICE_FAIL, ADDSERVICE_SUCCESS, CONTACT_RESET_MESSAGE } from '../constants/actionTypes';

const addServiceStart = () => {
  return {
    type: ADDSERVICE_START
  };
};

const addServiceFail = err => {
  return {
    type: ADDSERVICE_FAIL,
    payload: err
  };
};

const addServiceSuccess = service => {
  return {
    type: ADDSERVICE_SUCCESS,
    payload: service
  };
};
const resetMessage = () => {
  return {
    type: CONTACT_RESET_MESSAGE
  };
};

export const addService = (service, cb) => dispatch => {
  dispatch(addServiceStart());
  fetch('/api/v1/dashboard/addService',
    { method: 'post',
      headers: { Accept: 'application/json' },
      body: service,
      credentials: 'same-origin'
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      dispatch(addServiceSuccess(data));
      cb();
      setTimeout(() => {
        dispatch(resetMessage());
      },2000);
    })
    .catch(err => dispatch(addServiceFail(err.message)));
};
