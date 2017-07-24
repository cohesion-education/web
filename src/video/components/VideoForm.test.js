import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import VideoForm from './VideoForm'
import Video from '../../types/Video'

describe("<VideoForm /> Container", () => {

  let wrapper
  let _store = {
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    getState: jest.fn(() => ({
      video: new Video(1, 'Test Video')
    }))
  }

  beforeAll(() => wrapper = mount(
    <Provider store={_store}>
      <VideoForm />
    </Provider>
  ))

  afterEach(() => jest.resetAllMocks())

  it('renders without crashing', () => {
    expect(wrapper.find('PageHeader').text()).toBe('Add new Video')
    expect(wrapper.find('Alert').length).toBe(0)
    expect(wrapper.find('input[name="title"]').props().value).toBe('Test Video')
  })
})
