import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Row, Col, PageHeader, Thumbnail } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const styles = {
  containerFluid:{
    padding:0,
    height:'100%',
  },
  videoRow:{
    padding:'1em',
  },
  videoCell:{
    paddingBottom:'1em',
  },
  videoGroupTitle:{
    fontWeight: 'bold',
    fontSize: '1.1em',
  },
}

export default class ByTaxonomy extends React.Component {
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
    const { videos, match } = this.props
    const { grade, subject, unit, set } = match.params

    //TODO - display list of videos
    console.log(`videos: ${videos}`)

    const gradeTitle = `${grade} ${grade !== 'Kindergarten' ? 'Grade' : ''}`
    let title = `${gradeTitle}`
    if(subject){
      title += ` > ${subject}`
    }

    if(unit){
      title += ` > ${unit}`
    }

    if(set){
      title += ` > ${set}`
    }

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
      </div>
    )
  }
}
