import {
  PROJECT_FETCH_START,
  PROJECT_FETCH_SUCCESS,
  PROJECT_FETCH_FAILURE,
  PROJECT_PICTURES_START,
  PROJECT_PICTURES_SUCCESS,
  PROJECT_PICTURES_FAILURE,
  SET_PROJECT_MAIN_SUCCESS,
  ADD_PROJECT_START,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAILURE,
  ADD_PHOTOS_SUCCESS,
  DELETE_PHOTO_SUCCESS,
  EDIT_PROJECT_START,
  EDIT_PROJECT_FAIL,
  RESET_MESSAGE,
  EDIT_PROJECT_SUCCESS
} from '../constants/actionTypes';

export const projectFetchStart = () => {
  return {
    type: PROJECT_FETCH_START
  };
};

export const projectFetchSuccess = project => {
  return {
    type: PROJECT_FETCH_SUCCESS,
    payload: project
  };
};

export const projectFetchFailure = message => {
  return {
    type: PROJECT_FETCH_FAILURE,
    payload: message
  };
};

export const fetchProject = id => dispatch => {
  dispatch(projectFetchStart());
  fetch(`/api/v1/projects/${id}`,{
    credentials: 'same-origin'
  })
    .then(res => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }

      return res.json();
    })
    .then(data => dispatch(projectFetchSuccess(data)))
    .catch(err => dispatch(projectFetchFailure(err.message)));
};
// GET Project Photos
const projectPicturesStart = () => {
  return {
    type: PROJECT_PICTURES_START
  };
};

const projectPicturesSuccess = pictures => {
  return {
    type: PROJECT_PICTURES_SUCCESS,
    payload: pictures
  };
};

const projectPicturesFailure = message => {
  return {
    type: PROJECT_PICTURES_FAILURE,
    payload: message
  };
};

export const fetchProjectPictures = id => dispatch => {
  dispatch(projectPicturesStart());
  fetch(`/api/v1/project/${id}/pictures`,{
    credentials: 'same-origin'
  })
    .then(res => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }

      return res.json();
    })
    .then(pictures => dispatch(projectPicturesSuccess(pictures)))
    .catch(err => dispatch(projectPicturesFailure(err.message)));
};
// Set Project Main Picture
const setProjectPicSuccess = pictureId => {
  return {
    type: SET_PROJECT_MAIN_SUCCESS,
    payload: pictureId
  };
};

export const setProjectPic = (project_id, pic_id) => dispatch => {
  dispatch(projectPicturesStart());
  fetch(`/api/v1/dashboard/mainPic/${project_id}/${pic_id}`,{
    credentials: 'same-origin'
  })
    .then(res => {
      if (res.status >= 400) {
        throw new Error('Bad response from server');
      }

      return res.json();
    })
    .then(() => dispatch(setProjectPicSuccess(pic_id)))
    .catch(err => dispatch(projectPicturesFailure(err.message)));
};
/* Add Project */

const addProjectStart = () => {
  return {
    type: ADD_PROJECT_START
  };
};

const addProjectFail = err => {
  return {
    type: ADD_PROJECT_FAILURE,
    payload: err
  };
};

const addProjectSuccess = project => {
  return {
    type: ADD_PROJECT_SUCCESS,
    payload: project
  };
};
const addPhotosSuccess = photos => {

  return {
    type: ADD_PHOTOS_SUCCESS,
    payload: photos
  };
};
const deletePhotoSuccess = pictureId => {
  return {
    type: DELETE_PHOTO_SUCCESS,
    payload: pictureId
  };
};

export const addProject = (project, history) => dispatch => {
  dispatch(addProjectStart());
  fetch('/api/v1/dashboard/addProject',{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: project,
    credentials: 'same-origin'
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      dispatch(addProjectSuccess(data));
      history.push(`/dashboard/project/${data.id}/pictures`);
    })
    .catch(err => {
      dispatch(addProjectFail(err.message));
    });
};
// Add photo to project
export const postPhoto = (projectId, files) => dispatch => {
  dispatch(projectPicturesStart());
  fetch(`/api/v1/dashboard/addProjectPic/${projectId}`,{
    method: 'post',
    body: files,
    credentials: 'same-origin'
  })
    .then(res => {
      return res.json();
    })
    .then(photos => dispatch(addPhotosSuccess(photos)))
    .catch(err => dispatch(projectPicturesFailure(err.message)));
};
// Delete a photo
export const deleteProjectPic = (projectId, pictureId) => dispatch => {
  dispatch(projectPicturesStart());
  fetch(`/api/v1/dashboard/deletePic/${projectId}/${pictureId}`,{
    credentials: 'same-origin'
  })
    .then(res => {
      return res.json();
    })
    .then(data => dispatch(deletePhotoSuccess(data)))
    .catch(err => dispatch(projectPicturesFailure(err.message)));
};

//  Edit Project
export const editProjectStart = () => {
  return {
    type: EDIT_PROJECT_START
  };
};

export const editProjectSuccess = project => {
  return {
    type: EDIT_PROJECT_SUCCESS,
    payload: project
  };
};

const resetMessage = () => {
  return {
    type: RESET_MESSAGE
  };
};

export const editProjectFailure = message => {
  return {
    type: EDIT_PROJECT_FAIL,
    payload: message
  };
};

export const editProject = (project, id) => dispatch => {
  dispatch(editProjectStart());
  fetch(`/api/v1/editProject/${id}`,
    { method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: project,
      credentials: 'same-origin'
    })
    .then(res => {
      return res.json();
    })
    .then(data => {
      dispatch(editProjectSuccess(data));
      setTimeout(() => {
        dispatch(resetMessage());
      },2000);
    })
    .catch(err => {
      dispatch(editProjectFailure(err.message));
    });
};
