import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { Button, PageHeader, Table } from 'react-bootstrap'
import Dashboard from '../../dashboard/components/Dashboard'

class VideoList extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  static propTypes = {
    videoList: PropTypes.array.isRequired
  }

  static defaultProps = {
    videoList: []
  }

  componentDidMount() {
  }


  render(){
    //TODO need the following handlers:
    // * Add
    // * Edit
    // * Show
    //TODO - add pagination

    const { videoList } = this.props

    return(
      <Dashboard>
        <PageHeader>
          Video Management
          <Button>Add new Video</Button>
        </PageHeader>
        <Table responsive striped condensed>
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Category</th>
              <th>Date Created</th>
              <th>Created By</th>
            </tr>
          </thead>
          <tbody>
            { videoList.map((video, i) => {
              return (
                <tr>
                  <td><a href="/admin/video/edit/{video.id}">Edit</a></td>
                  <td><a href="/admin/video/{video.id}">{video.title}</a></td>
                  <td>{video.taxonomy.id}</td>
                  <td>{video.dateCreated}</td>
                  <td>{video.createdBy.fullName}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Dashboard>
    )
  }
}

export default connect(
  (state) => ({ //mapStateToProps
    videoList: state.videos.list
  }),
  (dispatch) => ({ //mapDispatchToProps
    // fetchProfile: bindActionCreators(fetchProfile, dispatch),
  })
)(VideoList)
