import {
  FILTER_PROJECTS,
  PROJECTSLIST_START,
  PROJECTSLIST_SUCCESS,
  PROJECTSLIST_FAILURE,
  DELTET_PROJECT_START,
  DELTET_PROJECT_FAIL,
  DELTET_PROJECT_SUCCESS
} from '../constants/actionTypes';

const projectsListStart = () => {
  return {
    type: PROJECTSLIST_START
  };
};

const projectsListSuccess = list => {
  return {
    type: PROJECTSLIST_SUCCESS,
    payload: list
  };
};

const projectsListFailure = message => {
  return {
    type: PROJECTSLIST_FAILURE,
    payload: message
  };
};

export const fetchProjectsList = () => dispatch => {
  dispatch(projectsListStart());

  fetch('/api/v1/projects',{
    credentials: 'same-origin'
  })
    .then(res => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }

      return res.json();
    })
    .then(data => dispatch(projectsListSuccess(data)))
    .catch(err => dispatch(projectsListFailure(err.message)));
};

///////// Delete project

const deleteProjectStart = () => {
  return {
    type: DELTET_PROJECT_START
  };
};

const deleteProjectFail = err => {
  return {
    type: DELTET_PROJECT_FAIL,
    payload: err
  };
};

const deleteProjectSuccess = id => {
  return {
    type: DELTET_PROJECT_SUCCESS,
    payload: id
  };
};
const filterProjectsStart = category => {
  return {
    type: FILTER_PROJECTS,
    payload: category
  };
};

export const deleteProject= project_id => dispatch => {
  dispatch(deleteProjectStart());
  fetch(`/api/v1/project/${project_id}/delete`,
    { credentials: 'same-origin'
    })
    .then(res => {
      return res.json();
    })
    .then(() => dispatch(deleteProjectSuccess(project_id)))
    .catch(err => dispatch(deleteProjectFail(err.message)));
};
export const filterProjects= category => dispatch => {
  dispatch(filterProjectsStart(category));
};
