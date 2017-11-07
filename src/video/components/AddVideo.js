import React from 'react'
import PropTypes from 'prop-types'
import VideoForm from './VideoForm'
import Video from '../../types/Video'
import * as actions from '../actions'
import { fetchFlattenedTaxonomyList } from '../../taxonomy/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export class AddVideo extends React.Component {

  static propTypes = {
    flattenedTaxonomy: PropTypes.array.isRequired,
    fetchFlattenedTaxonomyList: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired,
    uploadHandler: PropTypes.func.isRequired,
  }

  static defaultProps = {
    flattenedTaxonomy: [],
  }

  componentDidMount() {
    this.props.fetchFlattenedTaxonomyList()
  }

  render(){
    return(
      <VideoForm
        video={new Video()}
        pageTitle="Add New Video"
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
    fetchFlattenedTaxonomyList: bindActionCreators(fetchFlattenedTaxonomyList, dispatch),
    saveHandler: bindActionCreators(actions.saveVideoMetadata, dispatch),
    uploadHandler: bindActionCreators(actions.uploadVideo, dispatch),
  })
)(AddVideo)
