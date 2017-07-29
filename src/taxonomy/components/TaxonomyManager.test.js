import { shallow } from 'enzyme'
import { Provider } from 'react-redux'
import TaxonomyManager from './TaxonomyManager'
import Profile from '../../types/Profile'
import Taxonomy from '../../types/Taxonomy'

jest.mock('./TaxonomyList')

describe("<TaxonomyManager /> Container", () => {
  const taxonomy = new Taxonomy('test-taxonomy')

  let wrapper
  let _store = {
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    getState: jest.fn(() => ({
      taxonomy: {
        list: [
          taxonomy
        ]
      }
    }))
  }

  const match = { params : {} }

  beforeAll(() => wrapper = shallow(
    <Provider store={_store}>
      <TaxonomyManager match={match}/>
    </Provider>
  ))

  afterEach(() => jest.resetAllMocks())

  it('renders without crashing', () => {
    // expect(wrapper.find('PageHeader').text()).toBe('Taxonomy Management')
    // expect(wrapper.find('TaxonomyList').length).toBe(4)
  })
})
