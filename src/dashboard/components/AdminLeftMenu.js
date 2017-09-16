import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class LeftMenu extends React.Component {
  render (){
    return(
      <ListGroup>
        <ListGroupItem>Administrative Functions</ListGroupItem>
        <ListGroupItem><Link to="/taxonomy">Taxonomy</Link></ListGroupItem>
        <ListGroupItem><Link to="/videos">Videos</Link></ListGroupItem>
      </ListGroup>
    )
  }
}
