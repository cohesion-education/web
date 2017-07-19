import { shallow } from 'enzyme'
import Dashboard from './Dashboard'


it('renders without crashing', () => {
  const wrapper = shallow(<Dashboard />)
  //TODO - figure out how to test for presence of connected compnoents
  // console.log(wrapper.find('DashboardTopBar'))
  expect(wrapper.find('DashboardTopBar')).toBeDefined()
  expect(wrapper.find('LeftMenu').length).toBe(1)
  expect(wrapper.find('Footer').length).toBe(1)
})
