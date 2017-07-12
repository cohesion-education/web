import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Homepage from './Homepage'
import Auth from '../utils/Auth'

describe("<Homepage /> ", () => {
    let wrapper
    let _store = {
        dispatch: jest.fn(),
        subscribe: jest.fn(),
        getState: jest.fn(() =>
          ({
              auth:new Auth(),
              testimonials:[{
                text: 'Super Awesome!',
                avatar:'test-avatar.png',
                name:'Satisfied Parent'
              }]
          })
        )
    }

    beforeAll(() => wrapper = mount(
      <Provider store={_store}>
        <Homepage />
      </Provider>
    ))

    afterEach(() => jest.resetAllMocks())

    it("renders without crashing", () => {
      expect(wrapper.find('Navbar').length).toBe(1)
      expect(wrapper.find('HomepageHeader').length).toBe(1)
      expect(wrapper.find('FeatureList').length).toBe(1)
      expect(wrapper.find('FeatureDescriptionList').length).toBe(1)
      expect(wrapper.find('TestimonialList').length).toBe(1)
      expect(wrapper.find('PricingList').length).toBe(1)
      expect(wrapper.find('Footer').length).toBe(1)
    })
})
