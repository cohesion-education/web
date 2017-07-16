import { shallow } from 'enzyme'
import EarlyRegistration from './EarlyRegistration'


it('renders without crashing', () => {
  window.config = {
    auth0_domain:"cohesioned.auth0.com",
    auth0_client_id:"abc123",
    callback_url:"http://localhost:3000/callback",
  }
  
  const wrapper = shallow(<EarlyRegistration />)
});
