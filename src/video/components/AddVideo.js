import React from 'react'
import PropTypes from 'prop-types'
import VideoForm from './VideoForm'
import Video from '../../types/Video'
import * as actions from '../actions'
import { fetchFlattenedTaxonomyList } from '../../taxonomy/actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

export class AddVideo extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      video: new Video(),
    }
  }

  static propTypes = {
    flattenedTaxonomy: PropTypes.array.isRequired,
    fetchFlattenedTaxonomyList: PropTypes.func.isRequired,
    saveHandler: PropTypes.func.isRequired,
    uploadHandler: PropTypes.func.isRequired,
  }

  static defaultProps = {
    flattenedTaxonomy: [],
  }

  componentWillReceiveProps(nextProps){
    this.setState({video: nextProps.video})
  }

  componentDidMount() {
    this.props.fetchFlattenedTaxonomyList()
  }

  render(){
    const { video } = this.state
    return(
      <VideoForm
        video={video}
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
