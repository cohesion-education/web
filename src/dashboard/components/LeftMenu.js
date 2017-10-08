import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import * as profileActions from '../../profile/actions'
import Profile from '../../types/Profile'

class LeftMenu extends React.Component {

  static propTypes = {
    profile: PropTypes.object.isRequired,
    fetchStudents: PropTypes.func.isRequired,
  }

  static defaultProps = {
    profile: new Profile()
  }

  componentDidMount() {
    this.props.fetchStudents()
  }

  render (){
    const { profile } = this.props
    return(
      <ListGroup>
        <ListGroupItem><Link to="/dashboard">Welcome</Link></ListGroupItem>
        <ListGroupItem><Link to="/profile">Profile</Link></ListGroupItem>
        <ListGroupItem><Link to="/profile/students">Students</Link></ListGroupItem>

        { profile.students && profile.students.map((student, i) => {
            return (!student) ? ( null ) : (
              <ListGroup key={i}>
                <ListGroupItem>
                  <Link to={`/videos/${student.grade}`}>
                    {student.name}'s {student.grade} {student.grade !== 'Kindergarten' ? 'Grade' : ''} Videos
                  </Link>
                  <ListGroup>
                    <ListGroupItem><Link to={`/videos/${student.grade}/Math`}>Math</Link></ListGroupItem>
                    <ListGroupItem><Link to={`/videos/${student.grade}/ELA`}>ELA</Link></ListGroupItem>
                  </ListGroup>
                </ListGroupItem>
              </ListGroup>
            )
          })
        }
      </ListGroup>
    )
  }
}

export default connect(
  (state) => ({
    //mapStateToProps
    profile: state.profile,
  }),
  (dispatch) => ({
    //mapDispatchToProps
    fetchStudents: bindActionCreators(profileActions.fetchStudents, dispatch),
  })
)(LeftMenu)
