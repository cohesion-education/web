import { shallow } from 'enzyme'
import UserProfile from './UserProfile'


it('renders without crashing', () => {
  const wrapper = shallow(<UserProfile />)
});
