import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Taxonomy from '../../types/Taxonomy'

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

  constructor(props) {
    super(props)

    this.state = {videos: []}
  }

  static propTypes = {
    taxonomy: PropTypes.object.isRequired
  }

  static defaultProps = {
    taxonomy: new Taxonomy()
  }

  componentDidMount() {
    // this.props.fetchVideoList()
  }




  render(){
    const { videos } = this.state
    const { taxonomy } = this.props



    return(
      <div>
        <Grid fluid style={styles.containerFluid}>
          <Row style={styles.videoRow}>
            <Col style={styles.videoGroupTitle}>
              {taxonomy.name}
            </Col>
          </Row>
          <Row style={styles.videoRow}>
            { videos.map((video, i) => {
              return (
                <Col sm={3} style={styles.videoCell}>
                  <Link to="/video/1234">
                    <Thumbnail src="https://i.ytimg.com/vi/VzAap35yd34/maxresdefault.jpg" alt="Video Title">
                     <h5>Video Title</h5>
                   </Thumbnail>
                 </Link>
                </Col>
              )
            })}
          </Row>
        </Grid>
      </div>
    )
  }
}
