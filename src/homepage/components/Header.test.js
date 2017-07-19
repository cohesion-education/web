import { shallow } from 'enzyme'
import Header from './Header'

it('renders without crashing', () => {
  const wrapper = shallow(<Header />)
  // console.log(`wrapper type: ${wrapper.type()}`)
  // console.log(`Navbar.Header: ${wrapper.find('Navbar.Header')}`)

  expect(wrapper.find('Navbar.Header')).toBeDefined()
  expect(wrapper.find('Navbar.Brand')).toBeDefined()
})
