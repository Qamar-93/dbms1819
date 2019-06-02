import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

class Rtl extends Component {
  render() {
    const { lang, match } = this.props;
    const mainClass = classNames({
      rtl: lang === 'Ar',
      paddingTop: match.path !== '/' || !match.isExact
    });

    return (
      <main className={mainClass}>
        {this.props.children}
      </main>

    );
  }
}

Rtl.propTypes = {
  lang: PropTypes.string,
  match: PropTypes.object
};

const mapStateToProps = state => {
  return {
    lang: state.navbar.lang
  };
};

export default withRouter(connect(mapStateToProps)(Rtl));
