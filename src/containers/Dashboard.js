import React from 'react'
import { connect } from 'react-redux'
import { Grid, Row, Col } from 'react-bootstrap'
import DashboardTopBar from './DashboardTopBar'
import DashboardLeftSideMenu from './DashboardLeftSideMenu'
import DashboardFooter from '../views/DashboardFooter'
import EarlyRegistration from '../views/EarlyRegistration'

const styles = {
  containerFluid:{
    padding:0,
  },
  header:{
    position:'fixed',
    zIndex:1000,
  },
  main:{
    paddingTop:'7em',
    paddingRight:'10',
    paddingLeft:'10',
    paddingBottom:'1em',
  },
  contentArea:{
    marginTop:'-0.7em',
    paddingBottom:'2em',
  },
}

class Dashboard extends React.Component {
  render (){
    const { config } = this.props
    return(
      <Grid fluid style={styles.containerFluid}>
        <Row>
          <Col xs={12}>
            <DashboardTopBar config={config} />
          </Col>
        </Row>
        <Row style={styles.main}>
          <Col sm={3} xsHidden>
            <DashboardLeftSideMenu />
          </Col>
          <Col sm={9} xs={12} style={styles.contentArea}>
            <EarlyRegistration />
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
