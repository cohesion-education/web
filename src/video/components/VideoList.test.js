import { shallow } from 'enzyme'
import VideoList from './VideoList'
import Profile from '../../types/Profile'
import Taxonomy from '../../types/Taxonomy'
import Video from '../../types/Video'


describe("<VideoList /> Component", () => {

  it('renders without crashing', () => {
    const video = new Video()
    video.title = 'Test Title'
    video.flattened_taxonomy = 'tx 1 > tx 1.1'
    video.created_by = new Profile('Big John', 'john@cohesioned.io', 'FL', 'Monroe')
    video.date_created = Date.now()

    const videos = [video]

    const _fetchVideoList = jest.fn()
    const _formUpdateHandler = jest.fn()
    const _deleteVideo = jest.fn()

    const wrapper = shallow(
      <VideoList
        videos={videos}
        fetchVideoList={_fetchVideoList}
        deleteVideo={_deleteVideo}
      />
    )

    expect(wrapper.find('PageHeader').length).toBe(1)
    //there should only be one row because there's only one video in the list
    expect(wrapper.find('tbody').find('tr').length).toBe(1)
  })
})
