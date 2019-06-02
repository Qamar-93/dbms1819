import React, { Component } from 'react';
import ReactTable from 'react-table';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './index.css';
import { withRouter, Link } from 'react-router-dom';
import Loading from '../../loading/index';
import * as newsBoardActions from '../../../actions/newsList-actions';
import * as singleNewsActions from '../../../actions/singleNews-actions';

class News extends Component {
  constructor() {
    super();
    this.handleDeleteNews = this.handleDeleteNews.bind(this);
  }
  componentDidMount() {
    const { fetchNewsList } = this.props;
    fetchNewsList();
  }

  handleDeleteNews(newsId) {
    return () => {
      const { deleteNews } = this.props;
      deleteNews(newsId);
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
      }];
      const data = list.map(sNews => (
        {
          img: <img src={sNews.url}/>,
          title: sNews.title,
          options: (<div className='optionsBtns'>
            <div className='deleteBtn' onClick = {this.handleDeleteNews(sNews.id)}>X</div>
            <Link to={`/dashboard/editNews/${sNews.id}`}>
              <div className='editBtn'>Edit</div>
            </Link>
          </div>)
        }
      ));
      content = <ReactTable data={data} columns={columns} filterable={true} minRows={1}/>;
    }

    return (
      <section className='newsBoard' >
        <h2>News</h2>
        <Link to='/dashboard/addNews'>
          <div className='btn addBtn'>+ Add news</div>
        </Link>
        {content}
      </section>

    );
  }
}

News.propTypes = {
  list: PropTypes.array,
  fetchNewsList: PropTypes.func,
  deleteNews: PropTypes.func,
  error: PropTypes.string,
  isFetching: PropTypes.bool
};

const mapStateToProps = state => {
  return {
    list: state.newsList.list,
    error: state.newsList.error,
    isFetching: state.newsList.isFetching
  };
};
const mapDispatchToProps = {
  ...newsBoardActions,
  ...singleNewsActions
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(News));
