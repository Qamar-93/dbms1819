import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Loading from '../loading/index';
import './index.css';
import * as singleNewsActions from '../../actions/singleNews-actions';
import * as navActions from '../../actions/navbar-actions';
import { changeDate } from '../helpers';

class SingleNews extends Component {
  componentDidMount() {
    const { fetchSingleNews, match } = this.props;
    fetchSingleNews(match.params.id);
  }
  render() {
    const { news, error, isFetching ,lang } = this.props;

    return (
      <section className='singleNews' >
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
          ) : (
            <div>
              <header className='inner-container singleNews__header'>
                <h1 className='singleNews__title'>{
                  lang==='Ar' ? news.title_ar : news.title
                }</h1>
                <p className='latestNews__date'>{ changeDate(news.newsdate) }</p>
              </header>
              <main className='singleNews__profile'>
                <div className='inner-container'>
                  <div className='singleNews__img'>
                    <img className='singleNews__img' src={news.url} alt='news image' />
                  </div>
                  <div className='content'>
                    <p className='singleNews__body'> {
                      lang==='Ar' ? news.description_ar : news.description
                    }</p>
                  </div>
                </div>
              </main>
            </div>
          )
        }
      </section>
    );
  }
}

SingleNews.propTypes = {
  news: PropTypes.object,
  match: PropTypes.object,
  fetchSingleNews: PropTypes.func,
  error: PropTypes.string,
  isFetching: PropTypes.bool,
  lang: PropTypes.string,
  getTrans: PropTypes.func
};

const mapStateToProps = state => {
  return {
    news: state.singleNews.news,
    error: state.singleNews.error,
    isFetching: state.singleNews.isFetching,
    lang: state.navbar.lang
  };
};

const mapDispatchToProps = {
  ...singleNewsActions,
  ...navActions
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleNews);
