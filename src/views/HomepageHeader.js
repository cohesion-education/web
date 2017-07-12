import React from 'react'
import Auth from '../utils/Auth'

const auth = new Auth()

class HomepageHeader extends React.Component {
  render(){
    return(
      <section className="home bg-img-1" id="home">
        <div className="bg-overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="home-fullscreen">
                <div className="full-screen">
                  <div className="home-wrapper home-wrapper-alt">
                    <h2 className="homepage-header-title">Know what your child is learning</h2>
                    <h4 className="homepage-header-subtitle">A video library and support platform by Teachers for You</h4>
                    <a href="/register" onClick={auth.login} className="btn btn-custom btn-login">Sign Up</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default HomepageHeader
