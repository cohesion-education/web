import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { Pricing } from './containers'

// jest.mock('./PricingList')

describe("<Pricing /> Container ", () => {
    let wrapper
    let _store = {
        dispatch: jest.fn(),
        subscribe: jest.fn(),
        getState: jest.fn(() => ({
          homepage:{
            pricing:{
              title: 'Pricing Title',
              subtitle:'Pricing Subtitle',
              list:[{
                title: 'Make money money',
                price: '$1 billion',
                duration: 'Forever'
              }]
            }
          }
        }))
    }

    beforeAll(() => wrapper = mount(
      <Provider store={_store}>
        <Pricing />
      </Provider>
    ))

    afterEach(() => jest.resetAllMocks())

    it("renders PricingList with props", () => {
      expect(wrapper
        .find('PricingList')
        .props()
        .list
        .length
      ).toBe(1)

      expect(wrapper
        .find('PricingList')
        .props()
        .title
      ).toBe('Pricing Title')

      expect(wrapper
        .find('PricingList')
        .props()
        .subtitle
      ).toBe('Pricing Subtitle')


      expect(wrapper
        .find('PricingPlan')
        .length
      ).toBe(1)

      expect(wrapper
        .find('PricingPlan')
        .props()
        .title
      ).toBe('Make money money')

      expect(wrapper
        .find('PricingPlan')
        .props()
        .price
      ).toBe('$1 billion')

      expect(wrapper
        .find('PricingPlan')
        .props()
        .duration
      ).toBe('Forever')
    })
})
