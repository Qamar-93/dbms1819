/*
This is just a Modal layout, so its a stateless Component
you need to pass these props:
  - isShown as a boolean
  - closeModal action
  - title
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import classNames from 'classnames';
import FontAwesome from 'react-fontawesome';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', e => {
      const { isShown, closeModal } = this.props;
      if (e.keyCode === 27 && isShown) closeModal();
    });
  };
  render() {
    const {
      title, isShown, closeModal, children
    } = this.props;
    const modalClass = classNames({
      modal: true,
      hidden: !isShown
    });

    return (
      <section className={modalClass} onClick={closeModal}>
        <main className='modal__content container' onClick={e => e.stopPropagation()}>
          <header className='modal__header'>
            <span onClick={closeModal} className='modal__close-btn btn'>
              <FontAwesome name='times' />
            </span>
            <h2 className='modal__title'>{title}</h2>
          </header>
          {children}
        </main>
      </section>
    );
  }
};

Modal.propTypes = {
  isShown: PropTypes.bool,
  title: PropTypes.string,
  closeModal: PropTypes.func
};

export default Modal;
