import {
  SERVICE_FETCH_START,
  SERVICE_FETCH_SUCCESS,
  SERVICE_FETCH_FAILURE,
  ADDSERVICE_START,
  ADDSERVICE_FAIL,
  ADDSERVICE_SUCCESS,
  DELETE_SERVICE_SUCCESS,
  SINGLE_SERVICE_START,
  SINGLE_SERVICE_SUCCESS,
  SINGLE_SERVICE_FAILURE,
  EDITSERVICE_START,
  EDITSERVICE_SUCCESS,
  EDITSERVICE_FAIL,
  CONTACT_RESET_MESSAGE
} from '../constants/actionTypes';

const initialState = {
  services: [],
  service: {},
  error: undefined,
  isFetching: false,
  isSuccess: false
};

const service = (state = initialState, { type, payload }) => {
  switch (type) {
    case SERVICE_FETCH_START: {
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    }
    case SERVICE_FETCH_SUCCESS: {
      return {
        ...state,
        services: payload,
        isFetching: false
      };
    }
    case SERVICE_FETCH_FAILURE: {
      return {
        ...state,
        error: payload,
        isFetching: false
      };
    }
    case ADDSERVICE_START: {
      return {
        ...state,
        isFetching: true,
        isSuccess: false
      };
    }
    case ADDSERVICE_SUCCESS: {
      const newServices = [...state.services, service];

      return {
        ...state,
        service: payload,
        services: newServices,
        isFetching: false,
        isSuccess: true
      };

    }
    case ADDSERVICE_FAIL: {
      return {
        ...state,
        isFetching: false,
        error: payload
      };
    }
    case DELETE_SERVICE_SUCCESS: {
      const newServices = state.services.filter(sService => sService.id!== payload);

      return {
        ...state,
        services: newServices
      };
    }
    case SINGLE_SERVICE_START: {
      return {
        ...state,
        isFetching: true,
        isSuccess: false
      };
    }
    case SINGLE_SERVICE_SUCCESS: {
      return {
        ...state,
        service: payload,
        isFetching: false
      };
    }
    case SINGLE_SERVICE_FAILURE: {
      return {
        ...state,
        error: payload,
        isFetching: false
      };
    }
    case EDITSERVICE_START: {
      return {
        ...state,
        isFetching: true,
        isSuccess: false
      };
    }
    case EDITSERVICE_SUCCESS: {
      return {
        ...state,
        service: payload,
        isFetching: false,
        isSuccess: true
      };
    }
    case EDITSERVICE_FAIL: {
      return {
        ...state,
        isFetching: false,
        error: payload
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

export default service;
