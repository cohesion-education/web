import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { Testimonials } from './containers'

// jest.mock('./TestimonialList')

describe("<Testimonials /> Container ", () => {
    let wrapper
    let _store = {
        dispatch: jest.fn(),
        subscribe: jest.fn(),
        getState: jest.fn(() => ({
          homepage:{
            testimonials:{
              list:[{
                text: 'Super Awesome!',
                avatar:'test-avatar.png',
                name:'Satisfied Parent'
              }]
            }
          }
        }))
    }

    beforeAll(() => wrapper = mount(
      <Provider store={_store}>
        <Testimonials />
      </Provider>
    ))

    afterEach(() => jest.resetAllMocks())

    it("renders TestimonialList with props", () => {
      expect(wrapper
        .find('TestimonialList')
        .props()
        .list
        .length
      ).toBe(1)

      expect(wrapper
        .find('Testimonial')
        .length
      ).toBe(1)

      expect(wrapper
        .find('Testimonial')
        .props()
        .name
      ).toBe('Satisfied Parent')

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
    })
})
