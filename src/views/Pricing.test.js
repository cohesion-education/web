import { shallow } from 'enzyme'
import Pricing from './Pricing'


it('renders without crashing', () => {
  const wrapper = shallow(<Pricing />)
  expect(wrapper
    .find('PricingPlan')
    .length
  ).toBe(3)
});
