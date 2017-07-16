import { shallow } from 'enzyme'
import EarlyRegistration from './EarlyRegistration'


it('renders without crashing', () => {
  const wrapper = shallow(<EarlyRegistration />)
});
