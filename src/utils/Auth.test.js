import Auth from './Auth'

it('loads a configured auth0', () => {
  // const reactAppKeys = Object.keys(process.env).filter(key => key.startsWith('REACT_APP_'))
  // reactAppKeys.map(key => console.log(`${key} = ${process.env[key]}`))

  const auth = new Auth({
    auth0_domain:'cohesioned.auth0.com',
    auth0_cliend_id:'abc123',
    callback_url:'http://localhost:3000/callback'
  })

  // console.log(Object.keys(auth.webAuth.baseOptions))

  expect(auth).toBeDefined()
  expect(auth.webAuth).toBeDefined()
  expect(auth.webAuth.baseOptions.domain).toBe('cohesioned.auth0.com')
  expect(auth.webAuth.baseOptions.clientID).toBe('abc123')
  expect(auth.webAuth.baseOptions.redirectUri).toBe('http://localhost:3000/callback')
  expect(auth.login).toBeDefined()
  expect(auth.isAuthenticated).toBeDefined()
});
