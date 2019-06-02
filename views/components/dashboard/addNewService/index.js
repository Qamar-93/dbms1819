import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import Loading from '../../loading/index';
import * as addServiceActions from '../../../actions/addService-actions';

class AddService extends Component {
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
    e.persist();
    this.props.addService(data, () => {
      e.target.title.value='';
      e.target.title_ar.value='';
      e.target.description.value='';
      e.target.description_ar.value='';
    });
  }

  render() {
    const { isFetching, error, isSuccess } = this.props;

    return (
      <section className='addService' >
        <h3>Add New Service</h3>
        <div className='row addService__form'>
          { error ? (
            <div className='errorNote addService__note'>
              Service is not added Successfuly</div>
          ) : (
            <div></div>)}
          {isSuccess ? (
            <div className='successNote addService__note'>
              Submitted Successfuly
            </div>
          ):(<div></div>)}
          { isFetching ? (
            <div className='loading'>
              <Loading/>
            </div>
          ) : (
            <form onSubmit={this.onSubmit} id='addServiceForm' className='formDash'>
              <div className='addNews__forms'>
                <div className = 'form__en'>
                  <input
                    className='textInput'
                    type='text'
                    name='title'
                    placeholder='Serv title...'
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
                    placeholder='.... عنوان الخدمة'
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
              <label htmlFor='upload'>Service image
              <input type='file' name='file' id='serviceImage' encType='multipart/form-data' required />
              </label>
              <button type='submit' className='btnDash btn'>Create</button>
            </form>
          )
          }
        </div>
      </section>
    );
  }
}

AddService.propTypes = {
  addService: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  isSuccess: PropTypes.bool,
  error: PropTypes.bool,
  service: PropTypes.object
};

const mapStateToProps = state => {
  return {
    isFetching: state.addService.isFetching,
    isSuccess: state.addService.isSuccess,
    service: state.service.service
  };
};

export default connect(mapStateToProps, addServiceActions)(AddService);
