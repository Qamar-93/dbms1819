import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import Loading from '../../loading/index';
import * as serviceActions from '../../../actions/service-actions';

class EditService extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const { id } = this.props.service;
    const data = new FormData();
    const fileData = e.target.file.files[0];
    data.append('title', e.target.title.value);
    data.append('description', e.target.description.value);
    data.append('description_Ar', e.target.description_Ar.value);
    data.append('title_Ar', e.target.title_Ar.value);
    data.append('id', id);
    data.append('file', fileData);
    this.props.editService(data, id);
  }
  componentDidMount() {
    const { fetchSingleService, match } = this.props;
    fetchSingleService(match.params.id);
  }
  render() {
    const { service, isFetching, error, isSuccess } = this.props;

    return (
      <section className='editNews' >
        <h3>Edit Service</h3>
        { error ? (
          <div className='errorNote addMember__note'>
            Service is not updated Successfuly</div>
        ) : (
          <div></div>)}
        { isSuccess ? (
          <div className='successNote addMember__note'>
            Successfuly updated
          </div>
        ):(<div></div>)}
        {
          isFetching ? (
            <div className='loading'>
              <Loading/>
            </div>
          ) : (
            <form onSubmit={this.onSubmit} id='editNewsForm' className='formDash'>
              <label htmlFor='upload'>Service image</label>
              <div className='newsImageInput'>
                <img src={service.url} alt={service.title}/>
                <input type='file' name='file' id='newsImage' encType='multipart/form-data'/>
              </div>
              <div className='addProject__forms'>
                <div className='form__en editNews__form'>
                  <input className='textInput'
                    type='text' name='title'
                    placeholder='Service title...'
                    required defaultValue={service.title} />
                  <textarea className='textInput editNews__textarea'
                    rows='4' name='description'
                    placeholder='The description....'
                    defaultValue={service.description}
                    required>
                  </textarea>
                </div>
                <div className='form__ar editNews__form'>
                  <input className='textInput'
                    type='text' name='title_Ar'
                    placeholder='العنوان'
                    required defaultValue={service.title_ar} />
                  <textarea className='textInput editNews__textarea'
                    rows='4' name='description_Ar'
                    placeholder='الوصف'
                    defaultValue={service.description_ar}
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

EditService.propTypes = {
  service: PropTypes.object,
  match: PropTypes.object,
  id: PropTypes.string,
  fetchSingleService: PropTypes.func,
  editService: PropTypes.func,
  isFetching: PropTypes.bool,
  isSuccess: PropTypes.bool,
  error: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    service: state.service.service,
    isFetching: state.service.isFetching,
    isSuccess: state.service.isSuccess,
    error: state.service.error
  };
};

export default connect(mapStateToProps, serviceActions)(EditService);
