import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import * as joinusActions from '../../actions/joinus-actions';
import * as navbarActions from '../../actions/navbar-actions';
import FontAwesome from 'react-fontawesome';
import classNames from 'classnames';
import { HeaderWithouImge } from '../shared/title/index.js';

class JoinUs extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.state = { draging: false };
  }
  onDrop(e) {
    e.preventDefault();
    this.setState({
      draging: false
    });
    this.props.addFile(e.dataTransfer.files);
  };
  onDrag(e) {
    e.preventDefault();
    this.setState({
      draging: true
    });
  };
  onDragLeave(e) {
    e.preventDefault();
    this.setState({
      draging: false
    });
  };
  onSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append('username', e.target.username.value);
    data.append('type', e.target.type.value);
    data.append('file', this.props.files);
    e.persist();
    this.props.joinus(data, () => {
      e.target.username.value='';
    });
  }
  render() {
    const {
      getTrans,
      error,
      isFetching,
      files,
      addFile,
      deleteFile,
      isSuccess } = this.props;
    const {
      onDrop,
      onDrag,
      onDragLeave } = this;
    const uploadClass = classNames({
      'joinUs__label-input': true,
      'joinUs__label-upload': true,
      'joinUs__label-upload-draging': this.state.draging,
      hidden: files[0]
    });

    return (
      <section className='joinUs' >
        <HeaderWithouImge title={getTrans('Join Us')}/>
        <main className='joinUs__container'>
          <div className='container'>
            <h3 className='joinUs__sub-title'>{getTrans('Employment & Training')}</h3>
            { error && (
              <div className='errorNote'>
                {getTrans('Message not Sent')}
              </div>
            )}
            {isSuccess && (
              <div className='successNote'>
                {getTrans('Submitted Successfuly')}
              </div>
            )}
            <form
              className='joinUs__form'
              onSubmit={this.onSubmit}
              id='formdata'>
              <label
                className='joinUs__label-input'
                htmlFor='username'>
                {getTrans('YOUR NAME')}
                <input
                  id='username'
                  type='text'
                  name='username'
                  placeholder={getTrans('Enter your name...')}
                  required
                />
              </label>
              <label className='joinUs__label-input'>
                {getTrans('EMPLOYMENT OR TRAINING')}
                <select name='type'>
                  <option value='Employment'>{getTrans('Employment')}</option>
                  <option value='Training'>{getTrans('Training')}</option>
                </select>
              </label>
              {
                files[0]?
                  <div className='joinUs__myFile'>
                    <p>Your file:</p>
                    <span>{files[0].name}  </span>
                    <span className='joinUs__myFile-delete'
                      onClick={() => deleteFile()}>x</span>
                  </div>
                  :
                  <label
                    onDrop={e => onDrop(e)}
                    onDragOver={e => onDrag(e)}
                    onDragLeave={ e => onDragLeave(e)}
                    className={uploadClass}
                    htmlFor='upload'>
                    {getTrans('Upload your CV')}
                    <input
                      onChange={e => addFile(e.target.files)}
                      type='file' name='file' id='upload' encType='multipart/form-data'
                      value={ files[0]? files[0].name : '' }
                      required />
                    <div className='joinUs__upload-container'>
                      <FontAwesome name='folder-open' className='joinUs__folder-icon' />
                      <h4 className='joinUs__upload-desc'>{getTrans('Drag and Drop, or')}
                        <span> {getTrans('browse')} </span>
                        {getTrans('your file')}
                      </h4>
                    </div>
                  </label>
              }
              { isFetching ? (
                <div>
                  <span className='btnBlack'>{getTrans('Loading..')}</span>
                </div>
              ):
                <div className='joinUs__submit'>
                  <button type='submit'>{getTrans('submit')}</button>
                </div>
              }
            </form>
          </div>
        </main>
      </section>

    );
  }
}

JoinUs.propTypes = {
  joinus: PropTypes.func.isRequired,
  getTrans: PropTypes.func.isRequired,
  addFile: PropTypes.func.isRequired,
  deleteFile: PropTypes.func.isRequired,
  user: PropTypes.object,
  files: PropTypes.object,
  error: PropTypes.string,
  isFetching: PropTypes.bool,
  isSuccess: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    user: state.joinus.user,
    error: state.joinus.error,
    files: state.joinus.files,
    isFetching: state.joinus.isFetching,
    isSuccess: state.joinus.isSuccess
  };
};
const mapDispatchToProps = {
  ...navbarActions,
  ...joinusActions
};

export default connect(mapStateToProps, mapDispatchToProps)(JoinUs);
