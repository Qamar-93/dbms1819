import React, { Component } from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import { Link } from 'react-router-dom';
import Loading from '../../loading/index';
import * as dashboardServicesActions from '../../../actions/service-actions';

class DashboardServices extends Component {
  constructor() {
    super();
    this.handleDeleteService = this.handleDeleteService.bind(this);
  }
  componentDidMount() {
    const { fetchServices } = this.props;
    fetchServices();
  };
  handleDeleteService(service_id) {
    return () => {
      const { deleteService } = this.props;
      deleteService(service_id);
    };
  }

  render() {
    const { services, error, isFetching } = this.props;
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
      }];
      const data = services.map(service => (
        {
          img: <img src={service.url}/>,
          title: service.title,
          options: (<div className='optionsBtns'>
            <div className='deleteBtn' onClick = {this.handleDeleteService(service.id)}>X</div>
            <Link to={`/dashboard/services/${service.id}/edit`}>
              <div className='editBtn'>Edit</div>
            </Link>
          </div>)
        }
      ));
      content = <ReactTable data={data} columns={columns} filterable={true} minRows={1}/>;
    }

    return (
      <section className='servicesBoard' >
        <h2>Services</h2>
        <Link to='/dashboard/addService'>
          <div className='btn addBtn'>+ Add New Service</div>
        </Link>
        {content}
      </section>

    );
  }
}

DashboardServices.propTypes = {
  services: PropTypes.array,
  fetchServices: PropTypes.func,
  deleteService: PropTypes.func,
  error: PropTypes.string,
  isFetching: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    services: state.service.services,
    error: state.service.error,
    isFetching: state.service.isFetching
  };
};
export default connect(mapStateToProps, dashboardServicesActions)(DashboardServices);
