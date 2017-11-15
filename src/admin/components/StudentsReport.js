import React from 'react'
import { Alert, PageHeader, Table } from 'react-bootstrap'
import * as actions from '../actions'

export default class StudentsReport extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      students: [],
      errorMessage: ''
    }
  }


  componentDidMount() {
    actions.fetchStudents().then((result) => {
      if(result.errorMessage){
        this.setState({errorMessage: `Failed to fetch students: ${result.errorMessage}`})
        return
      }

      this.setState({students: result})
    })
  }

  render(){
    const { students, errorMessage } = this.state

    return(
      <div>
        <PageHeader>
          Students ({students.length})
        </PageHeader>

        { errorMessage !== '' &&
          <Alert bsStyle='warning'>{errorMessage}</Alert>
        }

        <Table responsive striped condensed>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Grade</th>
              <th>School</th>
              <th>Date Created</th>
              <th>Parent / Guardian ID</th>
            </tr>
          </thead>
          <tbody>
            { students.map((student, i) => {
              return (
                <tr key={i}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.grade}</td>
                  <td>{student.school}</td>
                  <td>{student.created.toString()}</td>
                  <td>{student.created_by}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}
