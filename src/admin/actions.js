import { getIDToken } from '../auth/actions'

export function fetchUsers() {
  const token = getIDToken()
  const apiURL = `${window.config.api_base}/api/report/profiles`
  const opts = {
    method: 'get',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }

  return fetch(apiURL, opts)
    .then(response => response.json())
    .then(json => {
      if(json){
        console.log(`fetch users response: ${JSON.stringify(json)}`)
        return json
      }
    })
    .catch(error => {
      console.log(`error fetching users: ${error}\nuri: ${apiURL}\nopts: ${JSON.stringify(opts)}`)
      return {errorMessage: error}
    })
}

export function fetchStudents() {
  const token = getIDToken()
  const apiURL = `${window.config.api_base}/api/report/students`
  const opts = {
    method: 'get',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }

  return fetch(apiURL, opts)
    .then(response => response.json())
    .then(json => {
      if(json){
        // console.log(`fetch students response: ${JSON.stringify(json)}`)
        return json
      }
    })
    .catch(error => {
      console.log(`error fetching students: ${error}\nuri: ${apiURL}\nopts: ${JSON.stringify(opts)}`)
      return {errorMessage: error}
    })
}

export function fetchPaymentDetails() {
  const token = getIDToken()
  const apiURL = `${window.config.api_base}/api/report/paymentdetails`
  const opts = {
    method: 'get',
    mode: 'cors',
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }

  return fetch(apiURL, opts)
    .then(response => response.json())
    .then(json => {
      if(json){
        console.log(`fetch paymentdetails response: ${JSON.stringify(json)}`)
        return json
      }
    })
    .catch(error => {
      console.log(`error fetching paymentdetails: ${error}\nuri: ${apiURL}\nopts: ${JSON.stringify(opts)}`)
      return {errorMessage: error}
    })
}
