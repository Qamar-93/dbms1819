import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import Loading from '../../loading/index';
import * as teamActions from '../../../actions/team-actions';

class AddTeamMember extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    const fileData = e.target.file.files[0];
    data.append('fullName',e.target.fullName.value);
    data.append('fullName_ar',e.target.fullName_ar.value);
    data.append('job',e.target.job.value);
    data.append('job_ar',e.target.job_ar.value);
    data.append('description',e.target.description.value);
    data.append('description_ar',e.target.description_ar.value);
    data.append('email',e.target.email.value);
    data.append('facebook',e.target.facebook.value);
    data.append('linkedIn',e.target.linkedIn.value);
    data.append('twitter',e.target.twitter.value);
    data.append('whatsapp',e.target.whatsapp.value);
    data.append('file', fileData);
    e.persist();
    this.props.addTeamMember(data, () => {
      e.target.fullName.value = '',
      e.target.fullName_ar.value = '',
      e.target.job.value = '',
      e.target.job_ar.value = '',
      e.target.description.value = '',
      e.target.description_ar.value = '',
      e.target.email.value = '',
      e.target.facebook.value = '',
      e.target.linkedIn.value = '',
      e.target.twitter.value = '',
      e.target.whatsapp.value= '';
    });
  }

  render() {
    const { error, isSuccess, isFetching } = this.props;

    return (
      <section className='addMember' >
        <h3>Add New Team Member</h3>
        { error ? (
          <div className='errorNote addMember__note'>
          Member is not added Successfuly</div>
        ) : (
          <div></div>)}
        {isSuccess ? (
          <div className='successNote addMember__note'>
              Added Successfuly
          </div>
        ):(<div></div>)}
        {isFetching ? (
          <div className='loading'><Loading/></div>
        ): (
          <div className='row addMember__form'>
            <form onSubmit={this.onSubmit} id='addMemberForm' className='formDash'>
              <div className='addMember__forms'>
                <div className = 'form__en'>
                  <input
                    className='textInput'
                    type='text'
                    name='fullName'
                    placeholder='Member Full name...'
                    required />
                  <input
                    className='textInput'
                    type='text'
                    name='job'
                    placeholder='Job title...'
                    required />
                  <textarea
                    className='textInput'
                    rows='4'
                    name='description'
                    placeholder='Short description....'
                    required>
                  </textarea>
                  <input
                    className='textInput'
                    type='text'
                    name='email'
                    placeholder='Email...'
                    required />
                  <input
                    className='textInput'
                    type='text'
                    name='facebook'
                    placeholder='Facebook link...'
                  />
                  <input
                    className='textInput'
                    type='text'
                    name='whatsapp'
                    placeholder='WhatsApp number...'
                  />
                </div>
                <div className = 'form__ar'>
                  <input
                    className='textInput'
                    type='text'
                    name='fullName_ar'
                    placeholder='..الاسم'
                    required />
                  <input
                    className='textInput'
                    type='text'
                    name='job_ar'
                    placeholder='..الوظيفة '
                    required />
                  <textarea
                    className='textInput'
                    rows='4'
                    name='description_ar'
                    placeholder='...الوصف '
                    required>
                  </textarea>
                  <input
                    className='textInput'
                    type='text'
                    name='twitter'
                    placeholder='Twitter Link...'
                  />
                  <input
                    className='textInput'
                    type='text'
                    name='linkedIn'
                    placeholder='LinkedIn link...'
                  />
                </div>
              </div>
              <label htmlFor='upload'>Member image
              <input type='file' name='file' id='serviceImage' encType='multipart/form-data' required />
              </label>
              <button type='submit' className='btnDash btn'>Create</button>
            </form>
          </div>
        )
        }
      </section>
    );
  }
}

AddTeamMember.propTypes = {
  addTeamMember: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  isSuccess: PropTypes.bool,
  error: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    isFetching: state.team.isFetching,
    isSuccess: state.team.isSuccess
  };
};

export default connect(mapStateToProps, teamActions)(AddTeamMember);
