import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import * as projectActions from '../../../actions/project-actions';
import * as categoriesActions from '../../../actions/categories-actions';
import Modal from '../../shared/modal';

class AddProject extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitCategory = this.onSubmitCategory.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.state = {
      openModal: false
    };
  }
  componentDidMount() {
    this.props.fetchCategories();
  };

  closeModal() {
    this.setState({
      openModal: false
    });
  }
  openModal() {
    this.setState({
      openModal: true
    });
  }
  onSubmitCategory(e) {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      title_ar: e.target.title_Ar.value
    };
    this.props.addCategory(JSON.stringify(data),this.closeModal);
  }
  onSubmit(e) {
    e.preventDefault();
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
    this.props.addProject(JSON.stringify(data), this.props.history);
  }

  render() {
    const {
      categories,
      createError,
      createIsFetching } = this.props;

    return (
      <section className='addProject' >
        <h3>Add project</h3>
        <div className='row'>
          <form onSubmit={this.onSubmit} id='addProjectForm' className='formDash'>
            <div className='addProject__forms'>
              <div className='form__en'>
                <input
                  className='textInput'
                  type='text'
                  name='title'
                  placeholder='Project title...'
                  required />
                <input
                  className='textInput'
                  type='text'
                  name='client'
                  placeholder='client...'
                  required />
                <input
                  className='textInput'
                  type='text'
                  name='location'
                  placeholder='location...'
                  required />
                <textarea
                  className='textInput'
                  rows='4'
                  name='description'
                  placeholder='project description....'
                  required>
                </textarea>
              </div>
              <div className='form__ar'>
                <input
                  className='textInput'
                  type='text'
                  name='title_Ar'
                  placeholder='العنوان....'
                  required />
                <input
                  className='textInput'
                  type='text'
                  name='client_Ar'
                  placeholder='العميل....'
                  required />
                <input
                  className='textInput'
                  type='text'
                  name='location_Ar'
                  placeholder='العنوان....'
                  required />
                <textarea
                  className='textInput'
                  rows='4'
                  name='description_Ar'
                  placeholder='وصف المشروع....'
                  required>
                </textarea>
              </div>
            </div>
            <label htmlFor='category'>Category
              <select name='category'>
                {
                  categories.map(category => (
                    <option value={category.id} key={`category@${category.id}`}>
                      {category.title}/{category.title_ar}
                    </option>
                  ))
                }
              </select>
            </label>
            <button onClick={() => this.openModal()}
              type='button' className='btn addProject__addCat'>
              <span>+</span> Add new category
            </button>
            <button type='submit' className='btnDash btn'>Create</button>
          </form>
        </div>
        <Modal
          isShown={this.state.openModal}
          closeModal={this.closeModal}
          title='Create Category'>
          {
            createError && <div className='errorNote'>{createError}</div>
          }
          <form onSubmit={this.onSubmitCategory}>
            <input
              className='textInput'
              type='text'
              name='title'
              placeholder='title....'
              required />
            <input
              className='textInput'
              type='text'
              name='title_Ar'
              placeholder='العنوان....'
              required />
            {
              createIsFetching?
                <button type='button' className='btnDash btn'>Loading</button>
                :
                <button type='submit' className='btnDash btn'>Create</button>
            }
          </form>
        </Modal>
      </section>

    );
  }
}

AddProject.propTypes = {
  addProject: PropTypes.func.isRequired,
  addCategory: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  createIsFetching: PropTypes.bool,
  createError: PropTypes.string,
  fetchCategories: PropTypes.func,
  history: PropTypes.object,
  categories: PropTypes.array,
  project: PropTypes.object
};

const mapStateToProps = state => {
  return {
    isFetching: state.project.isFetching,
    project: state.project.project,
    categories: state.categories.categories,
    createIsFetching: state.categories.createIsFetching,
    createError: state.categories.createError
  };
};
const mapDispatchToProps = {
  ...projectActions,
  ...categoriesActions
};
export default connect(mapStateToProps, mapDispatchToProps)(AddProject);
