import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { Router } from 'react-router-redux'
import history from '../../history'
import { TaxonomyManager } from './TaxonomyManager'
import Profile from '../../types/Profile'
import Taxonomy from '../../types/Taxonomy'

const _fetchTaxonomyList = jest.fn()

describe("<TaxonomyManager /> Container", () => {
  const taxonomy = new Taxonomy('test-taxonomy')

  let wrapper

  const _match = { params : {} }

  beforeAll(() => wrapper = mount(
    <TaxonomyManager
      match={_match}
      fetchTaxonomyList={_fetchTaxonomyList}
    />
  ))

  afterEach(() => jest.resetAllMocks())

  it('renders without crashing', () => {
    expect(wrapper.find('PageHeader').text()).toBe('Taxonomy Management')
  })
})
