import {
  LATEST_PROJECT_START,
  LATEST_PROJECT_SUCCESS,
  LATEST_PROJECT_FAILURE

} from '../constants/actionTypes';

const initialState = {
  project: {},
  error: undefined,
  isFetching: false
};

const latestProject = (state = initialState, action) => {
  switch (action.type) {
    case LATEST_PROJECT_START: {
      return {
        ...state,
        isFetching: true
      };
    }
    case LATEST_PROJECT_SUCCESS: {
      return {
        ...state,
        project: action.payload,
        isFetching: false
      };
    }
    case LATEST_PROJECT_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }

    default:
      return state;
  }
};

export default latestProject;
