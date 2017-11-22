import React from 'react'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem, PageHeader } from 'react-bootstrap'
import { Link } from 'react-router-dom'


export default class ByGrade extends React.Component {

  static propTypes = {
    match: PropTypes.object.isRequired,
  }

  static defaultProps = {
  }


  render(){
    const { grade } = this.props.match.params
    const gradeTitle = `${grade} ${grade !== 'Kindergarten' ? 'Grade' : ''}`
    const pageTitle = `${gradeTitle} Videos`

    return(
      <div>
        <PageHeader>
          {pageTitle}
        </PageHeader>

        { grade !== '3rd' &&
          <div>
            <p>Thank you for signing up!</p>

            <p>We are currently finalizing our {gradeTitle} videos and will be releasing them soon. You will not be charged for students registered in {gradeTitle} at this time.</p>

            <p>Once the {gradeTitle} videos are available, we will send an email notification and provide a 14 day free trial for you to explore our service.</p>

            <p>You can also follow our announcements on our <a href="https://www.facebook.com/pg/cohesioned/">Facebook Page</a> where we will continue to update our followers as we release new videos and features.</p>

            <img src="https://media.giphy.com/media/5Zesu5VPNGJlm/giphy.gif" alt="Working Monkey" />
          </div>

        }
        { grade === '3rd' &&
          <ListGroup>
            <ListGroupItem>
              <Link to={`/videos/${grade}/ELA`}>ELA Videos</Link>
            </ListGroupItem>
            <ListGroupItem>
              <Link to={`/videos/${grade}/Math`}>Math Videos</Link>
            </ListGroupItem>
          </ListGroup>
        }
      </div>
    )
  }
}
