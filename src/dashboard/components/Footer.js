import React from 'react'

const styles = {
  footer:{
    backgroundColor: '#e2e2e2',
    borderColor: '#cecece',
    padding: '10px'
  }
}

export default class Footer extends React.Component {
  render (){
    return(
      <footer style={styles.footer}>
        &copy; 2017 Cohesion Education, Inc. All rights reserved.
      </footer>
    )
  }
}
