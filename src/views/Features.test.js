import Features from './Features'
import { shallow } from 'enzyme'


it('renders without crashing', () => {
  const wrapper = shallow(<Features />)
  expect(wrapper
    .find('Feature')
    .length
  ).toBe(3)
});
