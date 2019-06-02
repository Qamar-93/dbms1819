import {
  PROJECT_PICTURES_START,
  PROJECT_PICTURES_SUCCESS,
  PROJECT_PICTURES_FAILURE,
  SET_PROJECT_MAIN_SUCCESS,
  PROJECT_FETCH_START,
  PROJECT_FETCH_SUCCESS,
  PROJECT_FETCH_FAILURE,
  DELETE_PHOTO_SUCCESS,
  ADD_PHOTOS_SUCCESS,
  EDIT_PROJECT_START,
  EDIT_PROJECT_FAIL,
  EDIT_PROJECT_SUCCESS,
  ADD_PROJECT_START,
  ADD_PROJECT_FAILURE,
  RESET_MESSAGE,
  ADD_PROJECT_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  project: {
    details: {},
    pictures: []
  },
  isEdited: false,
  picturesFetching: false,
  error: undefined,
  isFetching: false
};

const project = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PROJECT_START: {
      return {
        ...state,
        isFetching: true
      };
    }
    case ADD_PROJECT_SUCCESS: {
      return {
        ...state,
        project: { details: {}, pictures: [] },
        isFetching: false
      };
    }
    case ADD_PROJECT_FAILURE: {
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    }
    case PROJECT_FETCH_START: {
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    }
    case PROJECT_FETCH_SUCCESS: {
      return {
        ...state,
        project: action.payload,
        isFetching: false
      };
    }
    case PROJECT_FETCH_FAILURE: {
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    }
    case EDIT_PROJECT_START: {
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    }
    case EDIT_PROJECT_SUCCESS: {
      return {
        ...state,
        project: { pictures: state.project.pictures, ...action.payload },
        isFetching: false,
        isEdited: true
      };
    }
    case RESET_MESSAGE: {
      return {
        ...state,
        isEdited: false
      };
    }
    case EDIT_PROJECT_FAIL: {
      return {
        ...state,
        error: action.payload,
        isFetching: false,
        isEdited: false
      };
    }
    case PROJECT_PICTURES_START: {
      return {
        ...state,
        error: undefined,
        isFetching: true
      };
    }
    case PROJECT_PICTURES_SUCCESS: {
      return {
        ...state,
        project: { ...state.project, pictures: action.payload },
        isFetching: false
      };
    }
    case PROJECT_PICTURES_FAILURE: {
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };
    }
    case ADD_PHOTOS_SUCCESS: {
      const newProject = { ...state.project, pictures: action.payload };

      return {
        ...state,
        project: newProject,
        isFetching: false
      };
    }
    case DELETE_PHOTO_SUCCESS: {
      const newProject = { ...state.project, pictures: action.payload };

      return {
        ...state,
        project: newProject,
        isFetching: false
      };
    }
    case SET_PROJECT_MAIN_SUCCESS: {
      const newPictures = state.project.pictures.map(picture => {
        if (picture.pic_id === action.payload) {
          picture.main = true;

          return picture;
        }
        picture.main = false;

        return picture;
      });

      return {
        ...state,
        project: { ...state.project, pictures: newPictures },
        isFetching: false
      };
    }
    default:
      return state;
  }
};

export default project;
