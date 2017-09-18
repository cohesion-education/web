import { shallow } from 'enzyme'
import VideoForm from './VideoForm'
import Taxonomy from '../../types/Taxonomy'
import Video from '../../types/Video'

it('renders without crashing', () => {
  const video = new Video()
  video.title = 'Test Title'
  video.dateCreated = Date.now()

  const flattenedTaxonomy = [
    new Taxonomy('1'),
    new Taxonomy('2'),
    new Taxonomy('3'),
  ]

  const _dispatch = jest.fn()
  const _formUpdateHandler = jest.fn()
  const _saveHandler = jest.fn()
  const _uploadHandler = jest.fn()

  const wrapper = shallow(
    <VideoForm
      video={video}
      pageTitle="Video Form Test"
      flattenedTaxonomy={flattenedTaxonomy}
      dispatch={_dispatch}
      formUpdateHandler={_formUpdateHandler}
      saveHandler={_saveHandler}
      uploadHandler={_uploadHandler}
    />
  )

  //console.log(Object.getOwnPropertyNames(wrapper.find('FormControl[name="title"]').node.props).join())

  expect(wrapper.find('FormControl[name="title"]').node.props.value).toBe('Test Title')
})
