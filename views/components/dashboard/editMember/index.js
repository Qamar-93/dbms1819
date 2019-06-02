import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import Loading from '../../loading/index';
import * as teamActions from '../../../actions/team-actions';

class EditMember extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const { id } = this.props.member;
    const data = new FormData();
    const fileData = e.target.file.files[0];
    data.append('full_name',e.target.fullName.value);
    data.append('full_name_ar', e.target.fullName_ar.value);
    data.append('job', e.target.job.value);
    data.append('job_ar', e.target.job_ar.value);
    data.append('description', e.target.description.value);
    data.append('description_ar', e.target.description_ar.value);
    data.append('email', e.target.email.value);
    data.append('facebook', e.target.facebook.value);
    data.append('whatsapp', e.target.whatsapp.value);
    data.append('twitter', e.target.twitter.value);
    data.append('linkedin', e.target.linkedIn.value);
    data.append('id', id);
    data.append('file', fileData);
    this.props.editMember(data,id);
  }
  componentDidMount() {
    const { fetchMember, match } = this.props;
    fetchMember(match.params.member_id);
  }
  render() {
    const { member, isFetching, error, isSuccess } = this.props;

    return (
      <section className='editMember' >
        <h3>Edit Member Details</h3>
        { error ? (
          <div className='errorNote addMember__note'>
            Member is not updated Successfuly</div>
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
            <form onSubmit={this.onSubmit} id='editMemberForm' className='formDash'>
              <label htmlFor='upload'>Member image</label>
              <div className='memberImageInput'>
                <img src={member.url} alt={member.full_name}/>
                <input type='file' name='file' id='newsImage' encType='multipart/form-data'/>
              </div>
              <div className='addMember__forms'>
                <div className = 'form__en'>
                  <input
                    className='textInput'
                    type='text'
                    name='fullName'
                    placeholder='Member Full Name...'
                    defaultValue={member.full_name}
                    required />
                  <input
                    className='textInput'
                    type='text'
                    name='job'
                    placeholder='Job title...'
                    defaultValue={member.job}
                    required />
                  <textarea
                    className='textInput'
                    rows='4'
                    name='description'
                    placeholder='Short description....'
                    defaultValue={member.description}
                    required>
                  </textarea>
                  <input
                    className='textInput'
                    type='text'
                    name='email'
                    placeholder='Email...'
                    defaultValue={member.email}
                    required />
                  <input
                    className='textInput'
                    type='text'
                    name='facebook'
                    placeholder='Facebook link...'
                    defaultValue={member.facebook}
                  />
                  <input
                    className='textInput'
                    type='text'
                    name='whatsapp'
                    placeholder='WhatsApp number...'
                    defaultValue={member.whatsapp}
                  />
                </div>
                <div className = 'form__ar'>
                  <input
                    className='textInput'
                    type='text'
                    name='fullName_ar'
                    placeholder='..الاسم'
                    defaultValue={member.full_name_ar}
                    required />
                  <input
                    className='textInput'
                    type='text'
                    name='job_ar'
                    placeholder='..الوظيفة '
                    defaultValue={member.job_ar}
                    required />
                  <textarea
                    className='textInput'
                    rows='4'
                    name='description_ar'
                    placeholder='...الوصف '
                    defaultValue={member.description_ar}
                    required>
                  </textarea>
                  <input
                    className='textInput'
                    type='text'
                    name='twitter'
                    placeholder='Twitter Link...'
                    defaultValue={member.twitter}
                  />
                  <input
                    className='textInput'
                    type='text'
                    name='linkedIn'
                    placeholder='LinkedIn link...'
                    defaultValue={member.linkedin}
                  />
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
EditMember.propTypes = {
  member: PropTypes.object,
  match: PropTypes.object,
  id: PropTypes.string,
  fetchMember: PropTypes.func,
  editMember: PropTypes.func,
  isFetching: PropTypes.bool,
  isSuccess: PropTypes.bool,
  error: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    member: state.team.member,
    isFetching: state.team.isFetching,
    error: state.team.error,
    isSuccess: state.team.isSuccess
  };
};

export default connect(mapStateToProps, teamActions)(EditMember);
