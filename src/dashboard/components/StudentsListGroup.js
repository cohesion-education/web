import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import * as profileActions from '../../profile/actions'
import Profile from '../../types/Profile'

export class StudentsListGroup extends React.Component {

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
        { profile.students && profile.students.map((student, i) => {
            return (!student) ? ( null ) : (
              <ListGroupItem key={i}>
                <Link to={`/videos/${student.grade}`}>
                  {student.name}'s Videos
                </Link>
              </ListGroupItem>
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
    fetchStudents: bindActionCreators(profileActions.fetchStudentsIfNeeded, dispatch),
  })
)(StudentsListGroup)
