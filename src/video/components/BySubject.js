import React from 'react'
import PropTypes from 'prop-types'
import { Col, Grid, PageHeader, Row, Thumbnail } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import * as actions from '../actions'

const styles = {
  containerFluid:{
    padding:0,
    height:'100%',
  },
  videoRow:{
    padding:'1em',
  },
  videoCell:{
    paddingBottom:'1em',
  },
  videoGroupTitle:{
    fontWeight: 'bold',
    fontSize: '1.1em',
  },
  videoTitle:{
    fontWeight: 'bold',
    textOverflow: 'hidden',
  },
}

export default class BySubject extends React.Component {
  constructor(props) {
    super(props)

    this.renderVideoCell = this.renderVideoCell.bind(this)

    this.state = {
      videosBySubject: {},
    }
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  static defaultProps = {
  }

  componentDidMount() {
    const { grade, subject} = this.props.match.params

    actions.fetchVideosBySubject(grade, subject).then((result) => {
      if(result.errorMessage){
        alert(result.errorMessage)
        return
      }

      this.setState(Object.assign({}, {videosBySubject: result.by_subject}))
    })
  }

  renderVideoRows(sectionKey, sectionTitle, videos){
    let rows = [], cols = []

    videos.forEach((video, i) => {
      cols.push(this.renderVideoCell(video))

      if((i + 1) === videos.length || (i + 1) % 4 === 0){
        rows.push(
          <Row key={i} style={styles.videoRow}>
            {cols}
          </Row>
        )

        cols = []
      }
    })

    return(
      <Grid fluid style={styles.containerFluid} key={sectionKey}>
        <Row style={styles.videoRow}>
          <Col style={styles.videoGroupTitle}>
            {sectionTitle} ({videos.length})
          </Col>
        </Row>

        { rows }
      </Grid>
    )
  }

  renderVideoCell(video){
    return(
      <Col sm={3} style={styles.videoCell} key={video.id}>
        <Link to={`/video/${video.id}`}>
          <Thumbnail src={video.ThumbnailURL} alt={video.title}>
           <p style={styles.videoTitle}>{video.title}</p>
         </Thumbnail>
       </Link>
     </Col>
    )
  }

  render(){
  const { grade, subject} = this.props.match.params
    const gradeTitle = `${grade} ${grade !== 'Kindergarten' ? 'Grade' : ''}`
    const pageTitle = `${gradeTitle} ${subject} Videos`

    const videosBySubject = this.state.videosBySubject ? this.state.videosBySubject : {}

    return(
      <div>
        <PageHeader>
          {pageTitle}
        </PageHeader>

        { grade !== '3rd' &&
          <div>
            <p>Thank you for signing up!</p>

            <p>We are currently finalizing our {gradeTitle} videos and will be releasing them soon. You will not be charged for students registered in {gradeTitle} at this time.</p>

            <p>Once the {gradeTitle} videos are available, we will send an email notification and provide a 14 day free trial for you to explore our service.</p>

            <p>You can also follow our announcements on our <a href="https://www.facebook.com/pg/cohesioned/">Facebook Page</a> where we will continue to update our followers as we release new videos and features.</p>

            <img src="https://media.giphy.com/media/5Zesu5VPNGJlm/giphy.gif" alt="Working Monkey" />
          </div>

        }
        { grade === '3rd' && Object.keys(videosBySubject).map((key, i) => {
          const videos = videosBySubject[key] ? videosBySubject[key] : []
          if(videos.length  === 0){
            return ''
          }

          return this.renderVideoRows(i, key, videos)
        })}
      </div>
    )
  }
}
