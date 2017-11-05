import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, ListGroup, ListGroupItem, PageHeader, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import VideoPlayer from './VideoPlayer'
import Video from '../../types/Video'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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

class ShowVideo extends React.Component {

  static propTypes = {
    video: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    fetchVideoByID: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  static defaultProps = {
    video: new Video()
  }

  componentDidMount() {
    /*const { id } = this.props.match.params
    this.props.fetchVideoByID(id).then((video) => {
      this.props.dispatch(actions.receiveVideoToView(video))
    })*/
  }

  render(){
    // const { video } = this.props

    let video = new Video()
    video.signed_url = 'http://techslides.com/demos/sample-videos/small.mp4'
    video.title = 'Divide by Zero'
    video.key_terms = ['term 1', 'term 2', 'term 3']
    video.state_standards = ['fl.1.1', 'fl.1.2']
    video.common_core_standards = ['cc.1.1']

    const videoJsOptions = {
      autoplay: false,
      controls: true,
      fluid: true,
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
            <Col sm={3}>
              <div style={styles.ratingComponent}>
                <div style={{...styles.stoplight, ...styles.greenlight}}></div>
                <div style={{...styles.stoplight, ...styles.redlight}}></div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col smOffest={1} sm={11}>
              1st Grade &gt; Math &gt; Fun with Numbers &gt; Division
            </Col>
          </Row>
          <Row style={styles.videoPlayerRow}>
            <Col sm={8}>
              <VideoPlayer { ...videoJsOptions } />
            </Col>
            <Col sm={3}>
              <div style={styles.relatedVideosTitle}>Related Videos</div>
              <Image src="https://i.ytimg.com/vi/VzAap35yd34/maxresdefault.jpg" thumbnail />
              <Image src="https://i.ytimg.com/vi/VzAap35yd34/maxresdefault.jpg" thumbnail />
              <Image src="https://i.ytimg.com/vi/VzAap35yd34/maxresdefault.jpg" thumbnail />
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <ListGroup>
                <ListGroupItem>
                  Key Terms: {video.key_terms.map((term, i) => {
                    return (
                      <Link style={styles.videoMetaLink} key={i} to="">{term}</Link>
                    )
                  })}
                </ListGroupItem>
                <ListGroupItem>
                  State Standards: {video.state_standards.map((term, i) => {
                    return (
                      <Link style={styles.videoMetaLink} key={i} to="">{term}</Link>
                    )
                  })}
                </ListGroupItem>
                <ListGroupItem>
                  Common Core Standards: {video.common_core_standards.map((term, i) => {
                    return (
                      <Link style={styles.videoMetaLink} key={i} to="">{term}</Link>
                    )
                  })}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    //mapStateToProps
    video: state.video.requestedVideo,
  }),
  (dispatch) => ({
    //mapDispatchToProps
    dispatch: dispatch,
    fetchVideoByID: bindActionCreators(actions.fetchVideoByID, dispatch),
  })
)(ShowVideo)
