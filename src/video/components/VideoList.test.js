import { mount } from 'enzyme'
import VideoList from './VideoList'
import Profile from '../../types/Profile'
import Taxonomy from '../../types/Taxonomy'
import Video from '../../types/Video'
import { MemoryRouter } from 'react-router'

describe("<VideoList /> Component", () => {

  it('renders without crashing', () => {
    const video = new Video()
    video.title = 'Test Title'
    video.flattened_taxonomy = 'tx 1 > tx 1.1'
    video.created_by = 1
    video.date_created = Date.now()

    const videos = new Array()
    videos.push(video)
    console.log(`videos: ${videos}`)

    const _fetchVideoList = jest.fn()
    const _deleteVideo = jest.fn()

    const wrapper = mount(
      <MemoryRouter>
        <VideoList
          videos={videos}
          fetchVideoList={_fetchVideoList}
          deleteVideo={_deleteVideo}
        />
      </MemoryRouter>
    )

    expect(wrapper.find('PageHeader')).toBeDefined()
    //there should only be one row because there's only one video in the list
    expect(wrapper.find('tbody').find('tr').length).toBe(1)
  })
})
