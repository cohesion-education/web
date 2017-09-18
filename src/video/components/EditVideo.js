import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Video from '../../types/Video'
import * as actions from '../actions'
import {fetchTaxonomyList} from '../../taxonomy/actions'
import VideoForm from './VideoForm'

class EditVideo extends React.Component {

  static propTypes = {
    video: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    fetchVideoByID: PropTypes.func.isRequired,
    flattenedTaxonomy: PropTypes.array.isRequired,
    saveHandler: PropTypes.func.isRequired,
    uploadHandler: PropTypes.func.isRequired,
    fetchTaxonomyList: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    video: new Video(),
    flattenedTaxonomy: [],
  }

  componentDidMount() {
    this.props.fetchTaxonomyList()
    const { id } = this.props.match.params
    this.props.fetchVideoByID(id).then((video) => {
      this.props.dispatch(actions.receiveVideoToEdit(video))
    })
  }

  render(){
    const { video, flattenedTaxonomy, dispatch, saveHandler, uploadHandler } = this.props

    return(
      <VideoForm
        video={video}
        pageTitle={`Editing ${video.title}`}
        flattenedTaxonomy={flattenedTaxonomy}
        dispatch={dispatch}
        formUpdateHandler={(video) => { dispatch(actions.update(video))}}
        saveHandler={saveHandler}
        uploadHandler={uploadHandler}
      />
    )
  }
}

export default connect(
  (state) => ({ //mapStateToProps
    video: state.video.formBackingObject,
    flattenedTaxonomy: state.taxonomy.flattened,
  }),
  (dispatch) => ({ //mapDispatchToProps
    dispatch: dispatch,
    fetchVideoByID: bindActionCreators(actions.fetchVideoByID, dispatch),
    fetchTaxonomyList: bindActionCreators(fetchTaxonomyList, dispatch),
    saveHandler: bindActionCreators(actions.updateVideoMetadata, dispatch),
    uploadHandler: bindActionCreators(actions.uploadVideo, dispatch),
  })
)(EditVideo)
