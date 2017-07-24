import React from 'react'
import Header from '../../homepage/components/Header'
import Footer from '../../homepage/components/Footer'
import '../../css/fonts.css'
import '../../css/font-awesome.css'
import '../../css/homepage.css'
import '../../css/pages.css'
import '../../css/icons.css'

export default class PageNotFound extends React.Component {

  render(){
    return(
      <div>
        <Header />
        <div className="wrapper-page">
          <div className="ex-page-content text-center">
            {this.props.children}
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
