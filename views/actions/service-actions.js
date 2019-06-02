import {
  SERVICE_FETCH_START,
  SERVICE_FETCH_SUCCESS,
  SERVICE_FETCH_FAILURE,
  DELETE_SERVICE_START,
  DELETE_SERVICE_FAILURE,
  DELETE_SERVICE_SUCCESS,
  EDITSERVICE_START,
  EDITSERVICE_FAIL,
  EDITSERVICE_SUCCESS,
  SINGLE_SERVICE_START,
  SINGLE_SERVICE_SUCCESS,
  SINGLE_SERVICE_FAILURE,
  CONTACT_RESET_MESSAGE
} from '../constants/actionTypes';

export const serviceFetchStart = () => {
  return {
    type: SERVICE_FETCH_START
  };
};

export const serviceFetchSuccess = service => {
  return {
    type: SERVICE_FETCH_SUCCESS,
    payload: service
  };
};

export const serviceFetchFailure = message => {
  return {
    type: SERVICE_FETCH_FAILURE,
    payload: message
  };
};

export const fetchServices = () => dispatch => {
  dispatch(serviceFetchStart());

  fetch('/api/v1/services',{
    credentials: 'same-origin'
  })
    .then(res => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }

      return res.json();
    })
    .then(data => dispatch(serviceFetchSuccess(data)))
    .catch(err => dispatch(serviceFetchFailure(err.message)));
};

const deleteServiceStart = () => {
  return {
    type: DELETE_SERVICE_START
  };
};

const deleteServiceFail = err => {
  return {
    type: DELETE_SERVICE_FAILURE,
    payload: err
  };
};

const deleteServiceSuccess = id => {
  return {
    type: DELETE_SERVICE_SUCCESS,
    payload: id
  };
};

export const deleteService = service_id => dispatch => {
  dispatch(deleteServiceStart());
  fetch(`/api/v1/services/${service_id}/delete`,
    { credentials: 'same-origin'
    })
    .then(res => {
      return res.json();
    })
    .then(() => {
      dispatch(deleteServiceSuccess(service_id));
    })
    .catch(err => {
      dispatch(deleteServiceFail(err.message));
    });
};
/// Edit service
export const singleServiceStart = () => {
  return {
    type: SINGLE_SERVICE_START
  };
};

export const singleServiceSuccess = service => {
  return {
    type: SINGLE_SERVICE_SUCCESS,
    payload: service
  };
};

export const singleServiceFailure = message => {
  return {
    type: SINGLE_SERVICE_FAILURE,
    payload: message
  };
};

export const fetchSingleService = service_id => dispatch => {
  dispatch(singleServiceStart());
  fetch(`/api/v1/services/${service_id}`, {
    credentials: 'same-origin'
  })
    .then(res => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }

      return res.json();
    })
    .then(data => dispatch(singleServiceSuccess(data)))
    .catch(err => dispatch(singleServiceFailure(err.message)));
};

const editServiceStart = () => {
  return {
    type: EDITSERVICE_START
  };
};

const editServiceFail = err => {
  return {
    type: EDITSERVICE_FAIL,
    payload: err
  };
};

const editServiceSuccess = service => {
  return {
    type: EDITSERVICE_SUCCESS,
    payload: service
  };
};
const resetMessage = () => {
  return {
    type: CONTACT_RESET_MESSAGE
  };
};
export const editService = (service, id) => dispatch => {
  dispatch(editServiceStart());
  fetch(`/api/v1/services/${id}/edit`,
    { method: 'post',
      headers: { Accept: 'application/json' },
      body: service,
      credentials: 'same-origin'
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      dispatch(editServiceSuccess(data));
      setTimeout(() => {
        dispatch(resetMessage());
      },2000);
    })
    .catch(err =>
      dispatch(editServiceFail(err.message)));
};
