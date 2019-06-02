import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import configureStore from './configure-store.js';
import { loadState, saveState } from './localStorage';
import './index.css';
import Nav from './components/navbar';
import Home from './components/home';
import Shop from './components/shop';
import Services from './components/services';
import SingleProject from './components/singleProject';
import Footer from './components/footer';
import AboutUs from './components/aboutUs';
import JoinUs from './components/joinUs';
import Login from './components/login';
import Dashboard from './components/dashboard';
import NewsList from './components/newsList';
import SingleNews from './components/singleNews';
import Portfolio from './components/portfolio';
import ContactUs from './components/contactUs/ContactUs';
import PageNotFound from './components/pageNotFound';
import Projects from './components/dashboard/projects';
import Applicants from './components/dashboard/aplicants';
import News from './components/dashboard/news';
import AddNews from './components/dashboard/addNews';
import AddProject from './components/dashboard/addProject';
import EditNews from './components/dashboard/editNews';
import EditProject from './components/dashboard/editProject';
import ProjectPhotos from './components/dashboard/projectPhotos';
import DashboardServices from './components/dashboard/services';
import AddService from './components/dashboard/addNewService';
import EditService from './components/dashboard/editService';
import DashboardTeam from './components/dashboard/team';
import AddMember from './components/dashboard/addTeamMember';
import EditMember from './components/dashboard/editMember';
import Rtl from './components/rtl';

const persistedState = loadState();
const store = configureStore(persistedState);
store.subscribe(() => {
  saveState(store.getState());
});
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div className='app'>
        <Switch>
          <Route path='/dashboard/'>
            <Dashboard>
              <Switch>
                <Route exact path='/dashboard/projects' component={Projects} />
                <Route exact path='/dashboard/applicants' component={Applicants} />
                <Route exact path='/dashboard/addNews' component={AddNews} />
                <Route exact path='/dashboard/addProject' component={AddProject} />
                <Route exact path='/dashboard/addService' component={AddService} />
                <Route exact path='/dashboard/project/:id/pictures' component={ProjectPhotos} />
                <Route exact path='/dashboard/editNews/:id' component={EditNews} />
                <Route exact path='/dashboard/editProject/:id' component={EditProject} />
                <Route exact path='/dashboard/services' component={DashboardServices} />
                <Route exact path='/dashboard/services/:id/edit' component={EditService} />
                <Route exact path='/dashboard/addMember' component={AddMember} />
                <Route exact path='/dashboard/team' component={DashboardTeam} />
                <Route exact path='/dashboard/team/:member_id/edit' component={EditMember} />
                <Route path='/dashboard/' component={News} />
              </Switch>
            </Dashboard>
          </Route>
          <Route exact path='/login' component={Login} />
          <Route>
            <Rtl>
              <Nav />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/services' component={Services} />
                <Route exact path='/portfolio' component={Portfolio} />
                <Route exact path='/aboutUs' component={AboutUs} />
                <Route exact path='/join' component={JoinUs} />
                <Route exact path='/shop' component={Shop} />
                <Route exact path='/news' component={NewsList} />
                <Route exact path='/contactus' component={ContactUs} />
                <Route exact path='/news/:id' component={SingleNews} />
                <Route exact path='/project/:id' component={SingleProject} />
                <Route path='*' component={PageNotFound} />
              </Switch>
              <Footer/>
            </Rtl>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
