import { combineReducers } from 'redux';
import service from './service-reducer';
import categories from './categories-reducer';
import navbar from './navbar-reducer';
import footer from './footer-reducer';
import project from './project-reducer';
import joinus from './joinus-reducer';
import contactus from './contactus-reducer';
import newsList from './newsList-reducer';
import aplicantsList from './aplicantsList-reducer';
import projectsList from './projectsList-reducer';
import login from './login-reducer';
import singleNews from './singleNews-reducer';
import addNews from './addNews-reducer';
import editNews from './editNews-reducer';
import latestProject from './latestProject-reducer';
import latestNews from './latestNews-reducer';
import team from './team-reducer';
import addService from './addService-reducer';

export default combineReducers({
  service,
  categories,
  navbar,
  project,
  joinus,
  footer,
  newsList,
  login,
  singleNews,
  contactus,
  aplicantsList,
  addNews,
  editNews,
  projectsList,
  latestProject,
  latestNews,
  team,
  addService
});
