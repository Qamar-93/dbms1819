import {
  APLICANTS_START,
  APLICANTS_SUCCESS,
  APLICANTS_FAILURE,
  DELETE_APPLICANT_START,
  DELETE_APPLICANT_SUCCESS,
  DELETE_APPLICANT_FAILURE
} from '../constants/actionTypes';

export const aplicantsListStart = () => {
  return {
    type: APLICANTS_START
  };
};

export const aplicantsListSuccess = list => {
  return {
    type: APLICANTS_SUCCESS,
    payload: list
  };
};

export const aplicantsListFailure = message => {
  return {
    type: APLICANTS_FAILURE,
    payload: message
  };
};

export const deleteApplicantStart = () => {
  return {
    type: DELETE_APPLICANT_START
  };
};

export const deleteApplicantSuccess = applicant => {
  return {
    type: DELETE_APPLICANT_SUCCESS,
    payload: applicant
  };
};

export const deleteApplicantFailure = message => {
  return {
    type: DELETE_APPLICANT_FAILURE,
    payload: message
  };
};

export const fetchAplicantsList = () => dispatch => {
  dispatch(aplicantsListStart());

  fetch('/api/v1/applicants',{
    credentials: 'same-origin'
  })
    .then(res => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }

      return res.json();
    })
    .then(data => dispatch(aplicantsListSuccess(data)))
    .catch(err => dispatch(aplicantsListFailure(err.message)));
};

export const deleteApplicant = applicant_id => dispatch => {
  dispatch(deleteApplicantStart());

  fetch(`/api/v1/applicants/${applicant_id}/delete`,{
    credentials: 'same-origin'
  })
    .then(res => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }

      return res.json();
    })
    .then(data => {
      dispatch(deleteApplicantSuccess(data));
      dispatch(fetchAplicantsList());
    })
    .catch(err => dispatch(deleteApplicantFailure(err.message)));
};
