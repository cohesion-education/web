import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, PageHeader, Thumbnail } from 'react-bootstrap'
import { Link } from 'react-router-dom'

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
}

export default class ByTaxonomy extends React.Component {
  static propTypes = {
    videos: PropTypes.array.isRequired,
  }

  static defaultProps = {
    videos: []
  }

  componentDidMount() {
    // this.props.fetchVideoList()
  }




  render(){
    const { videos, match } = this.props
    const { grade, subject, unit, set } = match.params

    //TODO - display list of videos
    console.log(`videos: ${videos}`)

    let title = `${grade} ${grade !== 'Kindergarten' ? 'Grade' : ''}`
    if(subject){
      title += ` > ${subject}`
    }

    if(unit){
      title += ` > ${unit}`
    }

    if(set){
      title += ` > ${set}`
    }

    title += ' Videos'

    console.log(`grade: ${grade} - subject ${subject} - unit: ${unit} - set: ${set}`)

    return(
      <div>
        <PageHeader>
          {title}
        </PageHeader>

        { grade !== '3rd' &&
          <div>
            <p>Thank you for signing up!</p>

            <p>We currently do not have videos for {title}, but we're working on releasing those videos soon. You will not be charged for students registered in {title} at this time.</p>

            <p>Once the {title} videos are available, we will send an email notification and provide a 14 day free trial for you to explore our service.</p>
          </div>
        }
        { grade === '3rd' &&
          <Grid fluid style={styles.containerFluid}>
            <Row style={styles.videoRow}>
              <Col style={styles.videoGroupTitle}>
                Recently Viewed
              </Col>
            </Row>
            <Row style={styles.videoRow}>
              <Col sm={3} style={styles.videoCell}>
                <Link to="/video/1234">
                  <Thumbnail src="https://i.ytimg.com/vi/VzAap35yd34/maxresdefault.jpg" alt="Video Title">
                   <h5>Video Title</h5>
                 </Thumbnail>
               </Link>
              </Col>
              <Col sm={3} style={styles.videoCell}>
                <Link to="/video/1234">
                  <Thumbnail src="https://i.ytimg.com/vi/VzAap35yd34/maxresdefault.jpg" alt="Video Title">
                   <h5>Video Title</h5>
                 </Thumbnail>
               </Link>
              </Col>
              <Col sm={3} style={styles.videoCell}>
                <Link to="/video/1234">
                  <Thumbnail src="https://i.ytimg.com/vi/VzAap35yd34/maxresdefault.jpg" alt="Video Title">
                   <h5>Video Title</h5>
                 </Thumbnail>
               </Link>
              </Col>
            </Row>
            <Row style={styles.videoRow}>
              <Col style={styles.videoGroupTitle}>
                Unit > Set
              </Col>
            </Row>
            <Row style={styles.videoRow}>
              <Col style={styles.videoGroupTitle}>
                Unit > Set
              </Col>
            </Row>
            <Row style={styles.videoRow}>
              <Col sm={3} style={styles.videoCell}>
                <Link to="/video/1234">
                  <Thumbnail src="https://i.ytimg.com/vi/VzAap35yd34/maxresdefault.jpg" alt="Video Title">
                   <h5>Video Title</h5>
                 </Thumbnail>
               </Link>
              </Col>
              <Col sm={3} style={styles.videoCell}>
                <Link to="/video/1234">
                  <Thumbnail src="https://i.ytimg.com/vi/VzAap35yd34/maxresdefault.jpg" alt="Video Title">
                   <h5>Video Title</h5>
                 </Thumbnail>
               </Link>
              </Col>
              <Col sm={3} style={styles.videoCell}>
                <Link to="/video/1234">
                  <Thumbnail src="https://i.ytimg.com/vi/VzAap35yd34/maxresdefault.jpg" alt="Video Title">
                   <h5>Video Title</h5>
                 </Thumbnail>
               </Link>
              </Col>
              <Col sm={3} style={styles.videoCell}>
                <Link to="/video/1234">
                  <Thumbnail src="https://i.ytimg.com/vi/VzAap35yd34/maxresdefault.jpg" alt="Video Title">
                   <h5>Video Title</h5>
                 </Thumbnail>
               </Link>
              </Col>
              <Col sm={3} style={styles.videoCell}>
                <Link to="/video/1234">
                  <Thumbnail src="https://i.ytimg.com/vi/VzAap35yd34/maxresdefault.jpg" alt="Video Title">
                   <h5>Video Title</h5>
                 </Thumbnail>
               </Link>
              </Col>
              <Col sm={3} style={styles.videoCell}>
                <Link to="/video/1234">
                  <Thumbnail src="https://i.ytimg.com/vi/VzAap35yd34/maxresdefault.jpg" alt="Video Title">
                   <h5>Video Title</h5>
                 </Thumbnail>
               </Link>
              </Col>
              <Col sm={3} style={styles.videoCell}>
                <Link to="/video/1234">
                  <Thumbnail src="https://i.ytimg.com/vi/VzAap35yd34/maxresdefault.jpg" alt="Video Title">
                   <h5>Video Title</h5>
                 </Thumbnail>
               </Link>
              </Col>
              <Col sm={3} style={styles.videoCell}>
                <Link to="/video/1234">
                  <Thumbnail src="https://i.ytimg.com/vi/VzAap35yd34/maxresdefault.jpg" alt="Video Title">
                   <h5>Video Title</h5>
                 </Thumbnail>
               </Link>
              </Col>
            </Row>
          </Grid>
        }
      </div>
    )
  }
}
