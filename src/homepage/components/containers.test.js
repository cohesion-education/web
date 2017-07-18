import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { Features, Pricing, Testimonials } from './containers'
import { Home } from './containers'

jest.mock('./FeatureList')
jest.mock('./PricingList')
jest.mock('./TestimonialList')

describe("<Home /> Container", () => {
    let wrapper

    let _store = {
        dispatch: jest.fn(),
        subscribe: jest.fn(),
        getState: jest.fn(() =>
          ({
            homepage:{
              features:{
                title:'Test Title',
                list:[{
                  imgURI:'fake-image-uri',
                  imgAltText:'fake-image-alt',
                  description:'fake-description'
                }]
              },
              testimonials:{
                list:[{
                  text: 'Super Awesome!',
                  avatar:'test-avatar.png',
                  name:'Satisfied Parent'
                }]
              },
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
          })
        )
    }

    beforeAll(() => {
      wrapper = mount(
        <Provider store={_store}>
          <Home />
        </Provider>
      )
    })

    afterEach(() => jest.resetAllMocks())

    it("renders without crashing", () => {
      expect(wrapper.find('Navbar').length).toBe(1)
      expect(wrapper.find('TopOfPageBackgroundImage').length).toBe(1)
      expect(wrapper.find('FeatureList').length).toBe(1)
      expect(wrapper.find('FeatureDescriptionList').length).toBe(1)
      expect(wrapper.find('TestimonialList').length).toBe(1)
      expect(wrapper.find('PricingList').length).toBe(1)
      expect(wrapper.find('Footer').length).toBe(1)
    })
})

// describe("<Features /> Container ", () => {
//     let wrapper
//     let _store = {
//         dispatch: jest.fn(),
//         subscribe: jest.fn(),
//         getState: jest.fn(() =>
//           ({
//               features:{
//                 title:'Test Title',
//                 list:[{
//                   imgURI:'fake-image-uri',
//                   imgAltText:'fake-image-alt',
//                   description:'fake-description'
//                 }]
//               }
//           })
//         )
//     }
//
//     beforeAll(() => wrapper = mount(
//       <Provider store={_store}>
//         <Features />
//       </Provider>
//     ))
//
//     afterEach(() => jest.resetAllMocks())
//
//     it("renders FeatureList with props", () => {
//       expect(wrapper
//         .find('FeatureList')
//         .props()
//         .title
//       ).toBe('Test Title')
//
//       expect(wrapper
//         .find('Feature')
//         .length
//       ).toBe(1)
//
//       expect(wrapper
//         .find('Feature')
//         .props()
//         .imgURI
//       ).toBe('fake-image-uri')
//
//       expect(wrapper
//         .find('Feature')
//         .props()
//         .imgAltText
//       ).toBe('fake-image-alt')
//
//       expect(wrapper
//         .find('Feature')
//         .props()
//         .description
//       ).toBe('fake-description')
//     })
// })
//
// describe("<Testimonials /> Container ", () => {
//     let wrapper
//     let _store = {
//         dispatch: jest.fn(),
//         subscribe: jest.fn(),
//         getState: jest.fn(() =>
//           ({
//               testimonials:{
//                 list:[{
//                   text: 'Super Awesome!',
//                   avatar:'test-avatar.png',
//                   name:'Satisfied Parent'
//                 }]
//               }
//           })
//         )
//     }
//
//     beforeAll(() => wrapper = mount(
//       <Provider store={_store}>
//         <Testimonials />
//       </Provider>
//     ))
//
//     afterEach(() => jest.resetAllMocks())
//
//     it("renders TestimonialList with props", () => {
//       expect(wrapper
//         .find('TestimonialList')
//         .props()
//         .list
//         .length
//       ).toBe(1)
//
//       expect(wrapper
//         .find('Testimonial')
//         .length
//       ).toBe(1)
//
//       expect(wrapper
//         .find('Testimonial')
//         .props()
//         .name
//       ).toBe('Satisfied Parent')
//
//       expect(wrapper
//         .find('Testimonial')
//         .props()
//         .text
//       ).toBe('Super Awesome!')
//
//       expect(wrapper
//         .find('Testimonial')
//         .props()
//         .avatar
//       ).toBe('test-avatar.png')
//     })
// })
//
// describe("<Pricing /> Container ", () => {
//     let wrapper
//     let _store = {
//         dispatch: jest.fn(),
//         subscribe: jest.fn(),
//         getState: jest.fn(() =>
//           ({
//               pricing:{
//                 title: 'Pricing Title',
//                 subtitle:'Pricing Subtitle',
//                 list:[
//                   {
//                     title: 'Make money money',
//                     price: '$1 billion',
//                     duration: 'Forever'
//                   }
//                 ]
//               }
//           })
//         )
//     }
//
//     beforeAll(() => wrapper = mount(
//       <Provider store={_store}>
//         <Pricing />
//       </Provider>
//     ))
//
//     afterEach(() => jest.resetAllMocks())
//
//     it("renders PricingList with props", () => {
//       expect(wrapper
//         .find('PricingList')
//         .props()
//         .list
//         .length
//       ).toBe(1)
//
//       expect(wrapper
//         .find('PricingList')
//         .props()
//         .title
//       ).toBe('Pricing Title')
//
//       expect(wrapper
//         .find('PricingList')
//         .props()
//         .subtitle
//       ).toBe('Pricing Subtitle')
//
//
//       expect(wrapper
//         .find('PricingPlan')
//         .length
//       ).toBe(1)
//
//       expect(wrapper
//         .find('PricingPlan')
//         .props()
//         .title
//       ).toBe('Make money money')
//
//       expect(wrapper
//         .find('PricingPlan')
//         .props()
//         .price
//       ).toBe('$1 billion')
//
//       expect(wrapper
//         .find('PricingPlan')
//         .props()
//         .duration
//       ).toBe('Forever')
//     })
// })
