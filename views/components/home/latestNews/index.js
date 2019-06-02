import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as navbarActions from '../../../actions/navbar-actions.js';
import * as latestNewsActions from '../../../actions/latestNews-actions.js';
import Loading from '../../loading/index';
import * as staticContent from '../../../../staticContent.json';
import { changeDate } from '../../helpers';

import './index.css';

class LatestNews extends Component {
  componentDidMount() {
    const { fetchLatestNews } = this.props;
    fetchLatestNews();
  }
  render() {
    const { news, error, isFetching,lang,getTrans } = this.props;

    return (
      <section className='latestNews'>
        <div className='latestNews__content container'>
          <div className='latestNews__inner inner-container'>
            <div className='latestNews__description'>
              <h3 className='home-services__title'>
                <span className='number'>03</span>
                {getTrans('Latest News')}</h3>
            </div>
            <div className='latestNews__slide row'>
              {
                isFetching? <Loading />
                  : error? <h2>{error}</h2>
                    :(
                      news.map(sNews => (
                        <div className='latestNews__col' key={`container@${sNews.id}`}>
                          <div className='latestNews__img'>
                            <img
                              src={sNews.url}
                              alt='Latest News'
                            />
                          </div>
                          <p className='latestNews__date'>{ changeDate(sNews.newsdate) }</p>
                          <p className='latestNews__news-title'>
                            {lang === 'En'? sNews.title: sNews.title_ar}</p>
                          <p className='latestNews__news-content'>
                            {lang === 'En'? sNews.description: sNews.description_ar}
                            <a href={`/news/${sNews.id}`} className='latestNews__news-link'>
                              {getTrans('read more')}</a></p>
                        </div>
                      ))
                    )
              }
            </div>
            <div className='home-page__quote'>
              <p className='hame-page__quotation'>
                {staticContent.homepage.tag[lang.toLowerCase()]}</p>
              <a className='hame-page__contact' href='/contactus'>{getTrans('Contact Us')}</a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
LatestNews.propTypes={
  fetchLatestNews: PropTypes.func,
  getTrans: PropTypes.func,
  isFetching: PropTypes.bool,
  news: PropTypes.array,
  error: PropTypes.string,
  lang: PropTypes.string
};

const mapStateToProps = state => {

  return {
    isFetching: state.latestNews.isFetching,
    news: state.latestNews.news,
    error: state.latestNews.error,
    lang: state.navbar.lang
  };
};

const mapDispatchToProps = {
  ...latestNewsActions,
  ...navbarActions
};

export default connect(mapStateToProps,mapDispatchToProps)(LatestNews);
