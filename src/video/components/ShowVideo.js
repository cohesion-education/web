import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import VideoPlayer from './VideoPlayer'
import Video from '../../types/Video'
import * as actions from '../actions'

const styles = {
  ratingComponent:{
    margin: '0 auto',
    marginTop: '3em',
    backgroundColor:'#2b2b2b',
    width:'7.75em',
    height: '3.75em',
    borderRadius: '0.4em',
  },
  stoplight: {
    width: '3em',
    height: '3em',
    margin: '0.4em',
    borderRadius: '1.5em',
  },
  greenlight:{
    backgroundColor:'green',
    float:'left',
  },
  redlight:{
    backgroundColor:'red',
    float:'right',
  },
  videoPlayerRow:{
    paddingTop: '1.5em',
    paddingBottom: '1.5em',
  },
  relatedVideosTitle:{
    marginTop: '-1.7em',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  videoMetaLink: {
    padding: '0 0.5em',
    backgroundColor: '#83f583',
    borderRadius: '0.3em',
    margin: '0 0.4em',
  },
}

export default class ShowVideo extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      video: props.video,
    }
  }

  static propTypes = {
    video: PropTypes.object,
    match: PropTypes.object.isRequired,
  }

  static defaultProps = {
    video: new Video()
  }

  componentDidMount() {
    const { id } = this.props.match.params

    actions.fetchVideoByID(id).then((video) => {
      this.setState(Object.assign({}, {video: video}))
    })
  }

  render(){
    const video = this.state.video ? this.state.video : new Video()

    const videoJsOptions = {
      autoplay: false,
      controls: true,
      fluid: true,
      poster: video.ThumbnailURL,
      sources: [{
        src: video.signed_url,
        type: 'video/mp4'
      }]
    }

    return(
      <div>
        <Grid fluid>
          <Row>
            <Col sm={8}>
              <PageHeader>{video.title}</PageHeader>
            </Col>
          </Row>
          <Row>
            <Col smOffest={1} sm={11}>
              {video.taxonomy ? video.taxonomy.name : ''}
            </Col>
          </Row>
          <Row style={styles.videoPlayerRow}>
            <Col sm={8}>
              { video.signed_url &&
                <VideoPlayer { ...videoJsOptions } />
              }
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <ListGroup>
                { (video.key_terms && video.key_terms.length !== 0) &&
                  <ListGroupItem>
                    Key Terms: {video.key_terms.map((term, i) => {
                      return (
                        <Link style={styles.videoMetaLink} key={i} to="" onClick={(e) => e.preventDefault()}>{term}</Link>
                      )
                    })}
                  </ListGroupItem>
                }
                { (video.state_standards && video.state_standards.length !== 0) &&
                  <ListGroupItem>
                    State Standards: {video.state_standards.map((term, i) => {
                      return (
                        <Link style={styles.videoMetaLink} key={i} to="" onClick={(e) => e.preventDefault()}>{term}</Link>
                      )
                    })}
                  </ListGroupItem>
                }
                { (video.common_core_standards && video.common_core_standards.length !== 0) &&
                  <ListGroupItem>
                    Common Core Standards: {video.common_core_standards.map((term, i) => {
                      return (
                        <Link style={styles.videoMetaLink} key={i} to="" onClick={(e) => e.preventDefault()}>{term}</Link>
                      )
                    })}
                  </ListGroupItem>
                }
              </ListGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
