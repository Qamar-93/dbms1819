import {
  FETCH_TEAM_START,
  FETCH_TEAM_SUCCESS,
  FETCH_TEAM_FAILURE,
  ADDMEMBER_START,
  ADDMEMBER_FAIL,
  ADDMEMBER_SUCCESS,
  DELETE_MEMBER_SUCCESS,
  FETCH_MEMBER_START,
  FETCH_MEMBER_SUCESS,
  FETCH_MEMBER_FAIL,
  EDITMEMBER_START,
  EDITMEMBER_SUCCESS,
  CONTACT_RESET_MESSAGE
} from '../constants/actionTypes';

const initialState = {
  team: [],
  member: {},
  error: undefined,
  isFetching: false,
  isSuccess: false
};

const team = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCH_TEAM_START: {
      return {
        ...state,
        isFetching: true,
        isSuccess: false
      };
    }
    case FETCH_TEAM_SUCCESS: {
      return {
        ...state,
        team: payload,
        isFetching: false,
        isSuccess: false
      };
    }
    case FETCH_TEAM_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: payload
      };
    }
    case ADDMEMBER_START: {
      return {
        ...state,
        isFetching: true,
        isSuccess: false
      };
    }
    case ADDMEMBER_SUCCESS: {
      const newTeam = [...state.team, payload];

      return {
        ...state,
        team: newTeam,
        member: payload,
        isFetching: false,
        isSuccess: true
      };
    }
    case DELETE_MEMBER_SUCCESS: {
      const newTeam = state.team.filter(member => member.id!== payload.id);

      return {
        ...state,
        team: newTeam,
        member: payload,
        isFetching: false
      };
    }
    case ADDMEMBER_FAIL: {
      return {
        ...state,
        isFetching: false,
        error: payload
      };
    }
    case FETCH_MEMBER_START: {
      return {
        ...state,
        isFetching: true,
        isSuccess: false
      };
    }
    case FETCH_MEMBER_SUCESS: {
      return {
        ...state,
        member: payload,
        isFetching: false
      };
    }
    case FETCH_MEMBER_FAIL: {
      return {
        ...state,
        error: payload,
        isFetching: false
      };
    }
    case EDITMEMBER_START: {
      return {
        ...state,
        isFetching: true,
        isSuccess: false
      };
    }
    case EDITMEMBER_SUCCESS: {
      return {
        ...state,
        member: payload,
        isFetching: false,
        isSuccess: true
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

export default team;
