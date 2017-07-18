import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import TestimonialList from './TestimonialList'

describe("<TestimonialList /> ", () => {
    it('renders without crashing', () => {
      let list = [{
        text: 'Super Awesome!',
        avatar:'test-avatar.png',
        name:'Satisfied Parent'
      }]

      const wrapper = shallow(<TestimonialList list={list}/>)

      expect(wrapper
        .find('Testimonial')
        .length
      ).toBe(1)

      expect(wrapper
        .find('Testimonial')
        .props()
        .text
      ).toBe('Super Awesome!')

      expect(wrapper
        .find('Testimonial')
        .props()
        .avatar
      ).toBe('test-avatar.png')

      expect(wrapper
        .find('Testimonial')
        .props()
        .name
      ).toBe('Satisfied Parent')
    })
})
