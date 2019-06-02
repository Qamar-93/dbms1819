import {
  FETCH_TEAM_START,
  FETCH_TEAM_SUCCESS,
  FETCH_TEAM_FAILURE,
  ADDMEMBER_START,
  ADDMEMBER_FAIL,
  ADDMEMBER_SUCCESS,
  DELETE_MEMBER_SUCCESS,
  FETCH_MEMBER_START,
  FETCH_MEMBER_FAIL,
  FETCH_MEMBER_SUCESS,
  EDITMEMBER_START,
  EDITMEMBER_SUCCESS,
  CONTACT_RESET_MESSAGE
} from '../constants/actionTypes';

export const fetchTeamStart = () => {
  return {
    type: FETCH_TEAM_START
  };
};

export const fetchTeamSuccess = team => {
  return {
    type: FETCH_TEAM_SUCCESS,
    payload: team
  };
};

export const fetchTeamFailure = message => {
  return {
    type: FETCH_TEAM_FAILURE,
    payload: message
  };
};

export const fetchTeam = () => dispatch => {
  dispatch(fetchTeamStart());
  fetch('/api/v1/team',{
    credentials: 'same-origin'
  })
    .then(res => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }

      return res.json();
    })
    .then(data => dispatch(fetchTeamSuccess(data)))
    .catch(err => dispatch(fetchTeamFailure(err.message)));
};

const addMemberStart = () => {
  return {
    type: ADDMEMBER_START
  };
};

const addMemberFail = err => {
  return {
    type: ADDMEMBER_FAIL,
    payload: err
  };
};

const addMemberSuccess = member => {
  return {
    type: ADDMEMBER_SUCCESS,
    payload: member
  };
};
const resetMessage = () => {
  return {
    type: CONTACT_RESET_MESSAGE
  };
};

export const addTeamMember = (member, cb) => dispatch => {
  dispatch(addMemberStart());
  fetch('/api/v1/dashboard/team/addMember',
    { method: 'post',
      headers: { Accept: 'application/json' },
      body: member,
      credentials: 'same-origin'
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      dispatch(addMemberSuccess(data));
      cb();
      setTimeout(() => {
        dispatch(resetMessage());
      },2000);
    })
    .catch(err =>
      dispatch(addMemberFail(err.message)));
};

const deleteMemberSuccess = id => {
  return {
    type: DELETE_MEMBER_SUCCESS,
    payload: id
  };
};

export const deleteMember = member_id => dispatch => {
  fetch(`/api/v1/team/${member_id}/delete`,
    { credentials: 'same-origin'
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      dispatch(deleteMemberSuccess(data));
    })
    .catch(err => {
      dispatch(fetchTeamFailure(err.message));
    });
};

export const fetchMemberStart = () => {
  return {
    type: FETCH_MEMBER_START
  };
};

export const fetchMemberSuccess = service => {
  return {
    type: FETCH_MEMBER_SUCESS,
    payload: service
  };
};

export const fetchMemberFailure = message => {
  return {
    type: FETCH_MEMBER_FAIL,
    payload: message
  };
};
export const editMemberStart = () => {
  return {
    type: EDITMEMBER_START
  };
};
export const editMemberSuccess = member => {
  return {
    type: EDITMEMBER_SUCCESS,
    payload: member
  };
};

export const fetchMember = member_id => dispatch => {
  dispatch(fetchMemberStart());
  fetch(`/api/v1/team/${member_id}`, {
    credentials: 'same-origin'
  })
    .then(res => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }

      return res.json();
    })
    .then(data => dispatch(fetchMemberSuccess(data)))
    .catch(err => dispatch(fetchMemberFailure(err.message)));
};

export const editMember = (member, id) => dispatch => {
  dispatch(editMemberStart());
  fetch(`/api/v1/team/${id}/edit`,
    { method: 'post',
      headers: { Accept: 'application/json' },
      body: member,
      credentials: 'same-origin'
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      dispatch(editMemberSuccess(data));
      setTimeout(() => {
        dispatch(resetMessage());
      },2000);
    })
    .catch(err =>
      dispatch(fetchMemberFailure(err.message)));
};
