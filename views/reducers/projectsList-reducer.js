import {
  FILTER_PROJECTS,
  PROJECTSLIST_START,
  PROJECTSLIST_FAIL,
  PROJECTSLIST_SUCCESS,
  DELTET_PROJECT_START,
  DELTET_PROJECT_FAIL,
  DELTET_PROJECT_SUCCESS
} from '../constants/actionTypes';

const initialState = {
  isFetching: false,
  error: undefined,
  list: [], // all projects
  activeCategory: 'all',
  projects: [], // after filtering
  categories_en: [],
  categories_ar: []
};

const proejctsList = (state = initialState, { type, payload }) => {
  switch (type) {
    case PROJECTSLIST_START: {
      return {
        ...state,
        isFetching: true
      };
    }
    case PROJECTSLIST_SUCCESS: {
      const newCategories_ar = new Set();
      const newCategories_en = new Set();
      payload.forEach(project => {
        newCategories_en.add(project.category_title_en);
        newCategories_ar.add(project.category_title_ar);
      });

      return {
        ...state,
        list: payload,
        projects: payload,
        categories_ar: Array.from(newCategories_ar),
        categories_en: Array.from(newCategories_en),
        isFetching: false
      };
    }
    case PROJECTSLIST_FAIL: {
      return {
        ...state,
        error: payload,
        isFetching: false
      };
    }
    case DELTET_PROJECT_START: {
      return {
        ...state,
        isFetching: true
      };
    }
    case DELTET_PROJECT_FAIL: {
      return {
        ...state,
        error: payload,
        isFetching: false
      };
    }
    case DELTET_PROJECT_SUCCESS: {
      const projectList = state.list.filter(project => project.id!== payload);

      return {
        ...state,
        list: projectList,
        isFetching: false
      };
    }
    case FILTER_PROJECTS: {
      let projectList;
      if (payload === 'all') projectList = state.list;
      else projectList = state.list.filter(project =>
        project.category_title_ar === payload || project.category_title_en === payload);

      return {
        ...state,
        projects: projectList,
        activeCategory: payload
      };
    }
    default:
      return state;
  }
};

export default proejctsList;
