import { shallow } from 'enzyme'
import HomepageHeader from './HomepageHeader'


it('renders without crashing', () => {
  const wrapper = shallow(<HomepageHeader />)
  expect(wrapper.contains(<h2 className="homepage-header-title">Know what your child is learning</h2>)).toBeTruthy()
  expect(wrapper.contains(<h4 className="homepage-header-subtitle">A video library and support platform by Teachers for You</h4>)).toBeTruthy()
});
