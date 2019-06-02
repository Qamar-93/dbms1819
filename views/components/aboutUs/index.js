import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as navActions from '../../actions/navbar-actions';
import * as teamActions from '../../actions/team-actions';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import Loading from '../loading/index';
import * as staticContent from '../../../staticContent.json';
import './index.css';
import { HeaderWithImge } from '../shared/title/index.js';

class AboutUs extends Component {
  componentDidMount() {
    const { fetchTeam } = this.props;
    fetchTeam();
  }
  render() {
    const { lang, getTrans, isFetching, error, team } = this.props;

    return (
      <section className='aboutus' >
        <HeaderWithImge title={getTrans('About GIRIH')} src='/img/about.jpeg' alt='GIRIH about'/>
        <div className='aboutus__content'>
          <div className='container'>
            <div className='intro'>
              <p className='aboutus__intro'>{staticContent.aboutus.title[lang.toLowerCase()]}
              </p>
              <div className='aboutus__message'>
                <a className='contactus__button'>{getTrans('SEND MESSAGE')}</a>
              </div>
            </div>
            <div className='mainTeam'>
              <h3 className='team__title'>{getTrans('Meet Our Team Members')}</h3>
              <div className='team__profile'>
                <div className='withImge__side-img'>
                  <img
                    className='aboutus__img'
                    src='/img/team.jpeg'
                    alt='GIRIH team'
                  />
                </div>
                <div className='team__qoute'>
                  <p className='qoute__left'>“</p>
                  <p className='qoute__body'>{staticContent.aboutus.quote[lang.toLowerCase()]}</p>
                  <p className='qoute__right'>“</p>
                  <p className='qoute__job'>{getTrans('Architect')}</p>
                  <p className='qoute__name'>{getTrans('RASHID AL RUZZI')}</p>
                </div>
              </div>
              <h3 className='mainTeam__title'>{getTrans('Main Team Members')}</h3>
              { error && (
                <div className='error'>
                  { error }
                </div>
              )}
              {
                isFetching ? (
                  <div className='loading'>
                    <Loading/>
                  </div>
                ):(
                  <div className='members__container'>
                    {team.map(member => (
                      <article className='member__profile' key={member.full_name}>
                        <div className='profile__img'>
                          <img className='profile__img-link' src={member.url} alt='member Image' />
                        </div>
                        <div className='profile__content'>
                          <h3 className='member__name'>{lang === 'En'? member.full_name: member.full_name_ar}</h3>
                          <p className='member__job'>{lang === 'En'? member.job: member.job_ar}</p>
                          <div className='member__social'>
                            {
                              member.facebook && <Link
                                to={member.facebook}>
                                <FontAwesome className='social__icon' name='facebook-square'/>
                              </Link>
                            }
                            {
                              member.twitter && <Link
                                to={member.twitter}>
                                <FontAwesome className='social__icon' name='twitter-square'/>
                              </Link>
                            }
                            {
                              member.whatsapp && <Link
                                to={member.whatsapp}>
                                <FontAwesome className='social__icon' name='whatsapp'/>
                              </Link>
                            }
                            {
                              member.linkedin && <Link
                                to={member.linkedin}>
                                <FontAwesome className='social__icon' name='linkedin'/>
                              </Link>
                            }
                          </div>
                          <p className='member__description'>{lang === 'En'? member.description: member.description_ar}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </section>

    );
  }
}
AboutUs.propTypes = {
  lang: PropTypes.string,
  getTrans: PropTypes.func,
  fetchTeam: PropTypes.func,
  isFetching: PropTypes.bool,
  team: PropTypes.array,
  error: PropTypes.string
};

const mapStateToProps = state => {
  return {
    lang: state.navbar.lang,
    isFetching: state.team.isFetching,
    error: state.team.error,
    team: state.team.team
  };
};

const mapDispatchToProps = {
  ...navActions,
  ...teamActions
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutUs);
