import React from 'react'

class FeatureDescriptionList extends React.Component {
  render(){
    return(
      <div>
        <section className="section p-t-0">
          <div className="container">
            <div className="row">
              <div className="col-sm-5">
                <div className="feat-description m-t-20">
                  <h4>Simple &amp; Organized</h4>
                  <p className="text-muted">We know how busy you are and the last thing you want to do after a long day is search for your child's math homework topic and never know if you're seeing the right thing. We pride ourselves on organizing content in a variety of ways so you can find what you need, when you need it.</p>
                  <a href="" className="btn btn-custom">Learn More</a>
                </div>
              </div>
              <div className="col-sm-6 col-sm-offset-1">
                <img src="/assets/images/mac_1.png" alt="img" className="img-responsive m-t-20" />
              </div>
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <img src="/assets/images/mac_2.png" alt="img" className="img-responsive" />
              </div>
              <div className="col-sm-5 col-sm-offset-1">
                <div className="feat-description">
                  <h4>Tailored to Your Child</h4>
                  <p className="text-muted">Progress through your video lesson library will be tracked and tailored to YOUR child so you will always know what you've seen, what you haven't seen, and what is recommened for you!</p>
                  <a href="" className="btn btn-custom">Learn More</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default FeatureDescriptionList;
