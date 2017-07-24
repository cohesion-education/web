import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import VideoList from './VideoList'
import Profile from '../../types/Profile'
import Taxonomy from '../../types/Taxonomy'
import Video from '../../types/Video'

describe("<VideoList /> Container", () => {
  const video = new Video()
  video.taxonomy = new Taxonomy(1, 'text-taxonomy')
  video.createdBy = new Profile('Big John', 'john@cohesioned.io', 'FL', 'Monroe')
  video.dateCreated = Date.now()

  let wrapper
  let _store = {
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    getState: jest.fn(() => ({
      video: {
        list: [
          video
        ]
      }
    }))
  }

  beforeAll(() => wrapper = mount(
    <Provider store={_store}>
      <VideoList />
    </Provider>
  ))

  afterEach(() => jest.resetAllMocks())

  it('renders without crashing', () => {

  })
})
