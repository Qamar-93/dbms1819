import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import * as addNewsActions from '../../../actions/addNews-actions';

class AddNews extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    const fileData = e.target.file.files[0];
    data.append('title',e.target.title.value);
    data.append('title_ar',e.target.title_ar.value);
    data.append('description',e.target.description.value);
    data.append('description_ar',e.target.description_ar.value);
    data.append('file', fileData);
    this.props.addNews(data);
  }

  render() {

    return (
      <section className='addNews' >
        <h3>Add news</h3>
        <div className='row'>
          <form onSubmit={this.onSubmit} id='addNewsForm' className='formDash'>
            <div className='addNews__forms'>
              <div className = 'form__en'>
                <input
                  className='textInput'
                  type='text'
                  name='title'
                  placeholder='News title...'
                  required />
                <textarea
                  className='textInput'
                  rows='4'
                  name='description'
                  placeholder='The article....'
                  required>
                </textarea>
              </div>
              <div className = 'form__ar'>
                <input
                  className='textInput'
                  type='text'
                  name='title_ar'
                  placeholder='....عنوان الخبر'
                  required />
                <textarea
                  className='textInput'
                  rows='4'
                  name='description_ar'
                  placeholder='...الوصف '
                  required>
                </textarea>
              </div>
            </div>
            <label htmlFor='upload'>News image
            <input type='file' name='file' id='newsImage' encType='multipart/form-data' required />
            </label>
            <button type='submit' className='btnDash btn'>Create</button>
          </form>
        </div>
      </section>

    );
  }
}

AddNews.propTypes = {
  addNews: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  news: PropTypes.object
};

const mapStateToProps = state => {
  return {
    isFetching: state.addNews.isFetching,
    news: state.addNews.news
  };
};

export default connect(mapStateToProps, addNewsActions)(AddNews);
