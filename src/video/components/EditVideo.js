import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Video from '../../types/Video'
import * as actions from '../actions'
import { fetchFlattenedTaxonomyList } from '../../taxonomy/actions'
import VideoForm from './VideoForm'

export class EditVideo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      video: new Video(),
    }
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    fetchVideoByID: PropTypes.func.isRequired,
    flattenedTaxonomy: PropTypes.array.isRequired,
    saveHandler: PropTypes.func.isRequired,
    uploadHandler: PropTypes.func.isRequired,
    fetchFlattenedTaxonomyList: PropTypes.func.isRequired,
  }

  static defaultProps = {
    flattenedTaxonomy: [],
  }

  componentDidMount() {
    this.props.fetchFlattenedTaxonomyList()

    const { id } = this.props.match.params
    this.props.fetchVideoByID(id).then((video) => {
      this.setState(Object.assign(this.state, {video: video}))
    })
  }

  render(){
    return(
      <VideoForm
        video={this.state.video}
        pageTitle={`Editing ${this.state.video.title}`}
        flattenedTaxonomy={this.props.flattenedTaxonomy}
        saveHandler={this.props.saveHandler}
        uploadHandler={this.props.uploadHandler}
      />
    )
  }
}

export default connect(
  (state) => ({ //mapStateToProps
    flattenedTaxonomy: state.taxonomy.flattened,
  }),
  (dispatch) => ({ //mapDispatchToProps
    fetchVideoByID: bindActionCreators(actions.fetchVideoByID, dispatch),
    fetchFlattenedTaxonomyList: bindActionCreators(fetchFlattenedTaxonomyList, dispatch),
    saveHandler: bindActionCreators(actions.updateVideoMetadata, dispatch),
    uploadHandler: bindActionCreators(actions.uploadVideo, dispatch),
  })
)(EditVideo)
