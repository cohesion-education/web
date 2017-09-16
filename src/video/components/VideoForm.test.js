import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import VideoForm from './VideoForm'
import Video from '../../types/Video'

describe("<VideoForm /> Container", () => {
  const video = new Video('Test Video')
  video.dateCreated = Date.now()

  let wrapper
  let _store = {
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    getState: jest.fn(() => ({
      taxonomy:{
        flattened: [
          {
            name: 'Parent > Child'
          }
        ]
      },
      video: {
        newVideo: video
      }
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
    /*TODO - come back to this later - still unclear how to check the value set on a react-bootstrap FormControl.
    expect(wrapper.find('FormControl')[0].getDOMNode().value).toBe('Test Video')*/
  })
})
