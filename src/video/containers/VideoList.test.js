import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import history from '../../history'
import VideoList from './VideoList'
import Profile from '../../types/Profile'
import Taxonomy from '../../types/Taxonomy'
import Video from '../../types/Video'
import { fetchVideoList, deleteVideo } from '../actions'

jest.mock('../actions', () => ({
  fetchVideoList: jest.fn(),
  deleteVideo: jest.fn()
}))


describe("<VideoList /> Container", () => {
  const video = new Video()
  video.title = 'Video Title'
  video.flattened_taxonomy = 'tx 1 > tx 1.1'
  video.created_by = new Profile('Big John', 'john@cohesioned.io', 'FL', 'Monroe')
  video.date_created = Date.now()

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
      <ConnectedRouter history={history}>
        <VideoList />
      </ConnectedRouter>
    </Provider>
  ))

  afterEach(() => jest.resetAllMocks())

  it('renders without crashing', () => {
    expect(wrapper.find('PageHeader').text()).toBe('Video ManagementAdd Video')
    expect(wrapper.find('tbody').find('tr').length).toBe(1)
    expect(wrapper.find('tbody').find('tr').childAt(0).text()).toBe('Edit')
    expect(wrapper.find('tbody').find('tr').childAt(1).text()).toBe('Delete')
    expect(wrapper.find('tbody').find('tr').childAt(3).text()).toBe('Video Title')
    expect(wrapper.find('tbody').find('tr').childAt(4).text()).toBe('tx 1 > tx 1.1')
    expect(wrapper.find('tbody').find('tr').childAt(6).text()).toBe('Big John')
  })
})
