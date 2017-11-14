import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class UserListGroup extends React.Component {
  render (){
    return(
      <ListGroup>
        <ListGroupItem><Link to="/profile">Profile</Link></ListGroupItem>
        <ListGroupItem><Link to="/profile/students">Students</Link></ListGroupItem>
        <ListGroupItem><Link to="/profile/payment_details">Payment Details</Link></ListGroupItem>
      </ListGroup>
    )
  }
}
