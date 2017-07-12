import { shallow } from 'enzyme'
import HomepageHeader from './HomepageHeader'


it('renders without crashing', () => {
  const wrapper = shallow(<HomepageHeader />)
});
