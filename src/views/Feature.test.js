import Feature from './Feature'
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  const wrapper = shallow(
    <Feature
      imgURI='img-uri'
      imgAltText='alt'
      description='test-description'/>
  )
  expect(wrapper.type()).toEqual('div')
  expect(wrapper.hasClass('features-box')).toBeTruthy()
  expect(wrapper.contains(<img src='img-uri' alt='alt' />)).toBeTruthy()
  expect(wrapper.contains(<p className='text-muted'>test-description</p>)).toBeTruthy()
});
