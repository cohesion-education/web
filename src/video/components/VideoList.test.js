import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import VideoList from './VideoList'
import Profile from '../../types/Profile'
import Taxonomy from '../../types/Taxonomy'
import Video from '../../types/Video'

describe("<VideoList /> Container", () => {
  const video = new Video(1, 'Test Video')
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
    expect(wrapper.find('PageHeader').text()).toBe('Video Management')
    expect(wrapper.find('tbody').find('tr').length).toBe(1)
    expect(wrapper.find('tbody').find('tr').childAt(0).text()).toBe('Edit')
    expect(wrapper.find('tbody').find('tr').childAt(1).text()).toBe('Test Video')
    expect(wrapper.find('tbody').find('tr').childAt(2).text()).toBe('text-taxonomy')
    // expect(wrapper.find('tbody').find('tr')[3].text()).toBe('Edit')
    expect(wrapper.find('tbody').find('tr').childAt(4).text()).toBe('Big John')
  })
})
