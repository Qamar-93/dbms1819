import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import Loading from '../loading/index';
import * as serviceActions from '../../actions/service-actions';
import * as navActions from '../../actions/navbar-actions';
import { HeaderWithouImge } from '../shared/title/index.js';

class Services extends Component {
  componentDidMount() {
    const { fetchServices } = this.props;
    fetchServices();
  }
  render() {
    const { services, lang,error, isFetching, getTrans } = this.props;

    return (
      <section className='services'>
        <HeaderWithouImge title={getTrans('Services')}/>
        <main className='services__main'>
          {
            isFetching? <Loading />
              : error? <h2>{error}</h2>
                : (
                  <div>
                    {services.map(service => (
                      <div className='services__service' key={service.id}>
                        <div className='services__service-container container'>
                          <div className='services__service-content'>
                            <h2 className='services__service-title'>
                              {lang === 'En'? service.title: service.title_ar}
                            </h2>
                            <p className='services__service-description'>
                              {lang === 'En'? service.description: service.description_ar}
                            </p>
                          </div>
                          <div className='services__service-img'>
                            <img
                              src={service.url}
                              alt={lang === 'En'? service.title: service.title_ar}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
          }
        </main>
      </section>);
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
  ...navActions
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);
