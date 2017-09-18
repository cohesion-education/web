import React from 'react'
import PropTypes from 'prop-types'
import VideoForm from './VideoForm'
import Video from '../../types/Video'
import * as actions from '../actions'
import {fetchTaxonomyList} from '../../taxonomy/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class AddVideo extends React.Component {

  static propTypes = {
    video: PropTypes.object.isRequired,
    flattenedTaxonomy: PropTypes.array.isRequired,
    fetchTaxonomyList: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired,
    uploadHandler: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    video: new Video(),
    flattenedTaxonomy: [],
  }

  componentWillMount(){
    this.props.dispatch(actions.newVideo())
  }

  componentDidMount() {
    this.props.fetchTaxonomyList()
  }

  render(){
    const { video, flattenedTaxonomy, dispatch, saveHandler, uploadHandler } = this.props

    return(
      <VideoForm
        video={video}
        pageTitle="Add New Video"
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
    fetchTaxonomyList: bindActionCreators(fetchTaxonomyList, dispatch),
    saveHandler: bindActionCreators(actions.saveVideoMetadata, dispatch),
    uploadHandler: bindActionCreators(actions.uploadVideo, dispatch),
  })
)(AddVideo)
