import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup, PageHeader } from 'react-bootstrap'
import Video from '../../types/Video'
import { Link } from 'react-router-dom'
import TagsInput from 'react-tagsinput'
import 'react-tagsinput/react-tagsinput.css'
import history from '../../history'

const styles = {
  label:{
    textAlign:'left',
    fontSize:'18px',
  },
  breadCrumb:{
    fontWeight: 'normal',
  },
}

export default class VideoForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      video: props.video
    }

    this.videoWithoutValidationOrMessages = this.videoWithoutValidationOrMessages.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleTagsChange = this.handleTagsChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static propTypes = {
    video: PropTypes.object.isRequired,
    pageTitle: PropTypes.string.isRequired,
    flattenedTaxonomy: PropTypes.array.isRequired,
    saveHandler: PropTypes.func.isRequired,
    uploadHandler: PropTypes.func.isRequired,
  }

  static defaultProps = {
    video: new Video(),
    pageTitle: 'Page Title Not Set',
    flattenedTaxonomy: [],
  }

  componentWillReceiveProps(nextProps){
    this.setState(Object.assign(this.state, {video:nextProps.video}))
  }

  videoWithoutValidationOrMessages(){
    let { validationErrors, validationState, errorMessage, successMessage, ...remainingProps } = this.state.video
    let video = Object.assign(new Video(), {...remainingProps})
    return video
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const updated = this.videoWithoutValidationOrMessages()

    updated[target.name] = value
    if(target.name === 'taxonomy_id'){
        updated[target.name] = Number(value)
    }

    this.setState(Object.assign(this.state, {video: updated}))
  }


  handleTagsChange(fieldName, tags, changed, changedIndexes){
    const updated = this.videoWithoutValidationOrMessages()
    updated[fieldName] = tags
    this.setState(Object.assign(this.state, {video: updated}))
  }

  handleFileChange(event) {
    const target = event.target
    const updated = this.videoWithoutValidationOrMessages()
    const file = target.files[0]
    updated.file = file
    updated.file_name = file.name
    updated.file_size = file.size
    updated.file_type = file.type
    this.setState(Object.assign(this.state, {video: updated}))
  }

  handleSubmit(e){
    e.preventDefault()

    const video = this.videoWithoutValidationOrMessages()

    if(!video.validate()){
      video.errorMessage = 'Oops! Looks like you\'re missing some information'
      this.setState(Object.assign(this.state, {video: video}))
      return
    }

    video.successMessage = 'Creating video record.'
    this.setState(Object.assign(this.state, {video: video}))
    this.props.saveHandler(video).then((savedVideo) => {
      if(savedVideo.errorMessage){
        console.log(`failed to save video metadata: ${savedVideo.errorMessage}`)
        this.setState(Object.assign(this.state, {video: savedVideo}))
        return
      }

      if(!video.file){
        history.replace(`/admin/video/${savedVideo.id}`)
        return
      }

      video.successMessage = 'Video record successfully created. Uploading video to server.'
      this.setState(Object.assign(this.state, {video: video}))
      this.props.uploadHandler(savedVideo, video.file).then((uploadedVideo) => {
        if(uploadedVideo.errorMessage){
          console.log(`failed to upload video: ${uploadedVideo.errorMessage}`)
          this.setState(Object.assign(this.state, {video: uploadedVideo}))
          return
        }

        history.replace(`/admin/video/${uploadedVideo.id}`)
      })
    })
  }

  render(){
    const { pageTitle, flattenedTaxonomy } = this.props
    const { video } = this.state

    return(
      <div>
        <PageHeader>
          <Link to="/admin/videos/">Videos</Link> <span style={styles.breadCrumb}>&gt;</span> {pageTitle}
        </PageHeader>
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
                name='taxonomy_id'
                value={video.taxonomy_id}
                onChange={this.handleInputChange}>
                <option value=''>- Taxonomy -</option>
                { flattenedTaxonomy.map((taxonomy, i) => {
                  return (
                    <option key={i} value={taxonomy.id}>{taxonomy.name}</option>
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
              <TagsInput
                onChange={(tags, changed, changedIndexes) => this.handleTagsChange('key_terms', tags, changed, changedIndexes)}
                value={video.key_terms}
                addKeys={[9, 13, 188]}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2} componentClass={ControlLabel} style={styles.label}>
              Common Core Standards
            </Col>
            <Col sm={6}>
              <TagsInput
                onChange={(tags, changed, changedIndexes) => this.handleTagsChange('common_core_standards', tags, changed, changedIndexes)}
                value={video.common_core_standards}
                addKeys={[9, 13, 188]}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2} componentClass={ControlLabel} style={styles.label}>
              State Standards
            </Col>
            <Col sm={6}>
              <TagsInput
                onChange={(tags, changed, changedIndexes) => this.handleTagsChange('state_standards', tags, changed, changedIndexes)}
                value={video.state_standards}
                addKeys={[9, 13, 188]}
              />
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
                onChange={this.handleFileChange}
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
