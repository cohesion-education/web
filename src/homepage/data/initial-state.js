import bookshelf from '../../images/bookshelf.png'
import getmoney from '../../images/get-money.png'
import professor from '../../images/professor.png'

export const homepage = {
  features:{
    title:'Why Cohesion Education?',
    list:[
      {
        imgURI:bookshelf,
        imgAltText:'Bookshelf',
        description:'IMMEDIATE ACCESS to instruction of every K-5 math, reading, and writing standard allows parents to be proactive and take ownership of the support they provide'
      },
      {
        imgURI:professor,
        imgAltText:'Certified Teacher',
        description:'With CERTIFIED TEACHERS, you can see actual teaching students experience in the classroom'
      },
      {
        imgURI:getmoney,
        imgAltText:'Affordable',
        description:'An AFFORDABLE alternative to expensive tutoring services'
      }
    ]
  },
  testimonials:{
    list:[]
  },
  pricing:{
    title:'Pricing',
    subtitle:'Quick and easy signup. Affordable with no obligations. Cancel anytime.',
    list:[
      {
        title:'Trial',
        price:'Free!',
        duration:'14 days'
      },
      {
        title:'One Child',
        price:'$12.99',
        duration:'Monthly'
      },
      {
        title:'One Child',
        price:'$99',
        duration:'Annually'
      }
    ]
  }
}
