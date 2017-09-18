import { connect } from 'react-redux'
import VideoList from '../components/VideoList'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'

const mapStateToProps = state => {
  return {
    videos: state.video.list
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchVideoList: bindActionCreators(actions.fetchVideoList, dispatch),
    deleteVideo: bindActionCreators(actions.deleteVideo, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoList)
