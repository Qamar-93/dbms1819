import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import Loading from '../../loading/index';
import * as singleNewsActions from '../../../actions/singleNews-actions';

class EditNews extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const { id } = this.props.news;
    const data = new FormData();
    const fileData = e.target.file.files[0];
    data.append('title', e.target.title.value);
    data.append('description', e.target.description.value);
    data.append('description_Ar', e.target.description_Ar.value);
    data.append('title_Ar', e.target.title_Ar.value);
    data.append('id', id);
    data.append('file', fileData);
    this.props.editNews(data, id);
  }
  componentDidMount() {
    const { fetchSingleNews, match } = this.props;
    fetchSingleNews(match.params.id);
  }
  render() {
    const { news, isFetching } = this.props;

    return (
      <section className='editNews' >
        <h3>Edit news</h3>
        {
          isFetching ? (
            <div className='loading'>
              <Loading/>
            </div>
          ) : (
            <form onSubmit={this.onSubmit} id='editNewsForm' className='formDash'>
              <label htmlFor='upload'>News image</label>
              <div className='newsImageInput'>
                <img src={news.url} alt={news.title}/>
                <input type='file' name='file' id='newsImage' encType='multipart/form-data'/>
              </div>
              <div className='addProject__forms'>
                <div className='form__en editNews__form'>
                  <input className='textInput'
                    type='text' name='title'
                    placeholder='News title...'
                    required defaultValue={news.title} />
                  <textarea className='textInput editNews__textarea'
                    rows='4' name='description'
                    placeholder='The article....'
                    defaultValue={news.description}
                    required>
                  </textarea>
                </div>
                <div className='form__ar editNews__form'>
                  <input className='textInput'
                    type='text' name='title_Ar'
                    placeholder='العنوان'
                    required defaultValue={news.title_ar} />
                  <textarea className='textInput editNews__textarea'
                    rows='4' name='description_Ar'
                    placeholder='الوصف'
                    defaultValue={news.description_ar}
                    required>
                  </textarea>
                </div>
              </div>
              <button type='submit' className='btnDash btn'>Create</button>
            </form>
          )
        }
      </section>

    );
  }
}

EditNews.propTypes = {
  news: PropTypes.object,
  match: PropTypes.object,
  id: PropTypes.string,
  fetchSingleNews: PropTypes.func,
  editNews: PropTypes.func,
  isFetching: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    news: state.singleNews.news,
    isFetching: state.singleNews.isFetching
  };
};

export default connect(mapStateToProps, singleNewsActions)(EditNews);
