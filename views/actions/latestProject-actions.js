import {
  LATEST_PROJECT_START,
  LATEST_PROJECT_SUCCESS,
  LATEST_PROJECT_FAILURE
} from '../constants/actionTypes';

export const latestProjectStart = () => {
  return {
    type: LATEST_PROJECT_START
  };
};

export const latestProjectSuccess = project => {
  return {
    type: LATEST_PROJECT_SUCCESS,
    payload: project
  };
};

export const latestProjectFailure = message => {
  return {
    type: LATEST_PROJECT_FAILURE,
    payload: message
  };
};

export const fetchLatestProject = () => dispatch => {
  dispatch(latestProjectStart());
  fetch('/api/v1/project/latest',{
    credentials: 'same-origin'
  })
    .then(res => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }

      return res.json();
    })
    .then(data => dispatch(latestProjectSuccess(data)))
    .catch(err => dispatch(latestProjectFailure(err.message)));
};
