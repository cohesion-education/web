import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import { Button, PageHeader, Table } from 'react-bootstrap'

class VideoList extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  static propTypes = {
    videos: PropTypes.array.isRequired
  }

  static defaultProps = {
    videos: []
  }

  componentDidMount() {
  }


  render(){
    //TODO need the following handlers:
    // * Add
    // * Edit
    // * Show
    //TODO - add pagination

    const { videos } = this.props

    return(
      <div>
        <PageHeader>
          Video Management
        </PageHeader>
        <Button>Add new Video</Button>
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
            { videos.map((video, i) => {
              return (
                <tr key={i}>
                  <td>Edit</td>
                  <td>{video.title}</td>
                  <td>{video.taxonomy.name}</td>
                  <td>{video.dateCreated}</td>
                  <td>{video.createdBy.name}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default connect(
  (state) => ({ //mapStateToProps
    videos: state.video.list
  }),
  (dispatch) => ({ //mapDispatchToProps
    // fetchProfile: bindActionCreators(fetchProfile, dispatch),
  })
)(VideoList)
