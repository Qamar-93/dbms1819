import React, { Component } from 'react';
import './ContactUs.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as contactusActions from '../../actions/contactus-actions';
import * as navActions from '../../actions/navbar-actions';
import { HeaderWithouImge } from '../shared/title/index.js';

class ContactUs extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const data = {
      username: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.text.value
    };
    e.persist();
    this.props.contactus(JSON.stringify(data), () => {
      e.target.name.value= '';
      e.target.email.value= '';
      e.target.subject.value= '';
      e.target.text.value= '';
    });
  }
  render() {
    const { getTrans,isFetching, error , isSuccess } = this.props;

    return (
      <section className='contact'>
        <HeaderWithouImge title={getTrans('Contact US')}/>
        <div className='contactMessage'>
          <div className='container' >
            <div className='form'>
              { error ? (
                <div className='errorNote'>
                  {getTrans('Message not Sent')}</div>
              ) : (
                <div></div>
              )}
              {isSuccess ? (
                <div className='successNote'>
                  {getTrans('We have received your message')}
                </div>
              ):(<div></div>)}
              <p className='contact__quote'>
                {getTrans('GIRIH is here to provide you with more information')}</p>
              <form onSubmit={this.onSubmit} id='formdata'>
                <div className='contactus__details'>
                  <div className='contactus__group contactus__emailGroup'>
                    <label className='contactus__label' htmlFor='yourName'>
                      {getTrans('Your Name')}</label>
                    <input className='contactus__input' type='text' name='name' id='yourName'
                      required/>
                  </div>
                  <div className='contactus__group contactus__emailGroup'>
                    <label className='contactus__label' htmlFor='email'>
                      {getTrans('your email address')}</label>
                    <input className='contactus__input' type='email' name='email' id='email'
                      required/>
                  </div>
                </div>
                <div className='contactus__group'>
                  <label className='contactus__label' htmlFor='subject'>
                    {getTrans('Subject')}</label>
                  <input className='contactus__input' type='text' name='subject' id='subject'
                    required/>
                </div>
                <div className='contactus__group'>
                  <label className='contactus__label' htmlFor='text'>
                    {getTrans('Message')}</label>
                  <textarea className='contactus__text' name='text' id='text' rows='4'
                    required/>
                </div>
                { isFetching ? (
                  <div className='contactus__submit'>
                    <span className='contactus__button'>{getTrans('Loading..')}</span>
                  </div>
                ):
                  <div className='contactus__submit'>
                    <button className='contactus__button'>{getTrans('SEND MESSAGE')}</button>
                  </div>
                }
              </form>
            </div>
            <div className='location'>
              <div className='location__details'>
                <h3 className='location__title'>{getTrans('Location & Informations')}</h3>
                <p className='location__info'>{getTrans('Capital Mall')}</p>
                <p className='location__info'>{getTrans('Gaza')}</p>
                <p className='location__info'>{getTrans('Palestine')}</p>
                <p className='location__info'>{getTrans('Tel:')} 08288888</p>
                <p className='location__info'>{getTrans('Email:')} GIRIH@girih.com</p>
              </div>
              <div className='location__map'>
                <img
                  className='map__img'
                  src='/img/map.png'
                  alt='GIRIH map'
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    );
  }
}

ContactUs.propTypes = {
  contactus: PropTypes.func.isRequired,
  user: PropTypes.object,
  getTrans: PropTypes.func,
  lang: PropTypes.string,
  isFetching: PropTypes.bool,
  isSuccess: PropTypes.bool,
  error: PropTypes.string
};

const mapStateToProps = state => {
  return {
    isFetching: state.contactus.isFetching,
    error: state.contactus.error,
    isSuccess: state.contactus.isSuccess,
    user: state.contactus.user,
    lang: state.navbar.lang
  };
};
const mapDispatchToProps = {
  ...contactusActions,
  ...navActions
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
