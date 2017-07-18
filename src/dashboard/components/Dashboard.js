import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import TopBar from './TopBar'
import LeftMenu from './LeftMenu'
import Footer from './Footer'

const styles = {
  containerFluid:{
    padding:0,
  },
  leftSideMenu:{

  },
  main:{
    paddingTop:'0em',
    paddingRight:'10px',
    paddingLeft:'10px',
    paddingBottom:'1em',
  },
  contentArea:{
    marginTop:'-3em',
    paddingBottom:'2em',
    paddingLeft:'2em',
  },
}

class Dashboard extends React.Component {
  render (){
    return(
      <Grid fluid style={styles.containerFluid}>
        <Row>
          <Col xs={12}>
            <TopBar />
          </Col>
        </Row>
        <Row style={styles.main}>
          <Col sm={3} xsHidden style={styles.leftSideMenu}>
            <LeftMenu />
          </Col>
          <Col sm={8} xs={12} style={styles.contentArea}>
            {this.props.children}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Footer />
          </Col>
        </Row>
      </Grid>
    )
  }
}


export default connect((state) => state)(Dashboard)
