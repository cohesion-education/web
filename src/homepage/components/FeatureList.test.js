import FeatureList from './FeatureList'
import { mount } from 'enzyme'

it('renders without crashing', () => {
  const features = {
    title:'Test title',
    list:[{
      imageURI:'uri',
      imageAltTxt:'alt',
      description:'desc'
    }]
  }

  const wrapper = mount(<FeatureList {...features} />)

  expect(wrapper
    .props()
    .title
  ).toBe('Test title')

  expect(wrapper
    .find('Feature')
    .length
  ).toBe(1)

  expect(wrapper
    .find('Feature')
    .props()
    .imageURI
  ).toBe('uri')

  expect(wrapper
    .find('Feature')
    .props()
    .imageAltTxt
  ).toBe('alt')

  expect(wrapper
    .find('Feature')
    .props()
    .description
  ).toBe('desc')
})
