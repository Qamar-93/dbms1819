import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import * as projectActions from '../../../actions/project-actions';
import * as categoriesActions from '../../../actions/categories-actions';
import Loading from '../../loading/index';
import ProjectPhotos from '../projectPhotos/index';

class EditProject extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    const { fetchProject, fetchCategories, match } = this.props;
    fetchProject(match.params.id);
    fetchCategories();
  }
  onSubmit(e) {
    e.preventDefault();
    const { id } = this.props.project.details;
    const data = {
      title: e.target.title.value,
      title_ar: e.target.title_Ar.value,
      description: e.target.description.value,
      description_ar: e.target.description_Ar.value,
      client: e.target.client.value,
      client_ar: e.target.client_Ar.value,
      location: e.target.location.value,
      location_ar: e.target.location_Ar.value,
      category: e.target.category.value
    };
    this.props.editProject(JSON.stringify(data), id);
  }

  render() {
    const { project,
      categories,
      isFetching,
      isEdited,
      error,
      match } = this.props;

    return (
      <section className='editProject' >
        <h3>Edit {project.details.title} project</h3>
        {
          isFetching ? (
            <div className='loading'>
              <Loading/>
            </div>
          ) : (
            <div className='editProject__details'>
              <form onSubmit={this.onSubmit} id='addProjectForm' className='formDash'>
                { error ? (
                  <div className='errorNote'>
                    Error While Updating</div>
                ) : (
                  <div></div>
                )}
                {isEdited ? (
                  <div className='successNote'>
                    Updated Successfuly
                  </div>
                ):(<div></div>)}
                <div className='addProject__forms'>
                  <div className='form__en'>
                    <input
                      className='textInput'
                      type='text'
                      name='title'
                      defaultValue={project.details.title}
                      placeholder='Project title...'
                      required />
                    <input
                      className='textInput'
                      type='text'
                      name='client'
                      placeholder='client...'
                      defaultValue={project.details.client}
                      required />
                    <input
                      className='textInput'
                      type='text'
                      name='location'
                      placeholder='location...'
                      defaultValue={project.details.location}
                      required />
                    <textarea
                      className='textInput__description'
                      rows='4'
                      name='description'
                      placeholder='project description....'
                      defaultValue={project.details.description}
                      required>
                    </textarea>
                  </div>
                  <div className='form__ar'>
                    <input
                      className='textInput'
                      type='text'
                      name='title_Ar'
                      placeholder='العنوان....'
                      defaultValue={project.details.title_ar}
                      required />
                    <input
                      className='textInput'
                      type='text'
                      name='client_Ar'
                      placeholder='العميل....'
                      defaultValue={project.details.client_ar}
                      required />
                    <input
                      className='textInput'
                      type='text'
                      name='location_Ar'
                      placeholder='العنوان....'
                      defaultValue={project.details.location_ar}
                      required />
                    <textarea
                      className='textInput__description'
                      rows='4'
                      name='description_Ar'
                      placeholder='وصف المشروع....'
                      defaultValue={project.details.description_ar}
                      required>
                    </textarea>
                  </div>
                </div>
                <label htmlFor='category'>Category
                  <select name='category' defaultValue={project.details.category_id}>
                    {
                      categories.map(category => (
                        <option
                          value={category.id}
                          key={`category@${category.id}`}>
                          {category.title}/{category.title_ar}</option>
                      ))
                    }
                  </select> </label>

                <button type='submit' className='btnDash btn'>Edit</button>
              </form>
              <div className='editProject__photos'>
                <ProjectPhotos match={match} pictures={project.pictures}/>
              </div>
            </div>
          )}
      </section>

    );
  }
}

EditProject.propTypes = {
  editProject: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  project: PropTypes.object,
  categories: PropTypes.array,
  fetchProject: PropTypes.func,
  fetchCategories: PropTypes.func,
  match: PropTypes.object,
  fetchProjectPictures: PropTypes.func,
  picturesFetching: PropTypes.bool,
  isEdited: PropTypes.bool,
  error: PropTypes.string
};

const mapStateToProps = state => {
  return {
    isFetching: state.project.isFetching,
    project: state.project.project,
    error: state.project.error,
    isEdited: state.project.isEdited,
    categories: state.categories.categories
  };
};

const mapDispatchToProps ={
  ...categoriesActions,
  ...projectActions
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);
