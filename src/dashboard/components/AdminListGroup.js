import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class AdminListGroup extends React.Component {
  render (){
    return(
      <ListGroup>
        <ListGroupItem>Admin Functions</ListGroupItem>
        <ListGroupItem><Link to="/admin/taxonomy">Taxonomy</Link></ListGroupItem>
        <ListGroupItem><Link to="/admin/videos">Videos</Link></ListGroupItem>
      </ListGroup>
    )
  }
}
