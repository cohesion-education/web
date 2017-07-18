import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

export default class LeftMenu extends React.Component {
  render (){
    return(
      <ListGroup>
        <ListGroupItem href="/dashboard">Welcome</ListGroupItem>
        <ListGroupItem href="/profile">Settings</ListGroupItem>
      </ListGroup>
    )
  }
}
