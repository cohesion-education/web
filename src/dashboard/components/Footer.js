import React from 'react'
import { Navbar } from 'react-bootstrap'

const styles = {
  footer:{
    backgroundColor: '#e2e2e2',
    borderColor: '#cecece',
  }
}

export default class Footer extends React.Component {
  render (){
    return(
      <Navbar fluid style={styles.footer}>
        <Navbar.Text>
          &copy; 2017 Cohesion Education, Inc. All rights reserved.
        </Navbar.Text>
      </Navbar>
    )
  }
}
