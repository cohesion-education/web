import TaxonomyList from './TaxonomyList'
import Taxonomy from '../../types/Taxonomy'
import { shallow } from 'enzyme'

it('renders without crashing', () => {
  const list = [
    new Taxonomy('1'),
    new Taxonomy('2'),
    new Taxonomy('3'),
  ]

  const _handleAddFormSubmit = jest.mock()

  const wrapper = shallow(
    <TaxonomyList
      title='Test List'
      list={list}
      selectedItem='2'
      handleFormSubmit={_handleAddFormSubmit}
      showAddForm={true}
      baseURI='/taxonomy/'
    />
  )

  expect(wrapper.find('h3').text()).toBe('Test List')
  expect(wrapper.find('Form').length).toBe(1)
  expect(wrapper.find('Link').length).toBe(3)
})

it('does not show add form if related flag is set to false', () => {
  const list = []
  const _handleAddFormSubmit = jest.mock()

  const wrapper = shallow(
    <TaxonomyList
      title='Test List'
      list={list}
      handleFormSubmit={_handleAddFormSubmit}
      showAddForm={false}
      baseURI='/taxonomy/'
    />
  )

  expect(wrapper.find('h3').text()).toBe('Test List')
  expect(wrapper.find('Form').length).toBe(0)
})
