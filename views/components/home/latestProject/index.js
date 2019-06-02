import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../loading/index';
import * as latestProjectActions from '../../../actions/latestProject-actions.js';
import * as navbarActions from '../../../actions/navbar-actions.js';


import './index.css';

class LatestProject extends Component {
  componentDidMount() {
    const { fetchLatestProject } = this.props;
    fetchLatestProject();
  }

  render() {
    const { project, error, isFetching,lang, getTrans } = this.props;

    return (
      <section className='latestProject'>
        <div className='latestProject__content container'>
          {
            isFetching? <Loading />
              : error? <h2>{error}</h2>
                : (
                  <div className='latestProject__slide inner-container row'>
                    <div className='latestProject__description'>
                      <h3 className='home-services__title'>
                        <span className='number'>02</span>
                        {getTrans('Latest Project')}</h3>
                      <p className='latestProject__subtitle'>
                        {lang === 'En'? project.title: project.title_ar}</p>
                      <p className='latestProject__paragraph'>
                        {lang === 'En'? project.description: project.description_ar}</p>
                      <a className='latestProject__link' href='/portfolio'>{getTrans('Explore More Projects')}</a>
                    </div>
                    <div style= {{ backgroundImage: `url(${project.url})` }}
                      className='col60 home-services__before'>
                      <span className='img__title'></span>
                    </div>
                  </div>
                )
          }
        </div>
      </section>
    );
  }
}
LatestProject.propTypes = {
  fetchLatestProject: PropTypes.func,
  getTrans: PropTypes.func,
  isFetching: PropTypes.bool,
  project: PropTypes.object,
  error: PropTypes.string,
  lang: PropTypes.string
};

const mapStateToProps = state => {

  return {
    isFetching: state.latestProject.isFetching,
    project: state.latestProject.project,
    error: state.latestProject.error,
    lang: state.navbar.lang
  };
};

const mapDispatchToProps = {
  ...latestProjectActions,
  ...navbarActions
};
export default connect(mapStateToProps,mapDispatchToProps)(LatestProject);
