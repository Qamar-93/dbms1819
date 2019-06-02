import React, { Component } from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import { Link } from 'react-router-dom';
import Loading from '../../loading/index';
import * as teamActions from '../../../actions/team-actions';

class DashboardTeam extends Component {
  constructor() {
    super();
  }
  componentDidMount() {
    const { fetchTeam } = this.props;
    fetchTeam();
  };
  handleDeleteMember(member_id) {
    return () => {
      const { deleteMember } = this.props;
      deleteMember(member_id);
    };
  }

  render() {
    const { team, error, isFetching } = this.props;
    let content;
    if (isFetching)
      content = <div className='loading'><Loading/></div>;
    else if (error)
      content = <div className='error'>{error}</div>;
    else {
      const columns = [{
        Header: '...',
        accessor: 'options',
        filterable: false,
        sortable: false,
        width: 80
      }, {
        Header: 'Image',
        accessor: 'img',
        filterable: false,
        sortable: false,
        width: 200
      }, {
        Header: 'Name',
        accessor: 'Name'
      },
      {
        Header: 'Job Title',
        accessor: 'Job_title'
      }];
      const data = team.map(member => (
        {
          img: <img src={member.url}/>,
          Name: member.full_name,
          Job_title: member.job,
          options: (<div className='optionsBtns'>
            <div className='deleteBtn' onClick = {this.handleDeleteMember(member.id)}>X</div>
            <Link to={`/dashboard/team/${member.id}/edit`}>
              <div className='editBtn'>Edit</div>
            </Link>
          </div>)
        }
      ));
      content = <ReactTable data={data} columns={columns} filterable={true} minRows={1}/>;
    }

    return (
      <section className='servicesBoard' >
        <h2>Team members</h2>
        <Link to='/dashboard/addMember'>
          <div className='btn addBtn'>+ Add New Team member</div>
        </Link>
        {content}
      </section>

    );
  }
}

DashboardTeam.propTypes = {
  team: PropTypes.array,
  fetchTeam: PropTypes.func,
  deleteMember: PropTypes.func,
  error: PropTypes.string,
  isFetching: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    team: state.team.team,
    error: state.team.error,
    isFetching: state.team.isFetching
  };
};
export default connect(mapStateToProps, teamActions)(DashboardTeam);
