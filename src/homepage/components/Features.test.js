import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { Features } from './containers'

// jest.mock('./FeatureList')

describe("<Features /> Container ", () => {
    let wrapper
    let _store = {
      dispatch: jest.fn(),
      subscribe: jest.fn(),
      getState: jest.fn(() => ({
        homepage:{
          features:{
            title:'Test Title',
            list:[{
              imgURI:'fake-image-uri',
              imgAltText:'fake-image-alt',
              description:'fake-description'
            }]
          }
        }
      }))
    }

    beforeAll(() => wrapper = mount(
      <Provider store={_store}>
        <Features />
      </Provider>
    ))

    afterEach(() => jest.resetAllMocks())

    it("renders FeatureList with props", () => {
      expect(wrapper
        .find('FeatureList')
        .props()
        .title
      ).toBe('Test Title')

      expect(wrapper
        .find('Feature')
        .length
      ).toBe(1)

      expect(wrapper
        .find('Feature')
        .props()
        .imgURI
      ).toBe('fake-image-uri')

      expect(wrapper
        .find('Feature')
        .props()
        .imgAltText
      ).toBe('fake-image-alt')

      expect(wrapper
        .find('Feature')
        .props()
        .description
      ).toBe('fake-description')
    })
})
