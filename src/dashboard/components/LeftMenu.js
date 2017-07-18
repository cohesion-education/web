import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class LeftMenu extends React.Component {
  render (){
    return(
      <ListGroup>
        <ListGroupItem><Link to="/dashboard">Welcome</Link></ListGroupItem>
        <ListGroupItem><Link to="/profile">Settings</Link></ListGroupItem>
      </ListGroup>
    )
  }
}
