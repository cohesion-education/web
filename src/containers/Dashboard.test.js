import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import Dashboard from './Dashboard'

describe("<Dashboard /> ", () => {
    let wrapper

    window.config = {
      auth0_domain:"cohesioned.auth0.com",
      auth0_client_id:"abc123",
      callback_url:"http://localhost:3000/callback",
    }

    let _store = {
        dispatch: jest.fn(),
        subscribe: jest.fn(),
        getState: jest.fn(() =>
          ({
            profile:{
              picture:'test-picture'
            }
          })
        )
    }

    beforeAll(() => wrapper = mount(
      <Provider store={_store}>
        <Dashboard />
      </Provider>
    ))

    afterEach(() => jest.resetAllMocks())

    it("renders without crashing", () => {
      expect(wrapper.find('DashboardTopBar').length).toBe(1)
      expect(wrapper.find('DashboardLeftSideMenu').length).toBe(1)
      expect(wrapper.find('DashboardFooter').length).toBe(1)
    })
})
