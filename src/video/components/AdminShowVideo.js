import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import { PageHeader, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import VideoPlayer from './VideoPlayer'
import Video from '../../types/Video'


const styles = {
  editVideoLink:{
    textAlign:'right',
    float:'right',
    fontSize:'18px',
  },
  breadCrumb:{
    fontWeight: 'normal',
  },
}

class AdminShowVideo extends React.Component {

  static propTypes = {
    video: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    fetchVideoByID: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    video: new Video()
  }

  componentDidMount() {
    const { id } = this.props.match.params
    this.props.fetchVideoByID(id).then((video) => {
      this.props.dispatch(actions.receiveVideoToView(video))
    })
  }

  render(){
    const { video } = this.props
    // console.log(`video ${JSON.stringify(video)}`)
    const videoJsOptions = {
      autoplay: false,
      controls: true,
      sources: [{
        src: video.signed_url,
        type: 'video/mp4'
      }]
    }

    return(
      <div>
        <PageHeader>
          <Link to="/admin/videos/">Videos</Link> <span style={styles.breadCrumb}>&gt;</span> {video.title}
          <Link to={`/admin/video/edit/${video.id}`} style={styles.editVideoLink} className='btn btn-success'>Edit Video</Link>
        </PageHeader>
        { video.signed_url &&
          <VideoPlayer { ...videoJsOptions } />
        }

        <h2>Video Metadata</h2>
        <Table striped condensed>
          <tbody>
            <tr>
              <td>ID</td>
              <td>{video.id}</td>
            </tr>
            <tr>
              <td>Title</td>
              <td>{video.title}</td>
            </tr>
            <tr>
              <td>Taxonomy</td>
              <td>{video.taxonomy_id}</td>
            </tr>
            <tr>
              <td>Key Terms</td>
              <td>{video.key_terms.join(', ')}</td>
            </tr>
            <tr>
              <td>State Standards</td>
              <td>{video.state_standards.join(', ')}</td>
            </tr>
            <tr>
              <td>Common Core Standards</td>
              <td>{video.common_core_standards.join(', ')}</td>
            </tr>
            <tr>
              <td>File Name</td>
              <td>{video.file_name}</td>
            </tr>
            <tr>
              <td>Storage Bucket</td>
              <td>{video.bucket}</td>
            </tr>
            <tr>
              <td>Storage Object</td>
              <td>{video.object_name}</td>
            </tr>
            { video.created_by &&
              <tr>
                <td>Created By</td>
                <td>{video.created_by}</td>
              </tr>
            }
            <tr>
              <td>Date Created</td>
              <td>{video.created.toString()}</td>
            </tr>
            { video.updated_by &&
              <tr>
                <td>Updated By</td>
                <td>{video.updated_by}</td>
              </tr>
            }
            { video.updated &&
              <tr>
                <td>Date Updated</td>
                <td>{video.updated.toString()}</td>
              </tr>
            }
          </tbody>
        </Table>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    //mapStateToProps
    video: state.video.requestedVideo,
  }),
  (dispatch) => ({
    //mapDispatchToProps
    dispatch: dispatch,
    fetchVideoByID: bindActionCreators(actions.fetchVideoByID, dispatch),
  })
)(AdminShowVideo)
