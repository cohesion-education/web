import React from 'react'
import { Alert, PageHeader, Table } from 'react-bootstrap'
import * as actions from '../actions'


export default class PaymentDetailsReport extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      paymentdetails: [],
      errorMessage: ''
    }
  }

  componentDidMount() {
    actions.fetchPaymentDetails().then((result) => {
      if(result.errorMessage){
        this.setState({errorMessage: `Failed to fetch payment details: ${result.errorMessage}`})
        return
      }

      this.setState({paymentdetails: result})
    })
  }

  render(){
    const { paymentdetails, errorMessage } = this.state

    return(
      <div>
        <PageHeader>
          Payment Details ({paymentdetails.length})
        </PageHeader>

        { errorMessage !== '' &&
          <Alert bsStyle='warning'>{errorMessage}</Alert>
        }
        <Table responsive striped condensed>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Token Client IP</th>
              <th>Card Brand</th>
              <th>Card Funding</th>
              <th>State</th>
              <th>City</th>
              <th>Postal Code</th>
              <th>Created By ID</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            { paymentdetails.map((pd, i) => {
              return (
                <tr key={i}>
                  <td>{pd.id}</td>
                  <td>{pd.token.card.name}</td>
                  <td>{pd.token.client_ip}</td>
                  <td>{pd.token.card.brand}</td>
                  <td>{pd.token.card.funding}</td>
                  <td>{pd.token.card.address_state}</td>
                  <td>{pd.token.card.address_city}</td>
                  <td>{pd.token.card.address_zip}</td>
                  <td>{pd.created_by}</td>
                  <td>{pd.created.toString()}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}
