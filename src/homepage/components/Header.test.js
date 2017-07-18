import { shallow } from 'enzyme'
import Header from './Header'
import { Navbar } from 'react-bootstrap'

it('renders without crashing', () => {
  const wrapper = shallow(<Header />)
  console.log(`wrapper type: ${wrapper.type()}`)
  console.log(`Navbar.Header: ${wrapper.find('Navbar.Header')}`)
  // expect(wrapper.find('Navbar.Header').length).toBe(1)
  // expect(wrapper.contains(<Navbar.Brand />)).toBeTruthy()
})
