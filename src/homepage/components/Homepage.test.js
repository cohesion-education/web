import { shallow } from 'enzyme'
import Homepage from './Homepage'
import { homepage } from '../data/initial-state'

it('Homepage renders without crashing', () => {
  const _fetchHomepage = jest.fn()

  const wrapper = shallow(<Homepage homepage={homepage} fetchHomepage={_fetchHomepage} />)

  expect(wrapper.find('Header').length).toBe(1)
  expect(wrapper.find('TopOfPageBackgroundImage').length).toBe(1)
  expect(wrapper.find('FeatureList').length).toBe(1)
  expect(wrapper.find('FeatureDescriptionList').length).toBe(1)
  expect(wrapper.find('TestimonialList').length).toBe(1)
  expect(wrapper.find('PricingList').length).toBe(1)
  expect(wrapper.find('Footer').length).toBe(1)
})
