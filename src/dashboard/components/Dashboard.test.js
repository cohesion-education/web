import { shallow } from 'enzyme'
import { Dashboard } from './Dashboard'

it('renders without crashing', () => {
  const wrapper = shallow(<Dashboard />)

  expect(wrapper.find('TopBar')).toBeDefined()
  // expect(wrapper.find('LeftMenu').length).toBe(1)
  expect(wrapper.find('Footer').length).toBe(1)
})
