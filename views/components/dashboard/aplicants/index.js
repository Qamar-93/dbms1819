import React, { Component } from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import Loading from '../../loading/index';
import * as aplicantsBoardActions from '../../../actions/aplicantsList-actions';

class Aplicants extends Component {
  constructor() {
    super();
    this.handleDeleteApplicant = this.handleDeleteApplicant.bind(this);
  }
  componentDidMount() {
    const { fetchAplicantsList } = this.props;
    fetchAplicantsList();
  }
  handleDeleteApplicant(applicanId) {
    return () => {
      const { deleteApplicant } = this.props;
      deleteApplicant(applicanId);
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
        Header: 'Name',
        accessor: 'name'
      }, {
        Header: 'Type',
        accessor: 'type'
      }];
      const data = list.map(sAplicants => (
        {
          name: <a href={sAplicants.url} target='_blank'>{sAplicants.username}</a>,
          type: sAplicants.type,
          options: (<div className='optionsBtns'>
            <div className='deleteBtn'
              onClick={this.handleDeleteApplicant(sAplicants.id)}>X</div>
          </div>)
        }
      ));

      content = <ReactTable data={data} columns={columns} filterable={true} minRows={1}/>;
    }

    return (
      <section className='aplicantsBoard' >
        <h2>Aplicants</h2>
        {content}
      </section>

    );
  }
}

Aplicants.propTypes = {
  list: PropTypes.array,
  fetchAplicantsList: PropTypes.func,
  deleteApplicant: PropTypes.func,
  error: PropTypes.string,
  isFetching: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    list: state.aplicantsList.list,
    error: state.aplicantsList.error,
    isFetching: state.aplicantsList.isFetching
  };
};
export default connect(mapStateToProps, aplicantsBoardActions)(Aplicants);
