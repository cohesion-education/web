import { shallow } from 'enzyme'
import Homepage from './Homepage'

it('renders without crashing', () => {
  const wrapper = shallow(<Homepage />)

  expect(wrapper.find('HomepageHeader')).toBeDefined()
  expect(wrapper.find('TopOfPageBackgroundImage').length).toBe(1)
  expect(wrapper.find('Features')).toBeDefined()
  expect(wrapper.find('FeatureDescriptionList').length).toBe(1)
  expect(wrapper.find('Testimonials')).toBeDefined()
  expect(wrapper.find('Pricing')).toBeDefined()
  expect(wrapper.find('Footer').length).toBe(1)
})
