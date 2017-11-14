import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import * as profileActions from '../../profile/actions'

export class StudentsListGroup extends React.Component {

  static propTypes = {
    students: PropTypes.array.isRequired,
    fetchStudents: PropTypes.func.isRequired,
  }

  static defaultProps = {
    students: []
  }

  componentDidMount() {
    this.props.fetchStudents()
  }

  render (){
    const { students } = this.props

    return(
      <ListGroup>
        { students && students.map((student, i) => {
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
    students: state.students.students,
  }),
  (dispatch) => ({
    //mapDispatchToProps
    fetchStudents: bindActionCreators(profileActions.fetchStudentsIfNeeded, dispatch),
  })
)(StudentsListGroup)
