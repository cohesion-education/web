import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Alert, Button, Col, ControlLabel, Form, FormControl, FormGroup, PageHeader } from 'react-bootstrap'
import Video from '../../types/Video'

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
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static propTypes = {
    video: PropTypes.object.isRequired,
    flattenedTaxonomy: PropTypes.array.isRequired,
  }

  static defaultProps = {
    video: new Video(),
    flattenedTaxonomy: [],
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
    const { video, flattenedTaxonomy } = this.props
    console.log(`video: ${JSON.stringify(video)}`)

    return(
      <div>
        <PageHeader>Add new Video</PageHeader>
        { video.errorMessage &&
          <Alert bsStyle='warning'>{video.errorMessage}</Alert>
        }
        { video.successMessage &&
          <Alert bsStyle='success'>{video.successMessage}</Alert>
        }

        {/* <div className='progress'>
          <div className='progress-bar progress-lg progress-bar-custom progress-bar-striped'
            role='progressbar'
            aria-valuenow='0'
            aria-valuemin='0'
            aria-valuemax='100'></div>
        </div> */}

        <Form horizontal>
          <FormGroup validationState={video.validationState['title']}>
            <Col sm={2} componentClass={ControlLabel} style={styles.label}>
              Title
            </Col>
            <Col sm={6}>
              <FormControl type='text' bsSize='large' name='title' placeholder='Title' value={video.title} onChange={this.handleInputChange}/>
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup validationState={video.validationState['category']}>
            <Col sm={2} componentClass={ControlLabel} style={styles.label}>
              Category
            </Col>
            <Col sm={6}>
              <FormControl componentClass='select' bsSize='large' name='category' value={video.category} onChange={this.handleInputChange}>
                <option value=''>- Category -</option>
                { flattenedTaxonomy.map((taxonomy, i) => {
                  return (
                    <option value={taxonomy.id}>{taxonomy.name}</option>
                  )
                })}
              </FormControl>
              <FormControl.Feedback />
            </Col>
          </FormGroup>

          <FormGroup validationState={video.validationState['file']}>
            <Col sm={2} componentClass={ControlLabel} style={styles.label}>
              Video File
            </Col>
            <Col sm={6}>
              <FormControl type='file' name='file' data-iconname='fa fa-cloud-upload' className='filestyle' onChange={this.handleInputChange} />
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
    //TODO - this will need to be something else
    video: state.video
  }),
  (dispatch) => ({ //mapDispatchToProps
    // fetchProfile: bindActionCreators(fetchProfile, dispatch),
  })
)(VideoForm)
