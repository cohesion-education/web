import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import * as profileActions from '../../profile/actions'
import Profile from '../../types/Profile'

class Landing extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  static propTypes = {
    fetchProfileIfNeeded: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    students: PropTypes.array.isRequired,
  }

  static defaultProps = {
    profile: new Profile(),
    students: []
  }

  componentDidMount() {
    this.props.fetchProfileIfNeeded()
    this.props.fetchStudentsIfNeeded()
  }

  render(){
    const { students } = this.props
    return(
      <div>
        <PageHeader>Welcome to Cohesion Education</PageHeader>

        { students &&
          <div>
            <p>Select one of your students to view videos for their grade</p>
            <ListGroup>
              { students.map((student, i) => {
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
          </div>
        }

        <p>Manage your settings</p>
        <ListGroup>
          <ListGroupItem><Link to="/profile">Profile</Link></ListGroupItem>
          <ListGroupItem><Link to="/profile/students">Students</Link></ListGroupItem>
          <ListGroupItem><Link to="/profile/payment_details">Payment Details</Link></ListGroupItem>
        </ListGroup>
      </div>
    )
  }
}

export default connect(
  (state) => ({ //mapStateToProps
    profile: state.profile,
    students: state.students.students,
  }),
  (dispatch) => ({ //mapDispatchToProps
    fetchProfileIfNeeded: bindActionCreators(profileActions.fetchProfileIfNeeded, dispatch),
    fetchStudentsIfNeeded: bindActionCreators(profileActions.fetchStudentsIfNeeded, dispatch),
  })
)(Landing)
