import React from 'react'
import PropTypes from 'prop-types'
import { PageHeader } from 'react-bootstrap'
//import Taxonomy from '../../types/Taxonomy'
//import ByTaxonomy from './ByTaxonomy'


export default class ByGrade extends React.Component {
  static propTypes = {
    videos: PropTypes.array.isRequired,
  }

  static defaultProps = {
    videos: []
  }

  componentDidMount() {
    // this.props.fetchVideoList()
  }

  render(){
    // const videos = this.props.videos ? this.props.videos : []
    const { grade, subject, unit, set } = this.props.match.params

    const gradeTitle = `${grade} ${grade !== 'Kindergarten' ? 'Grade' : ''}`
    let title = `${gradeTitle}`
    // if(subject){
    //   title += ` > ${subject}`
    // }
    //
    // if(unit){
    //   title += ` > ${unit}`
    // }
    //
    // if(set){
    //   title += ` > ${set}`
    // }

    title += ' Videos'

    console.log(`grade: ${grade} - subject ${subject} - unit: ${unit} - set: ${set}`)

    return(
      <div>
        <PageHeader>
          {title}
        </PageHeader>

        { grade !== '3rd' &&
          <div>
            <p>Thank you for signing up!</p>

            <p>We are currently finalizing our {gradeTitle} videos and will be releasing them soon. You will not be charged for students registered in {gradeTitle} at this time.</p>

            <p>Once the {gradeTitle} videos are available, we will send an email notification and provide a 14 day free trial for you to explore our service.</p>

            <p>You can also follow our announcements on our <a href="https://www.facebook.com/pg/cohesioned/">Facebook Page</a> where we will continue to update our followers as we release new videos and features.</p>

            <img src="https://media.giphy.com/media/5Zesu5VPNGJlm/giphy.gif" alt="Working Monkey" />
          </div>

        }
        { grade === '3rd' &&
          <div>
            <p>3rd Grade videos are coming any minute now... please check back in just a bit.</p>

            <p>We appreciate your patience as we finalize this part of our 3rd grade launch.</p>

            <img src="https://media.giphy.com/media/5Zesu5VPNGJlm/giphy.gif" alt="Working Monkey" />
          </div>

        }

        { /* <ByTaxonomy taxonomy={new Taxonomy()} videos={[]} /> */ }

      </div>
    )
  }
}
