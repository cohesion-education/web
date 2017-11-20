import React from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import history from '../../history'
import { isAdmin } from '../../auth/actions'
import Profile from '../../types/Profile'
import TopBar from './TopBar'
import UserListGroup from './UserListGroup'
import StudentsListGroup from './StudentsListGroup'
import AdminListGroup from './AdminListGroup'
import Footer from './Footer'

const styles = {
  containerFluid:{
    padding:0,
    height:'100%',
  },
  main:{
    paddingTop:'0em',
    paddingRight:'10px',
    paddingLeft:'10px',
    paddingBottom:'1em',
    height:'100%',
  },
  contentArea:{
    marginTop:'-3em',
    paddingLeft:'2em',
    minHeight:'100%',
    paddingBottom:'50px',
  },
  footer:{
    position: 'absolute',
    right: '0',
    bottom: '0',
    left: '0',
    height: '50px',
  }
}

export class Dashboard extends React.Component {

  static propTypes = {
    profile: PropTypes.object.isRequired
  }

  static defaultProps =  {
    profile: new Profile()
  }

  componentWillMount(){
    const { profile } = this.props
    if(profile.onboarded === false && !isAdmin()){
      history.replace('/onboarding')
      return
    }
  }

  render (){
    return(
      <Grid fluid style={styles.containerFluid}>
        <Row>
          <Col xs={12}>
            <TopBar />
          </Col>
        </Row>
        <Row style={styles.main}>
          <Col sm={3} xsHidden>
            { isAdmin() &&
              <AdminListGroup />
            }
            <StudentsListGroup />
            <UserListGroup />
          </Col>
          <Col sm={8} xs={12} style={styles.contentArea}>
            {this.props.children}
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <Footer style={styles.footer}/>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default connect(
  (state) => ({
    //mapStateToProps
    profile: state.profile
  }),
  (dispatch) => ({
    //mapDispatchToProps
  })
)(Dashboard)
