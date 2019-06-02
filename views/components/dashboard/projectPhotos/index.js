import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import Loading from '../../loading/index';
import * as projectActions from '../../../actions/project-actions';

class ProjectPhotos extends Component {
  constructor() {
    super();
    this.setMainPic = this.setMainPic.bind(this);
    this.uploadPics = this.uploadPics.bind(this);
    this.removePhoto = this.removePhoto.bind(this);
  }
  componentDidMount() {
    const { pictures, fetchProject, details, match } = this.props;
    if (!pictures.length && !details.id) fetchProject(match.params.id);
  }
  setMainPic(pictureId) {
    return () => {
      const { setProjectPic, match } = this.props;
      setProjectPic(match.params.id, pictureId); // project_id, picture_id
    };
  }
  removePhoto(pictureId) {
    return () => {
      const { deleteProjectPic, match } = this.props;
      deleteProjectPic(match.params.id, pictureId);
    };
  }
  uploadPics(e) {
    if (e.target.value !== '') {
      const data = new FormData();
      [...e.target.files].map(file => {
        data.append('files', file);
      });
      this.props.postPhoto(this.props.match.params.id, data); //project_id, files
    }
  }
  render() {
    const { isFetching, pictures, error } = this.props;

    return (
      <section className='projectPhotos' >
        <h3>Project Photos</h3>
        <label className='projectPhotos__fileLabel' htmlFor='addPhoto'>+ | Add photo
          <input
            onChange={this.uploadPics}
            name='addPhoto'
            type='file'
            encType='multipart/form-data' multiple/>
        </label>
        <p className='projectPhotos__hint'>Double click on photo to set it as main photo!</p>
        <div className='projectPhotos__Photos'>
          {isFetching ? (
            <Loading />
          ): error ?(
            <h3>{error}</h3>
          ):(
            pictures.map(picture => (
              <div
                className={`projectPhotos__photoContainer
                  ${picture.main? 'projectPhotos__main': ''}`}
                key={picture.pic_id}
              >
                <img
                  className='projectPhotos__photo'
                  src={picture.url}
                  alt='project image'
                  onDoubleClick={this.setMainPic(picture.pic_id)}
                />
                <span onClick={this.removePhoto(picture.pic_id)}>remove</span>
              </div>))
          )}
        </div>
      </section>

    );
  }
}

ProjectPhotos.propTypes = {
  fetchProject: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  match: PropTypes.object,
  details: PropTypes.object,
  pictures: PropTypes.array,
  setProjectPic: PropTypes.func,
  postPhoto: PropTypes.func,
  deleteProjectPic: PropTypes.func,
  error: PropTypes.string
};

const mapStateToProps = state => {
  return {
    isFetching: state.project.isFetching,
    pictures: state.project.project.pictures,
    details: state.project.project.details,
    error: state.project.error
  };
};

export default connect(mapStateToProps, projectActions)(ProjectPhotos);
