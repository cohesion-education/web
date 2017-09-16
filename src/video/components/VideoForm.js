import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup, PageHeader } from 'react-bootstrap'
import Video from '../../types/Video'
import * as actions from '../actions'
import {fetchTaxonomyList} from '../../taxonomy/actions'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import history from '../../history'

const styles = {
  label:{
    textAlign:'left',
    fontSize:'18px',
  },
}

class VideoForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleCommonCoreStandardsChange = this.handleCommonCoreStandardsChange.bind(this)
    this.handleStateStandardsChange = this.handleStateStandardsChange.bind(this)
    this.handleKeyTermsChange = this.handleKeyTermsChange.bind(this)
    this.handleTagsChange = this.handleTagsChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static propTypes = {
    video: PropTypes.object.isRequired,
    flattenedTaxonomy: PropTypes.array.isRequired,
    fetchTaxonomyList: PropTypes.func.isRequired,
    videoUpdateHandler: PropTypes.func.isRequired,
    saveVideoMetadata: PropTypes.func.isRequired,
    uploadVideo: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    video: new Video(),
    flattenedTaxonomy: [],
  }

  componentDidMount() {
    this.props.fetchTaxonomyList()
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.props.videoUpdateHandler(this.props.video, name, value)
  }

  handleCommonCoreStandardsChange(tags, changed, changedIndexes){
    this.handleTagsChange('commonCoreStandards', tags, changed, changedIndexes)
  }

  handleStateStandardsChange(tags, changed, changedIndexes){
    this.handleTagsChange('stateStandards', tags, changed, changedIndexes)
  }

  handleKeyTermsChange(tags, changed, changedIndexes){
    this.handleTagsChange('keyTerms', tags, changed, changedIndexes)
  }

  handleTagsChange(fieldName, tags, changed, changedIndexes){
    let { validationErrors, validationState, errorMessage, successMessage, ...remainingProps } = this.props.video
    let updated = Object.assign(new Video(), {...remainingProps})
    updated[fieldName] = tags
    this.props.dispatch(actions.updateVideo(updated))
  }

  handleSubmit(e){
    e.preventDefault()

    const { successMessage, errorMessage, validationErrors, validationState, file, ...remainingProps } = this.props.video
    const video = Object.assign(new Video(), {...remainingProps})
    video.file = this.fileInput.files[0]

    if(!video.validate()){
      video.errorMessage = 'Oops! Looks like you\'re missing some information'
      console.log(video.errorMessage)
      this.props.dispatch(actions.updateVideo(video))
      return
    }

    this.props.saveVideoMetadata(video).then((savedVideo) => {
      if(savedVideo.errorMessage){
        console.log(`failed to save video metadata: ${savedVideo.errorMessage}`)
        this.props.dispatch(actions.updateVideo(savedVideo))
        return
      }

      console.log(`saved video metadata; ready to upload file`)
      this.props.uploadVideo(savedVideo, this.fileInput.files[0]).then((uploadedVideo) => {
        if(uploadedVideo.errorMessage){
          console.log(`failed to upload video: ${uploadedVideo.errorMessage}`)
          this.props.dispatch(actions.updateVideo(uploadedVideo))
          return
        }

        history.replace(`/video/${uploadedVideo.id}`)
      })
    })
  }

  render(){
    const { video, flattenedTaxonomy } = this.props

    return(
      <div>
        <PageHeader>Add new Video</PageHeader>
        { video.errorMessage &&
          <Alert bsStyle='warning'>{video.errorMessage}</Alert>
        }
        { video.successMessage &&
          <Alert bsStyle='success'>{video.successMessage}</Alert>
        }

        <Form horizontal>
          <FormGroup validationState={video.validationState['title']}>
            <Col sm={2} componentClass={ControlLabel} style={styles.label}>
              Title
            </Col>
            <Col sm={6}>
              <FormControl
                type='text'
                bsSize='large'
                name='title'
                placeholder='Title'
                value={video.title}
                onChange={this.handleInputChange}
                inputRef={ref => { this.titleInput = ref }}
              />
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup validationState={video.validationState['taxonomy']}>
            <Col sm={2} componentClass={ControlLabel} style={styles.label}>
              Taxonomy
            </Col>
            <Col sm={6}>
              <FormControl
                componentClass='select'
                bsSize='large'
                name='taxonomy'
                value={video.category}
                onChange={this.handleInputChange}
                inputRef={ref => { this.taxonomySelect = ref }}>
                <option value=''>- Taxonomy -</option>
                { flattenedTaxonomy.map((taxonomy, i) => {
                  return (
                    <option key={i} value={taxonomy}>{taxonomy.name}</option>
                  )
                })}
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2} componentClass={ControlLabel} style={styles.label}>
              Key Terms
            </Col>
            <Col sm={6}>
              <TagsInput onChange={this.handleKeyTermsChange} value={video.keyTerms} addKeys={[9, 13, 188]}/>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2} componentClass={ControlLabel} style={styles.label}>
              Common Core Standards
            </Col>
            <Col sm={6}>
              <TagsInput onChange={this.handleCommonCoreStandardsChange} value={video.commonCoreStandards} addKeys={[9, 13, 188]} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2} componentClass={ControlLabel} style={styles.label}>
              State Standards
            </Col>
            <Col sm={6}>
              <TagsInput onChange={this.handleStateStandardsChange} value={video.stateStandards} addKeys={[9, 13, 188]}/>
            </Col>
          </FormGroup>

          <FormGroup validationState={video.validationState['file']}>
            <Col sm={2} componentClass={ControlLabel} style={styles.label}>
              Video File
            </Col>
            <Col sm={6}>
              <FormControl
                type='file'
                name='file'
                data-iconname='fa fa-cloud-upload'
                className='filestyle'
                onChange={this.handleInputChange}
                inputRef={ref => { this.fileInput = ref }}
              />
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={6}>
              <Button type='submit' bsStyle='primary' onClick={this.handleSubmit}>
                Save
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
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
    videoUpdateHandler: bindActionCreators(actions.videoUpdateHandler, dispatch),
    saveVideoMetadata: bindActionCreators(actions.saveVideoMetadata, dispatch),
    uploadVideo: bindActionCreators(actions.uploadVideo, dispatch),
  })
)(VideoForm)
