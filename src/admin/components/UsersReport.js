import React from 'react'
import { Alert, PageHeader, Table } from 'react-bootstrap'
import * as actions from '../actions'

export default class UsersReport extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      errorMessage: ''
    }
  }


  componentDidMount() {
    actions.fetchUsers().then((result) => {
      if(result.errorMessage){
        this.setState({errorMessage: `Failed to fetch users: ${result.errorMessage}`})
        return
      }

      this.setState({users: result})
    })
  }

  render(){
    const { users, errorMessage } = this.state

    return(
      <div>
        <PageHeader>
          Users ({users.length})
        </PageHeader>

        { errorMessage !== '' &&
          <Alert bsStyle='warning'>{errorMessage}</Alert>
        }

        <Table responsive striped condensed>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>State</th>
              <th>County</th>
              <th>Date Created</th>
              <th>Onboarded</th>
              <th>Sub</th>
            </tr>
          </thead>
          <tbody>
            { users.map((user, i) => {
              return (
                <tr key={i}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.state}</td>
                  <td>{user.county}</td>
                  <td>{user.created.toString()}</td>
                  <td>{user.onboarded ? 'Yes' : 'No'}</td>
                  <td>{user.sub}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}
