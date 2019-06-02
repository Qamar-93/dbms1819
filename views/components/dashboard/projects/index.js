import React, { Component } from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import Loading from '../../loading/index';
import * as projectsBoardActions from '../../../actions/projectsList-actions';
import { Link } from 'react-router-dom';

class Projects extends Component {
  constructor() {
    super();
    this.handleDeleteProject = this.handleDeleteProject.bind(this);
  }
  componentDidMount() {
    const { fetchProjectsList } = this.props;
    fetchProjectsList();
  }
  handleDeleteProject(projectId) {
    return () => {
      const { deleteProject } = this.props;
      deleteProject(projectId);
    };
  }

  render() {
    const { list, error, isFetching } = this.props;
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
        Header: 'Title',
        accessor: 'title'
      }, {
        Header: 'Client',
        accessor: 'client'
      }, {
        Header: 'Category',
        accessor: 'category'
      }];
      const data = list.map(sProjects => (
        {
          img: <img src={sProjects.url}/>,
          title: sProjects.title,
          category: sProjects.category_title,
          client: sProjects.client,
          options: (<div className='optionsBtns'>
            <div className='deleteBtn' onClick = {this.handleDeleteProject(sProjects.id)}>X</div>
            <Link to={`/dashboard/editProject/${sProjects.id}`}>
              <div className='editBtn'>Edit</div>
            </Link>
          </div>)
        }
      ));
      content = <ReactTable data={data} columns={columns} filterable={true} minRows={1}/>;
    }

    return (
      <section className='projectsBoard' >
        <h2>Projects</h2>
        <Link to='/dashboard/addProject'>
          <div className='btn addBtn'>+ Add projects</div>
        </Link>
        {content}
      </section>

    );
  }
}

Projects.propTypes = {
  list: PropTypes.array,
  fetchProjectsList: PropTypes.func,
  deleteProject: PropTypes.func,
  error: PropTypes.string,
  isFetching: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    list: state.projectsList.list,
    error: state.projectsList.error,
    isFetching: state.projectsList.isFetching
  };
};
export default connect(mapStateToProps, projectsBoardActions)(Projects);
