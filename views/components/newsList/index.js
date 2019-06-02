import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './index.css';
import Loading from '../loading/index';
import * as newsListActions from '../../actions/newsList-actions';
import * as navActions from '../../actions/navbar-actions';
import { changeDate } from '../helpers';
import { HeaderWithouImge } from '../shared/title/index.js';

class NewsList extends Component {
  componentDidMount() {
    const { fetchNewsList } = this.props;
    fetchNewsList();
  }

  render() {
    const { list, error, isFetching, lang, getTrans } = this.props;
    let content;
    if (isFetching)
      content =<div className='container'> <div className='loading'><Loading/></div></div>;
    else if (error)
      content = <div className='container'><div className='error'>{error}</div></div>;
    else {
      content = list.map(sNews => (
        <div className='newsList__col' key={`container@${sNews.id}`}>
          <Link to={`/news/${sNews.id}`}>
            <div className='latestNews__img'>
              <img
                src={sNews.url}
                alt='Latest News'
              />
            </div>
          </Link>
          <p className='latestNews__date'>{ changeDate(sNews.newsdate) }</p>
          <Link to={`/news/${sNews.id}`}>
            <p className='latestNews__news-title'>
              {lang === 'En'? sNews.title: sNews.title_ar}</p>
          </Link>
          <p className='latestNews__news-content'>
            {lang === 'En'? sNews.description: sNews.description_ar}
            <a href={`/news/${sNews.id}`} className='latestNews__news-link'>
              {getTrans('read more')}
            </a></p>
        </div>
      ));
    }

    return (
      <section className='newsList' >
        <HeaderWithouImge title={getTrans('News & Achievements')}/>
        <main className='newsList__items'>
          <div className='row container'>
            {content}
          </div>
        </main>
      </section>

    );
  }
}

NewsList.propTypes = {
  list: PropTypes.array,
  fetchNewsList: PropTypes.func,
  error: PropTypes.string,
  isFetching: PropTypes.bool,
  lang: PropTypes.string,
  getTrans: PropTypes.func
};

const mapStateToProps = state => {
  return {
    list: state.newsList.list,
    error: state.newsList.error,
    isFetching: state.newsList.isFetching,
    lang: state.navbar.lang
  };
};

const mapDispatchToProps = {
  ...newsListActions,
  ...navActions
};

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
