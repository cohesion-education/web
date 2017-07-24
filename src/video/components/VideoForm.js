import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup, PageHeader } from 'react-bootstrap'
import Dashboard from '../../dashboard/components/Dashboard'

const styles = {
  label:{
    textAlign:'left',
    fontSize:'18px',
  },
}

export default class VideoForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static propTypes = {
    video: PropTypes.object.isRequired
  }

  static defaultProps = {
    video: {}
  }

  componentDidMount() {
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    console.log(`input change received ${name}=${value}; type=${target.type}`)
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.saveProfile(this.props.profile)
  }

  render(){
    //TODO - also need flattened taxonomy list to populate dropdown options

    const { video } = this.props

    return(
      <Dashboard>
        <PageHeader>Add new Video</PageHeader>
        { video.errorMessage &&
          <Alert bsStyle='warning'>{video.errorMessage}</Alert>
        }
        { video.successMessage &&
          <Alert bsStyle='success'>{video.successMessage}</Alert>
        }

        <div className='progress'>
          <div className='progress-bar progress-lg progress-bar-custom progress-bar-striped'
            role='progressbar'
            aria-valuenow='0'
            aria-valuemin='0'
            aria-valuemax='100'></div>
        </div>

        <Form horizontal>
          <FormGroup validationState={video.validationState['title']}>
            <Col componentClass={ControlLabel} sm={1} style={styles.label}>
              Title
            </Col>
            <Col sm={6}>
              <FormControl type='text' bsSize='large' name='title' placeholder='Title' value={video.title} onChange={this.handleInputChange}/>
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup validationState={video.validationState['category']}>
            <Col componentClass={ControlLabel} sm={1} style={styles.label}>
              Category
            </Col>
            <Col sm={6}>
              <FormControl componentClass='select' bsSize='large' name='category' value={video.category} onChange={this.handleInputChange}>
                <option value=''>- Category -</option>
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup validationState={video.validationState['file']}>
            <Col componentClass={ControlLabel} sm={1} style={styles.label}>
              Video File
            </Col>
            <Col sm={6}>
              <FormControl type='file' bsSize='large' name='file' data-iconname='fa fa-cloud-upload' className='filestyle' onChange={this.handleInputChange}/>
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={1} sm={6}>
              <Button type='submit' bsStyle='primary' onClick={this.handleSubmit}>
                Save
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Dashboard>
    )
  }
}
