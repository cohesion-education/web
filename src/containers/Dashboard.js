import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import DashboardTopBar from './DashboardTopBar'
import DashboardLeftSideMenu from './DashboardLeftSideMenu'
import DashboardFooter from '../views/DashboardFooter'

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
            <DashboardTopBar />
          </Col>
        </Row>
        <Row style={styles.main}>
          <Col sm={3} xsHidden style={styles.leftSideMenu}>
            <DashboardLeftSideMenu />
          </Col>
          <Col sm={8} xs={12} style={styles.contentArea}>
            {this.props.children}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <DashboardFooter />
          </Col>
        </Row>
      </Grid>
    )
  }
}


export default connect((state) => state)(Dashboard)
