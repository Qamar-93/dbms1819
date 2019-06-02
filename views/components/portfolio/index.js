import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import Loading from '../loading/index';
import { Link } from 'react-router-dom';
import { fetchProjectsList, filterProjects } from '../../actions/projectsList-actions';
import * as navActions from '../../actions/navbar-actions';

class Portfolio extends Component {
  componentDidMount() {
    this.props.fetchProjectsList();
  }
  render() {
    let categories= [];
    const {
      projects,
      categories_ar,
      categories_en,
      lang,
      error,
      isFetching,
      activeCategory,
      getTrans
    } = this.props;
    categories = lang === 'Ar'? categories_ar : categories_en;

    return (
      <section className='portfolio'>
        <header className='portfolio__header container'>
          <h1 className='portfolio__title'>{getTrans('Our Portfolio')}</h1>
          <ul className='portfolio__filter'>
            <li
              onClick={() => this.props.filterProjects('all')}
              className={activeCategory === 'all'?
                'portfolio__active-category portfolio__filter-link'
                :'portfolio__filter-link'}>
              {getTrans('all')}
            </li>
            {
              categories.map(category => <li
                key={category}
                onClick={() => this.props.filterProjects(category)}
                className={activeCategory === category?
                  'portfolio__active-category portfolio__filter-link'
                  :'portfolio__filter-link'}>
                { category }
              </li>)
            }
          </ul>
        </header>
        <main className='portfolio__main'>
          {
            isFetching? <Loading />
              : error? <h2>{error}</h2>
                : (
                  <div className='portfolio__container container'>
                    {
                      projects.map(project => (
                        <Link
                          to={`/project/${project.id}`}
                          className='portfolio__project'
                          key={project.id}>
                          <div
                            style={{ backgroundImage: `url(${project.url})` }}
                            className='portfolio__project-pic'
                          />
                          <h3 className='portfolio__project-title'>
                            {lang === 'En'? project.title: project.title_ar}</h3>
                        </Link>
                      ))
                    }
                  </div>
                )
          }
        </main>
      </section>);
  }
}

Portfolio.propTypes = {
  projects: PropTypes.array,
  categories_ar: PropTypes.array,
  categories_en: PropTypes.array,
  fetchProjectsList: PropTypes.func,
  filterProjects: PropTypes.func,
  getTrans: PropTypes.func,
  activeCategory: PropTypes.string,
  error: PropTypes.string,
  isFetching: PropTypes.bool,
  lang: PropTypes.string
};

const mapStateToProps = state => {
  return {
    projects: state.projectsList.projects,
    categories_ar: state.projectsList.categories_ar,
    categories_en: state.projectsList.categories_en,
    activeCategory: state.projectsList.activeCategory,
    error: state.projectsList.error,
    isFetching: state.projectsList.isFetching,
    lang: state.navbar.lang
  };
};
const mapDispatchToProps = {
  fetchProjectsList,
  filterProjects,
  ...navActions
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
