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

export default class ByGrade extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      videosByGrade: {},
    }
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  static defaultProps = {
  }

  componentDidMount() {
    const { grade } = this.props.match.params

    actions.fetchVideosByGrade(grade).then((result) => {
      if(result.errorMessage){
        alert(result.errorMessage)
        return
      }

      console.log(`fetch videos by grade response: ${JSON.stringify(result.by_grade)}`)

      this.setState(Object.assign({}, {videosByGrade: result.by_grade}))
    })
  }

  render(){
    const { grade } = this.props.match.params
    const gradeTitle = `${grade} ${grade !== 'Kindergarten' ? 'Grade' : ''}`
    const pageTitle = `${gradeTitle} Videos`

    const videosByGrade = this.state.videosByGrade ? this.state.videosByGrade : {}
    console.log(`rendering videos by grade: ${JSON.stringify(videosByGrade)}`)
    // console.log(`current state: ${JSON.stringify(this.state)}`)

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
        { grade === '3rd' && Object.keys(videosByGrade).map((key, i) => {
          const videos = videosByGrade[key] ? videosByGrade[key] : []
          console.log(`${key}: ${videos.length}`)
          if(videos.length  === 0){
            return ''
          }
          
          return (
            <Grid fluid style={styles.containerFluid} key={i}>
              <Row style={styles.videoRow}>
                <Col style={styles.videoGroupTitle}>
                  {key} ({videos.length})
                </Col>
              </Row>
              <Row style={styles.videoRow}>
                {videos.map((video, i) => {
                  return(
                    <Col sm={3} style={styles.videoCell}>
                      <Link to={`/video/${video.id}`}>
                        <Thumbnail src={video.ThumbnailURL} alt={video.title} rounded>
                         <p style={styles.videoTitle}>{video.title}</p>
                       </Thumbnail>
                     </Link>
                   </Col>
                  )
                })}
              </Row>
            </Grid>
          )

        })}
      </div>
    )
  }
}
