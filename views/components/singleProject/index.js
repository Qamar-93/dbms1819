import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './index.css';
import Loading from '../loading/index';
import * as navActions from '../../actions/navbar-actions';
import * as projectActions from '../../actions/project-actions';
import { HeaderWithouImge } from '../shared/title/index.js';

class SingleProject extends Component {
  componentDidMount() {
    const { fetchProject, match } = this.props;
    fetchProject(match.params.id);
  }
  render() {
    const { lang, project, getTrans, error, isFetching } = this.props;

    return (
      <section className='singleProject'>
        {
          isFetching ? (
            <div className='loading'>
              <Loading/>
            </div>
          ):(
            <div className='singleproject__content'>
              <HeaderWithouImge
                title={lang==='Ar' ? project.details.title_ar : project.details.title}/>
              <main className='singleProject__profile'>
                <div className='container'>
                  <div className='singleProject__upper row'>
                    <div className='singleProject__details'>
                      <p className='singleProject__description'> {
                        lang==='Ar' ? project.details.description_ar : project.details.description
                      }</p>
                      <p className=''><b>{getTrans('Owner')} : </b> {
                        lang==='Ar' ? project.details.client_ar : project.details.client
                      }</p>
                      <p className=''><b>{getTrans('Location')} : </b> {
                        lang==='Ar' ? project.details.location_ar : project.details.location
                      }</p>
                    </div>
                    <div className='singleProject__main'>
                      {project.pictures.map(picture => (
                        picture.main ? <img className='mainImg' src={picture.url}
                          key={`picture@${picture.pic_id}`} alt='project image' /> : <div></div>
                      ))}
                    </div>
                  </div>
                  <div className='singleProject__notMain'>
                    {project.pictures.map(picture => (
                      picture.main ? <div></div> :
                        <div className='notMainImg__container'>
                          <img className='notMainImg' src={picture.url}
                            key={`picture@${picture.pic_id}`} alt='project image' /></div>
                    ))}
                  </div>
                </div>
              </main>
            </div>
          )
        }
        { error && (
          <div className='error'>
            { error }
          </div>
        )}
      </section>

    );
  }
}

SingleProject.propTypes = {
  project: PropTypes.object,
  fetchProject: PropTypes.func,
  match: PropTypes.object,
  error: PropTypes.string,
  lang: PropTypes.string,
  getTrans: PropTypes.func,
  isFetching: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    project: state.project.project,
    lang: state.navbar.lang,
    error: state.project.error,
    isFetching: state.project.isFetching
  };
};
const mapDispatchToProps = {
  ...projectActions,
  ...navActions
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleProject);
