import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import HomepageHeader from './HomepageHeader'

describe("<HomepageHeader /> Container ", () => {
    let wrapper
    let _store = {
        dispatch: jest.fn(),
        subscribe: jest.fn(),
        getState: jest.fn(() =>
          ({
              header:{
                title:'Test Title',
                subtitle:'Test Subtitle'
              }
          })
        )
    }

    beforeAll(() => wrapper = mount(
      <Provider store={_store}>
        <HomepageHeader />
      </Provider>
    ))

    afterEach(() => jest.resetAllMocks())

    it("renders header with props", () => {
      expect(wrapper
        .find('HomepageHeader')
        .props()
        .title
      ).toBe('Test Title')

      expect(wrapper
        .find('HomepageHeader')
        .props()
        .subtitle
      ).toBe('Test Subtitle')
    })
})
