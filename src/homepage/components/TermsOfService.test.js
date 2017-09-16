import { shallow } from 'enzyme'
import TermsOfService from './TermsOfService'


it('renders without crashing', () => {
  const wrapper = shallow(<TermsOfService />)
  expect(wrapper
    .find('Header')
    .length
  ).toBe(1)
  expect(wrapper
    .find('Footer')
    .length
  ).toBe(1)
})
