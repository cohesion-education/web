import { shallow } from 'enzyme'
import PricingList from './PricingList'

it('renders without crashing', () => {
  const list = [
    {
      "title": "Test 1",
      "price": "$1",
      "duration": "1 day"
    },
    {
      "title": "Test 2",
      "price": "$2",
      "duration": "2 days"
    },
    {
      "title": "Test 3",
      "price": "$3",
      "duration": "3 days"
    }
  ]

  const wrapper = shallow(
    <PricingList
      list={list} />
  )
  expect(wrapper
    .find('section.section')
    .length
  ).toBe(1)

  expect(wrapper
    .find('PricingPlan')
    .length
  ).toBe(3)
});
