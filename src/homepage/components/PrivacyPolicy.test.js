import { shallow } from 'enzyme'
import PrivacyPolicy from './PrivacyPolicy'


it('renders without crashing', () => {
  const wrapper = shallow(<PrivacyPolicy />)
  expect(wrapper
    .find('Header')
    .length
  ).toBe(1)
  expect(wrapper
    .find('Footer')
    .length
  ).toBe(1)
})
