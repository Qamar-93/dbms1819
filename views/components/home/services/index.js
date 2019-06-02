import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../../loading/index';
import * as navbarActions from '../../../actions/navbar-actions.js';
import * as serviceActions from '../../../actions/service-actions';

import * as staticContent from '../../../../staticContent.json';
import './index.css';

class Services extends Component {
  componentWillMount() {
    const { fetchServices } = this.props;
    fetchServices();
  }

  render() {
    const { getTrans,lang,services,error } = this.props;


    return (
      <section className='home-services' id='services'>
        <div className='home-services__content container'>
          {
            !services[0] ? <Loading />
              : error? <h2>{error}</h2>
                : (
                  <div className='home-services__slide inner-container row'>
                    <div className='home-services__description col25'>
                      <h3 className='home-services__title'>
                        <span className='number'>01</span>
                        {getTrans('OUR SERVICES')}</h3>
                      <p className='home-services__paragraph'>
                        {staticContent.homepage.services[lang.toLowerCase()]}</p>
                      <a className='home-services__link' href='/services'>
                        {getTrans('LEARN MORE')}</a>
                    </div>
                    <div style= {{ backgroundImage: `url(${services[0].url})` }}
                      className='col25 home-services__before'>
                      <span className='img__title'>
                        {lang === 'En'? services[0].title: services[0].title_ar}</span>
                    </div>
                    <div style= {{ backgroundImage: `url(${services[1].url})` }}
                      className='col50 home-services__before'>
                      <span className='img__title'>
                        {lang === 'En'? services[1].title: services[1].title_ar}</span>
                    </div>
                    <div style= {{ backgroundImage: `url(${services[2].url})` }}
                      className='col50 home-services__before'>
                      <span className='img__title'>
                        {lang === 'En'? services[2].title: services[2].title_ar}</span>
                    </div>
                    <div style= {{ backgroundImage: `url(${services[3].url})` }}
                      className='col25 home-services__before'>
                      <span className='img__title'>
                        {lang === 'En'? services[3].title: services[3].title_ar}</span>
                    </div>
                    <div style= {{ backgroundImage: `url(${services[4].url})` }}
                      className='col25 home-services__before'>
                      <span className='img__title'>
                        {lang === 'En'? services[4].title: services[4].title_ar}</span>
                    </div>
                  </div>
                )
          }
        </div>
      </section>
    );
  }
}

Services.propTypes = {
  services: PropTypes.array,
  fetchServices: PropTypes.func,
  getTrans: PropTypes.func,
  error: PropTypes.string,
  isFetching: PropTypes.bool,
  lang: PropTypes.string
};

const mapStateToProps = state => {
  return {
    services: state.service.services,
    error: state.service.error,
    isFetching: state.service.isFetching,
    lang: state.navbar.lang
  };
};
const mapDispatchToProps = {
  ...serviceActions,
  ...navbarActions
};

export default connect(mapStateToProps,mapDispatchToProps)(Services);
